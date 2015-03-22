"use strict";

var glm = require('gl-matrix');
var core = require('webgl.js');
var fs = require('fs');
var cube = require("./cube");
var elements = require("./elements");

module.exports = function (canvas, resolution) {

        var self = this;

        var gl, canvas, program, fragDepthExt, instancedExt;
        var range;

        self.initialize = function() {

            // Initialize canvas/gl.
            canvas.width = canvas.height = resolution;
            gl = canvas.getContext('webgl');
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);

            fragDepthExt = gl.getExtension("EXT_frag_depth");
            instancedExt = gl.getExtension("ANGLE_instanced_arrays");

            // Initialize shaders.
            var raw = fs.readFileSync(__dirname + "/shaders/imposter.glsl", 'utf8');
            raw = raw.split('// __split__');
            program = new core.Program(gl, raw[0], raw[1]);

            // Initialize viewport.
            // gl.viewport(0, 0, resolution, resolution);

            self.renderable = null;
            range = 1.0;

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
                color.push.apply(color, [c[0], c[1], c[2]]);
            }

            var imposter = cube.position;
            
            attribs.aImposter.buffer.set(new Float32Array(imposter));
            attribs.aPosition.buffer.set(new Float32Array(position));
            attribs.aRadius.buffer.set(new Float32Array(radius));
            attribs.aColor.buffer.set(new Float32Array(color));

            var count = position.length / 3;

            // Create the renderable.
            self.renderable = new core.InstancedRenderable(gl, program, attribs, count, instancedExt);

            range = atoms.getRadius() * 2.0;
        }

        self.render = function(view) {
            if (self.renderable == null) {
                return;
            }
            var rect = view.getRect();
            var projection = glm.mat4.create();
            glm.mat4.ortho(projection, rect.left, rect.right, rect.bottom, rect.top, 0, 2 * range);
            var viewMat = glm.mat4.create();
            glm.mat4.lookAt(viewMat, [0, 0, 0], [0, 0, -1], [0, 1, 0]);
            var model = glm.mat4.create();
            glm.mat4.translate(model, model, [0, 0, -range]);
            glm.mat4.multiply(model, model, view.getRotation());
            program.setUniform("uProjection", "Matrix4fv", false, projection);
            program.setUniform("uView", "Matrix4fv", false, viewMat);
            program.setUniform("uModel", "Matrix4fv", false, model);
            program.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            program.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            program.setUniform("uAtomScale", "1f", view.getAtomScale());
            program.setUniform("uRes", "2fv", [resolution, resolution]);
            self.renderable.render();
        }

        self.initialize();

}
