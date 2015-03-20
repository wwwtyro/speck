"use strict";

var glm = require('gl-matrix');
var core = require('webgl.js');
var fs = require('fs');

module.exports = function (canvas, resolution) {

        var self = this;

        var spheres = [];
        var spheresDirty = true;
        var spheresDataTexture = null;
        var float_texture_ext = null;
        var lastFrame = null;
        var iteration = 1;
        var gl, canvas, program;

        self.initialize = function() {

            self.rotation = glm.mat4.create();
            self.scale = 10.0;
            self.elementScale = 1.0;
            self.translation = {
                x: 0.0,
                y: 0.0
            }

            // Initialize canvas/gl.
            canvas.width = canvas.height = resolution;
            gl = canvas.getContext('webgl');

            // Initialize the last frame texture.
            gl.activeTexture(gl.TEXTURE0);
            lastFrame = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, lastFrame);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.bindTexture(gl.TEXTURE_2D, null);

            window.gl = gl;

            // float texture extension
            float_texture_ext = gl.getExtension('OES_texture_float');

            // Initialize shaders.
            var raw = fs.readFileSync(__dirname + "/shaders/speck.glsl", 'utf8');
            raw = raw.split('// __split__');
            program = new core.Program(gl, raw[0], raw[1]);

            // Initialize viewport.
            gl.viewport(0, 0, resolution, resolution);

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

        self.clear = function() {
            iteration = 1;
        }

        self.clearSpheres = function() {
            spheres = [];
            spheresDirty = true;
        }

        // Add a sphere.
        self.addSphere = function(x, y, z, r, g, b, radius) {
            spheres.push.apply(spheres, [x, y, z, r, g, b, radius, 0.0]);
            spheresDirty = true;
        }

        function genSphereDataTexture() {
            if (!spheresDirty) {
                return;
            }
            var width = spheres.length/4;
            gl.activeTexture(gl.TEXTURE1);
            spheresDataTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, spheresDataTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, 1, 0, gl.RGBA, gl.FLOAT, new Float32Array(spheres));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
            spheresDirty = false;
        }

        self.render = function() {
            genSphereDataTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lastFrame);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, spheresDataTexture);
            program.setUniform("uLastFrame", "1i", 0);
            program.setUniform("uSphereData", "1i", 1);
            program.setUniform("uRes", "2fv", [resolution, resolution]);
            program.setUniform("uSpheresLength", "1i", spheres.length/4);
            program.setUniform("uIteration", "1f", iteration);
            program.setUniform("uRotation", "Matrix4fv", false, self.rotation);
            program.setUniform("uScale", "1f", self.scale);
            program.setUniform("uElementScale", "1f", self.elementScale);
            program.setUniform("uTranslation", "2fv", [self.translation.x, self.translation.y]);
            program.setUniform("uRand", "4fv", [Math.random(), Math.random(), Math.random(), Math.random()]);
            self.renderable.render();
            if (iteration < 64) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, lastFrame);
                gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, resolution, resolution, 0)
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            iteration++;
            return canvas;
        }

        self.initialize();

}
