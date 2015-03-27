"use strict";

var glm = require('gl-matrix');
var core = require('webgl.js');
var fs = require('fs');
var cube = require("./cube");
var elements = require("./elements");

module.exports = function (canvas, resolution) {

        var self = this;

        var range,
            samples;

        var gl, 
            canvas;

        var rScene = null,
            rDispQuad = null,
            rAccumulator = null,
            rAO = null;

        var tSceneColor,
            tSceneDepth,
            tRandRotDepth,
            tRandRotColor,
            tAccumulator,
            tAccumulatorOut;

        var fbScene,
            fbRandRot,
            fbAccumulator;

        var progScene,
            progAccumulator,
            progAO,
            progDisplayQuad;

        var extFragDepth,
            extInstanced,
            extDepthTexture;

        self.initialize = function() {

            // Initialize canvas/gl.
            canvas.width = canvas.height = resolution;
            gl = canvas.getContext('webgl');
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);
            gl.clearColor(0,0,0,0);
            gl.clearDepth(1);

            window.gl = gl;

            extFragDepth = gl.getExtension("EXT_frag_depth");
            extInstanced = gl.getExtension("ANGLE_instanced_arrays");
            extDepthTexture = gl.getExtension("WEBGL_depth_texture");

            // fbScene
            gl.activeTexture(gl.TEXTURE0);
            tSceneColor = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tSceneColor);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.activeTexture(gl.TEXTURE1);
            tSceneDepth = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tSceneDepth);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, resolution, resolution, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);            

            fbScene = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbScene);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tSceneColor, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, tSceneDepth, 0);

            // fbRandRot
            gl.activeTexture(gl.TEXTURE2);
            tRandRotColor = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tRandRotColor);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.activeTexture(gl.TEXTURE3);
            tRandRotDepth = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tRandRotDepth);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, resolution, resolution, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);            

            fbRandRot = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbRandRot);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tRandRotColor, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, tRandRotDepth, 0);

            // fbAccumulator
            gl.activeTexture(gl.TEXTURE4);
            tAccumulator = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tAccumulator);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.activeTexture(gl.TEXTURE5);
            tAccumulatorOut = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tAccumulatorOut);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            fbAccumulator = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbAccumulator);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tAccumulatorOut, 0);


            // Initialize shaders.
            progScene = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/scene.glsl", 'utf8'));
            progDisplayQuad = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/textured-quad.glsl", 'utf8'));
            progAccumulator = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/accumulator.glsl", 'utf8'));
            progAO = loadProgram(gl, fs.readFileSync(__dirname + "/shaders/ao.glsl", 'utf8'));

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

            // Initialize geometry.
            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };
            attribs.aPosition.buffer.set(new Float32Array(position));
            var count = position.length / 9;
            rAccumulator = new core.Renderable(gl, progAccumulator, attribs, count);

            // Initialize geometry.
            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };
            attribs.aPosition.buffer.set(new Float32Array(position));
            var count = position.length / 9;
            rAO = new core.Renderable(gl, progAO, attribs, count);

            range = 1.0;
            samples = 0;

        }


        self.setAtoms = function(atoms) {

            var attribs = {
                aImposter: {
                    buffer: new core.Buffer(gl),
                    size: 3,
                    divisor: 0
                },
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3,
                    divisor: 1
                },
                aRadius: {
                    buffer: new core.Buffer(gl),
                    size: 1,
                    divisor: 1
                },
                aColor: {
                    buffer: new core.Buffer(gl),
                    size: 3,
                    divisor: 1
                },
            };

            var position = [];
            var radius = [];
            var color = [];

            for (var i = 0; i < atoms.atoms.length; i++) {
                var a = atoms.atoms[i];
                position.push.apply(position, [a.x, a.y, a.z]);
                radius.push(elements[a.symbol].radius);
                var c = elements[a.symbol].color;
                color.push.apply(color, [c[0] * (1 - a.ao), c[1] * (1 - a.ao), c[2] * (1 - a.ao)]);
            }

            var imposter = cube.position;
            
            attribs.aImposter.buffer.set(new Float32Array(imposter));
            attribs.aPosition.buffer.set(new Float32Array(position));
            attribs.aRadius.buffer.set(new Float32Array(radius));
            attribs.aColor.buffer.set(new Float32Array(color));

            var count = position.length / 3;

            rScene = new core.InstancedRenderable(gl, progScene, attribs, count, extInstanced);

            range = atoms.getRadius() * 4.0;
        }

        function renderScene(view) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbScene);
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
            progScene.setUniform("uAtomScale", "1f", view.getAtomScale());
            progScene.setUniform("uRes", "2fv", [resolution, resolution]);
            progScene.setUniform("uDepth", "1f", range);
            rScene.render();
        }

        self.render = function(view) {
            if (rScene == null) {
                return;
            }
            renderScene(view);
            renderRandRot(view);
        }

        function renderRandRot(view) {
            var v = view.clone();
            v.rotate(Math.random() * 1000, Math.random() * 1000);
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbRandRot);
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
            progScene.setUniform("uAtomScale", "1f", v.getAtomScale());
            progScene.setUniform("uRes", "2fv", [resolution, resolution]);
            progScene.setUniform("uDepth", "1f", range);
            rScene.render();

            var invRot = glm.mat4.invert(glm.mat4.create(), view.__rotation);
            var rect = view.getRect();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbAccumulator);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            progAccumulator.setUniform("uSceneDepth", "1i", 1);
            progAccumulator.setUniform("uRandRotDepth", "1i", 3);
            progAccumulator.setUniform("uAccumulator", "1i", 4);
            progAccumulator.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            progAccumulator.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            progAccumulator.setUniform("uRes", "1f", resolution);
            progAccumulator.setUniform("uDepth", "1f", range);
            progAccumulator.setUniform("uInvRot", "Matrix4fv", false, invRot);
            rAccumulator.render();
            gl.bindTexture(gl.TEXTURE_2D, tAccumulator);
            gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, resolution, resolution, 0);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            progAO.setUniform("uSceneColor", "1i", 0);
            progAO.setUniform("uAccumulatorOut", "1i", 5);
            progAO.setUniform("uRes", "1f", resolution);
            rAO.render();

        }

        self.initialize();

}




function loadProgram(gl, src) {
    src = src.split('// __split__');
    return new core.Program(gl, src[0], src[1]);
}