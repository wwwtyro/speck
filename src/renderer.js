"use strict";

var glm = require('./gl-matrix');
var core = require('./webgl.js');
var fs = require('fs');
var cube = require("./cube");
var elements = require("./elements");
var View = require("./view");

module.exports = function (canvas, resolution, aoResolution) {

        var self = this;

        var range,
            samples,
            atoms;

        var gl, 
            canvas;

        var rScene = null,
            rBonds = null,
            rDispQuad = null,
            rAccumulator = null,
            rAO = null,
            rDOF = null,
            rFXAA = null;

        var tSceneColor,
            tSceneNormal,
            tSceneDepth,
            tRandRotDepth,
            tRandRotNormal,
            tRandRotColor,
            tAccumulator,
            tAccumulatorOut,
            tDOF,
            tAO;

        var fbScene,
            fbRandRot,
            fbAccumulator,
            fbDOF,
            fbAO;

        var progScene,
            progBonds,
            progAccumulator,
            progAO,
            progFXAA,
            progDOF,
            progDisplayQuad;

        var ext;

        var sampleCount = 0,
            initialRender = false;

        self.initialize = function() {

            // Initialize canvas/gl.
            canvas.width = canvas.height = resolution;
            gl = canvas.getContext('webgl');
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);
            gl.clearColor(0,0,0,0);
            gl.clearDepth(1);
            gl.viewport(0,0,resolution,resolution);

            window.gl = gl; //debug

            ext = core.getExtensions(gl, [
                "EXT_frag_depth", 
                "WEBGL_depth_texture", 
                "WEBGL_draw_buffers"
            ]);

            self.createTextures();

            // Initialize shaders.
            progScene = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/atoms.glsl", 'utf8'));
            progBonds = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/bonds.glsl", 'utf8'));
            progDisplayQuad = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/textured-quad.glsl", 'utf8'));
            progAccumulator = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/accumulator.glsl", 'utf8'));
            progAO = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/ao.glsl", 'utf8'));
            progFXAA = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/fxaa.glsl", 'utf8'));
            progDOF = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/dof.glsl", 'utf8'));

            var position = [
                -1, -1, 0,
                 1, -1, 0,
                 1,  1, 0,
                -1, -1, 0,
                 1,  1, 0,
                -1,  1, 0
            ];

            // Initialize geometry.
            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };
            attribs.aPosition.buffer.set(new Float32Array(position));
            var count = position.length / 9;

            rDispQuad = new core.Renderable(gl, progDisplayQuad, attribs, count);
            rAccumulator = new core.Renderable(gl, progAccumulator, attribs, count);
            rAO = new core.Renderable(gl, progAO, attribs, count);
            rFXAA = new core.Renderable(gl, progFXAA, attribs, count);
            rDOF = new core.Renderable(gl, progDOF, attribs, count);

            samples = 0;

        }

        self.createTextures = function() {
            // fbRandRot
            tRandRotColor = new core.Texture(gl, 0, null, aoResolution, aoResolution);

            tRandRotNormal = new core.Texture(gl, 1, null, aoResolution, aoResolution);

            tRandRotDepth = new core.Texture(gl, 2, null, aoResolution, aoResolution, {
                internalFormat: gl.DEPTH_COMPONENT,
                format: gl.DEPTH_COMPONENT,
                type: gl.UNSIGNED_SHORT
            });

            fbRandRot = new core.Framebuffer(gl, [tRandRotColor, tRandRotNormal], tRandRotDepth, ext.WEBGL_draw_buffers);

            // fbScene
            tSceneColor = new core.Texture(gl, 3, null, resolution, resolution);

            tSceneNormal = new core.Texture(gl, 4, null, resolution, resolution);

            tSceneDepth = new core.Texture(gl, 5, null, resolution, resolution, {
                internalFormat: gl.DEPTH_COMPONENT,
                format: gl.DEPTH_COMPONENT,
                type: gl.UNSIGNED_SHORT
            });

            fbScene = new core.Framebuffer(gl, [tSceneColor, tSceneNormal], tSceneDepth, ext.WEBGL_draw_buffers);

            // fbAccumulator
            tAccumulator = new core.Texture(gl, 6, null, resolution, resolution);
            tAccumulatorOut = new core.Texture(gl, 7, null, resolution, resolution);
            fbAccumulator = new core.Framebuffer(gl, [tAccumulatorOut]);

            // fbAO
            tAO = new core.Texture(gl, 8, null, resolution, resolution);
            fbAO = new core.Framebuffer(gl, [tAO]);

            // fbDOF
            tDOF = new core.Texture(gl, 9, null, resolution, resolution);
            fbDOF = new core.Framebuffer(gl, [tDOF]);
        }

        self.setResolution = function(res, aoRes) {
            aoResolution = aoRes;
            resolution = res;
            canvas.width = canvas.height = resolution;
            gl.viewport(0,0,resolution,resolution);
            self.createTextures();
        }


        self.setAtoms = function(newAtoms, view) {

            atoms = newAtoms;

            function make36(arr) {
                var out = [];
                for (var i = 0; i < 36; i++) {
                    out.push.apply(out, arr);
                }
                return out;
            }

            // Atoms

            var attribs = {
                aImposter: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
                aRadius: {
                    buffer: new core.Buffer(gl),
                    size: 1
                },
                aColor: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };

            var imposter = [];
            var position = [];
            var radius = [];
            var color = [];

            for (var i = 0; i < atoms.atoms.length; i++) {
                imposter.push.apply(imposter, cube.position);
                var a = atoms.atoms[i];
                position.push.apply(position, make36([a.x, a.y, a.z]));
                radius.push.apply(radius, make36([elements[a.symbol].radius]));
                var c = elements[a.symbol].color;
                color.push.apply(color, make36([c[0], c[1], c[2]]));
            }

            attribs.aImposter.buffer.set(new Float32Array(imposter));
            attribs.aPosition.buffer.set(new Float32Array(position));
            attribs.aRadius.buffer.set(new Float32Array(radius));
            attribs.aColor.buffer.set(new Float32Array(color));

            var count = imposter.length / 9;

            rScene = new core.Renderable(gl, progScene, attribs, count);

            // Bonds

            if (view.getBonds()) {

                var bonds = [];

                for (var i = 0; i < atoms.atoms.length - 1; i++) {
                    for (var j = i + 1; j < atoms.atoms.length; j++) {
                        var a = atoms.atoms[i];
                        var b = atoms.atoms[j];
                        var l = glm.vec3.fromValues(a.x, a.y, a.z);
                        var m = glm.vec3.fromValues(b.x, b.y, b.z);
                        var cutoff = elements[a.symbol].radius + elements[b.symbol].radius;
                        if (glm.vec3.distance(l,m) > cutoff * view.getBondThreshold()) {
                            continue;
                        }
                        var ca = elements[a.symbol].color;
                        var cb = elements[b.symbol].color;
                        var ra = elements[a.symbol].radius;
                        var rb = elements[b.symbol].radius;
                        bonds.push({
                            a: a,
                            b: b,
                            ra: ra,
                            rb: rb,
                            ca: ca,
                            cb: cb
                        });
                    }
                }

                rBonds = null;

                if (bonds.length > 0) {

                    var attribs = {
                        aImposter: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        },
                        aPosA: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        },
                        aPosB: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        },
                        aRadA: {
                            buffer: new core.Buffer(gl),
                            size: 1
                        },
                        aRadB: {
                            buffer: new core.Buffer(gl),
                            size: 1
                        },
                        aColA: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        },
                        aColB: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        }
                    };

                    var imposter = [];
                    var posa = [];
                    var posb = [];
                    var rada = [];
                    var radb = [];
                    var cola = [];
                    var colb = [];

                    for (var i = 0; i < bonds.length; i++) {
                        var b = bonds[i];
                        imposter.push.apply(imposter, cube.position);
                        posa.push.apply(posa, make36([b.a.x, b.a.y, b.a.z]));
                        posb.push.apply(posb, make36([b.b.x, b.b.y, b.b.z]));
                        rada.push.apply(rada, make36([b.ra]));
                        radb.push.apply(radb, make36([b.rb]));
                        cola.push.apply(cola, make36([b.ca[0], b.ca[1], b.ca[2]]));
                        colb.push.apply(colb, make36([b.cb[0], b.cb[1], b.cb[2]]));
                    }

                    attribs.aImposter.buffer.set(new Float32Array(imposter));
                    attribs.aPosA.buffer.set(new Float32Array(posa));
                    attribs.aPosB.buffer.set(new Float32Array(posb));
                    attribs.aRadA.buffer.set(new Float32Array(rada));
                    attribs.aRadB.buffer.set(new Float32Array(radb));
                    attribs.aColA.buffer.set(new Float32Array(cola));
                    attribs.aColB.buffer.set(new Float32Array(colb));

                    var count = imposter.length / 9;

                    rBonds = new core.Renderable(gl, progBonds, attribs, count);

                }

            }

        }

        self.reset = function() {
            sampleCount = 0;
            initialRender = false;
            tAccumulator.reset();
            tAccumulatorOut.reset();
        }

        self.render = function(view) {
            if (atoms === undefined) {
                return;
            }
            if (rScene == null) {
                return;
            }

            range = atoms.getRadius(view) * 2.0;

            if (!initialRender) {
                scene(view);
                initialRender = true;
            } else {
                for (var i = 0; i < view.getSamplesPerFrame(); i++) {
                    if (sampleCount > 1024) {
                        break;
                    }
                    sample(view);
                    sampleCount++;
                }
            }
            display(view);
        }

        function scene(view) {
            gl.viewport(0, 0, resolution, resolution);
            // Render the depth/color buffers.
            fbScene.bind();
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            var rect = view.getRect();
            var projection = glm.mat4.create();
            glm.mat4.ortho(projection, rect.left, rect.right, rect.bottom, rect.top, 0, range);
            var viewMat = glm.mat4.create();
            glm.mat4.lookAt(viewMat, [0, 0, 0], [0, 0, -1], [0, 1, 0]);
            var model = glm.mat4.create();
            glm.mat4.translate(model, model, [0, 0, -range/2]);
            glm.mat4.multiply(model, model, view.getRotation());
            progScene.setUniform("uProjection", "Matrix4fv", false, projection);
            progScene.setUniform("uView", "Matrix4fv", false, viewMat);
            progScene.setUniform("uModel", "Matrix4fv", false, model);
            progScene.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            progScene.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            progScene.setUniform("uAtomScale", "1f", 2.5 * view.getAtomScale());
            progScene.setUniform("uRelativeAtomScale", "1f", view.getRelativeAtomScale());
            progScene.setUniform("uRes", "1f", resolution);
            progScene.setUniform("uDepth", "1f", range);
            rScene.render();

            if (view.getBonds() && rBonds != null) {
                progBonds.setUniform("uProjection", "Matrix4fv", false, projection);
                progBonds.setUniform("uView", "Matrix4fv", false, viewMat);
                progBonds.setUniform("uModel", "Matrix4fv", false, model);
                progBonds.setUniform("uRotation", "Matrix4fv", false, view.getRotation());
                progBonds.setUniform("uDepth", "1f", range);
                progBonds.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
                progBonds.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
                progBonds.setUniform("uRes", "1f", resolution);
                progBonds.setUniform("uBondRadius", "1f", 2.5 * view.getBondRadius());
                progBonds.setUniform("uBondShade", "1f", view.getBondShade());
                progBonds.setUniform("uAtomScale", "1f", 2.5 * view.getAtomScale());
                progBonds.setUniform("uRelativeAtomScale", "1f", view.getRelativeAtomScale());
                rBonds.render();
            }
        }

        function sample(view) {
            gl.viewport(0, 0, aoResolution, aoResolution);
            var v = view.clone();
            v.setZoom(2/range);
            v.setTranslation(0, 0);
            var rot = glm.mat4.create();
            for (var i = 0; i < 3; i++) {
                var axis = glm.vec3.random(glm.vec3.create(), 1.0);
                glm.mat4.rotate(rot, rot, Math.random() * 10, axis);
            }
            v.setRotation(glm.mat4.multiply(glm.mat4.create(), rot, v.getRotation()));
            fbRandRot.bind()
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            var rect = v.getRect();
            var projection = glm.mat4.create();
            glm.mat4.ortho(projection, rect.left, rect.right, rect.bottom, rect.top, 0, range);
            var viewMat = glm.mat4.create();
            glm.mat4.lookAt(viewMat, [0, 0, 0], [0, 0, -1], [0, 1, 0]);
            var model = glm.mat4.create();
            glm.mat4.translate(model, model, [0, 0, -range/2]);
            glm.mat4.multiply(model, model, v.getRotation());
            progScene.setUniform("uProjection", "Matrix4fv", false, projection);
            progScene.setUniform("uView", "Matrix4fv", false, viewMat);
            progScene.setUniform("uModel", "Matrix4fv", false, model);
            progScene.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            progScene.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            progScene.setUniform("uAtomScale", "1f", 2.5 * v.getAtomScale());
            progScene.setUniform("uRelativeAtomScale", "1f", view.getRelativeAtomScale());
            progScene.setUniform("uRes", "1f", aoResolution);
            progScene.setUniform("uDepth", "1f", range);
            rScene.render();

            if (view.getBonds() && rBonds != null) {
                progBonds.setUniform("uProjection", "Matrix4fv", false, projection);
                progBonds.setUniform("uView", "Matrix4fv", false, viewMat);
                progBonds.setUniform("uModel", "Matrix4fv", false, model);
                progBonds.setUniform("uRotation", "Matrix4fv", false, v.getRotation());
                progBonds.setUniform("uDepth", "1f", range);
                progBonds.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
                progBonds.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
                progBonds.setUniform("uRes", "1f", aoResolution);
                progBonds.setUniform("uBondRadius", "1f", 2.5 * view.getBondRadius());
                progBonds.setUniform("uBondShade", "1f", view.getBondShade());
                progBonds.setUniform("uAtomScale", "1f", 2.5 * view.getAtomScale());
                progBonds.setUniform("uRelativeAtomScale", "1f", view.getRelativeAtomScale());
                rBonds.render();
            }

            gl.viewport(0, 0, resolution, resolution);
            var sceneRect = view.getRect();
            var rotRect = v.getRect();
            var invRot = glm.mat4.invert(glm.mat4.create(), rot);
            fbAccumulator.bind();
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            progAccumulator.setUniform("uSceneDepth", "1i", tSceneDepth.index);
            progAccumulator.setUniform("uSceneNormal", "1i", tSceneNormal.index);
            progAccumulator.setUniform("uRandRotDepth", "1i", tRandRotDepth.index);
            progAccumulator.setUniform("uAccumulator", "1i", tAccumulator.index);
            progAccumulator.setUniform("uSceneBottomLeft", "2fv", [sceneRect.left, sceneRect.bottom]);
            progAccumulator.setUniform("uSceneTopRight", "2fv", [sceneRect.right, sceneRect.top]);
            progAccumulator.setUniform("uRotBottomLeft", "2fv", [rotRect.left, rotRect.bottom]);
            progAccumulator.setUniform("uRotTopRight", "2fv", [rotRect.right, rotRect.top]);
            progAccumulator.setUniform("uRes", "1f", resolution);
            progAccumulator.setUniform("uDepth", "1f", range);
            progAccumulator.setUniform("uRot", "Matrix4fv", false, rot);
            progAccumulator.setUniform("uInvRot", "Matrix4fv", false, invRot);
            progAccumulator.setUniform("uSampleCount", "1i", sampleCount);
            rAccumulator.render();
            tAccumulator.bind();
            gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, resolution, resolution, 0);
        }

        function display(view) {
            gl.viewport(0, 0, resolution, resolution);
            if (view.getFXAA()) {
                fbAO.bind();
            } else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            progAO.setUniform("uSceneColor", "1i", tSceneColor.index);
            progAO.setUniform("uSceneDepth", "1i", tSceneDepth.index);
            progAO.setUniform("uAccumulatorOut", "1i", tAccumulatorOut.index);
            progAO.setUniform("uRes", "1f", resolution);
            progAO.setUniform("uAO", "1f", 2.0 * view.getAmbientOcclusion());
            progAO.setUniform("uBrightness", "1f", 2.0 * view.getBrightness());
            progAO.setUniform("uOutlineStrength", "1f", view.getOutlineStrength());
            rAO.render();

            fbDOF.bind();
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            progDOF.setUniform("uTexture", "1i", tAO.index);
            progDOF.setUniform("uDepth", "1i", tSceneDepth.index);
            progDOF.setUniform("uDOFPosition", "1f", view.getDofPosition());
            progDOF.setUniform("uDOFStrength", "1f", view.getDofStrength());
            progDOF.setUniform("uRes", "1f", resolution);
            rDOF.render();

            if (view.getFXAA()) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                progFXAA.setUniform("uTexture", "1i", tDOF.index);
                progFXAA.setUniform("uRes", "1f", resolution);
                rFXAA.render();
            }

            // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // progDisplayQuad.setUniform("uTexture", "1i", tSceneNormal.index);
            // progDisplayQuad.setUniform("uRes", "1f", resolution);
            // rDispQuad.render();
        }

        self.initialize();
}


function loadProgram(gl, src) {
    src = src.split('// __split__');
    return new core.Program(gl, src[0], src[1]);
}