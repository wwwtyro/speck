"use strict";

var glm = require('gl-matrix');
var core = require('webgl.js');
var fs = require('fs');
var elements = require('./elements');

module.exports = function (canvas, resolution) {

        var self = this;

        var spheres = [];
        var spheresDirty = true;
        var spheresDataTexture = null;
        var float_texture_ext = null;
        var gl, canvas, program;
        var scanline = 0;
        var range = 0;

        self.initialize = function() {

            self.SPP = 4;

            // Initialize canvas/gl.
            canvas.width = canvas.height = resolution;
            gl = canvas.getContext('webgl', {
                preserveDrawingBuffer: true
            });
            gl.enable(gl.SCISSOR_TEST);
            gl.clearColor(0,0,0,0);

            // float texture extension
            float_texture_ext = gl.getExtension('OES_texture_float');

            // Initialize shaders.
            var raw = fs.readFileSync(__dirname + "/shaders/speck.glsl", 'utf8');
            raw = raw.split('// __split__');
            program = new core.Program(gl, raw[0], raw[1]);

            // Initialize viewport.
            // gl.viewport(0, 0, resolution, resolution);

            // Initialize geometry.
            var position = [
                -1, -1, 0,
                 1, -1, 0,
                 1,  1, 0,
                -1, -1, 0,
                 1,  1, 0,
                -1,  1, 0
            ];

            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };

            attribs.aPosition.buffer.set(new Float32Array(position));

            var count = position.length / 9;

            // Create the renderable.
            self.renderable = new core.Renderable(gl, program, attribs, count);
        }

        self.setAtoms = function(atoms) {
            spheres = [];
            for (var i = 0; i < atoms.atoms.length; i++) {
                var a = atoms.atoms[i];
                var el = elements[a.symbol];
                var r = el.color[0];
                var g = el.color[1];
                var b = el.color[2];
                spheres.push.apply(spheres, [a.x, a.y, a.z, r, g, b, el.radius, 0.0]);
            }
            var width = spheres.length/4;
            gl.activeTexture(gl.TEXTURE0);
            spheresDataTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, spheresDataTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, 1, 0, gl.RGBA, gl.FLOAT, new Float32Array(spheres));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
            range = atoms.getRadius() * 2;
        }

        self.reset = function() {
            scanline = resolution - 1;
            gl.scissor(0, 0, resolution, resolution);
            gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        }

        self.render = function(view) {
            if (scanline < 0) {
                return;
            }
            gl.scissor(0, scanline, resolution, 1);
            var rect = view.getRect();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, spheresDataTexture);
            program.setUniform("uSphereData", "1i", 0);
            program.setUniform("uRes", "2fv", [resolution, resolution]);
            program.setUniform("uSpheresLength", "1i", spheres.length/4);
            program.setUniform("uRotation", "Matrix4fv", false, view.getRotation());
            program.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            program.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            program.setUniform("uElementScale", "1f", view.getAtomScale());
            program.setUniform("uScale", "1f", view.getZoom());
            program.setUniform("uOffset", "1f", -range)
            program.setUniform("uSPP", "1i", self.SPP);
            program.setUniform("uRand", "4fv", [Math.random(), Math.random(), Math.random(), Math.random()]);
            self.renderable.render();
            scanline--;
        }

        self.initialize();

}
