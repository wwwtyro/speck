"use strict";

var glm = require("gl-matrix");

module.exports = function() {

    var self = this;

    var aspect = 1.0;
    var zoom = 0.1;
    var translation = {x: 0.0, y: 0.0};
    var atomScale = 1.0;
    var rotation = glm.mat4.create();
    var resolution = 768;

    self.initialize = function() {
    };

    self.setResolution = function(res) {
        resolution  = res;
    };

    self.zoom = function(amount) {
        zoom *= amount;
    }

    self.getZoom = function() {
        return zoom;
    }

    self.translate = function(dx, dy) {
        translation.x -= dx/(resolution * zoom);
        translation.y += dy/(resolution * zoom);
    };

    self.rotate = function(dx, dy) {
        var m = glm.mat4.create();
        glm.mat4.rotateY(m, m, dx);
        glm.mat4.rotateX(m, m, dy);
        glm.mat4.multiply(rotation, m, rotation);
    };

    self.getRotation = function() {
        var out = glm.mat4.create();
        glm.mat4.copy(out, rotation);
        return out;
    };

    self.scaleAtoms = function(amount) {
        atomScale *= amount;
    };

    self.getAtomScale = function() {
        return atomScale;
    };

    self.getRect = function() {
        var width = 1.0/zoom;
        var height = width/aspect;
        var bottom = -height/2 + translation.y;
        var top = height/2 + translation.y;
        var left = -width/2 + translation.x;
        var right = width/2 + translation.x;
        return {
            bottom: bottom,
            top: top,
            left: left,
            right: right
        }
    }

    self.initialize();
}

