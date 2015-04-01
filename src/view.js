"use strict";

var glm = require("gl-matrix");

module.exports = function View() {

    var self = this;

    self.__aspect = 1.0;
    self.__zoom = 0.125;
    self.__translation = {x: 0.0, y: 0.0};
    self.__atomScale = 1.5;
    self.__rotation = glm.mat4.create();
    self.__resolution = 768;

    self.initialize = function() {
    };

    self.clone = function() {
        var v = new View();
        v.__aspect = self.__aspect;
        v.__zoom = self.__zoom;
        v.__translation = {x: self.__translation.x, y: self.__translation.y};
        v.__atomScale = self.__atomScale;
        v.__rotation = glm.mat4.clone(self.__rotation);
        v.__resolution = self.__resolution;
        return v;
    }

    self.setResolution = function(res) {
        self.__resolution  = res;
    };

    self.zoom = function(amount) {
        self.__zoom *= amount;
    }

    self.getZoom = function() {
        return self.__zoom;
    }

    self.translate = function(dx, dy) {
        self.__translation.x -= dx/(self.__resolution * self.__zoom);
        self.__translation.y += dy/(self.__resolution * self.__zoom);
    };

    self.rotate = function(dx, dy) {
        var m = glm.mat4.create();
        glm.mat4.rotateY(m, m, dx);
        glm.mat4.rotateX(m, m, dy);
        glm.mat4.multiply(self.__rotation, m, self.__rotation);
    };

    self.getRotation = function() {
        return glm.mat4.clone(self.__rotation);
    };

    self.scaleAtoms = function(amount) {
        self.__atomScale *= amount;
        self.__atomScale = Math.min(2.5, self.__atomScale);
        self.__atomScale = Math.max(0.2, self.__atomScale);
    };

    self.getAtomScale = function() {
        return self.__atomScale;
    };

    self.getRect = function() {
        var width = 1.0/self.__zoom;
        var height = width/self.__aspect;
        var bottom = -height/2 + self.__translation.y;
        var top = height/2 + self.__translation.y;
        var left = -width/2 + self.__translation.x;
        var right = width/2 + self.__translation.x;
        return {
            bottom: bottom,
            top: top,
            left: left,
            right: right
        }
    }

    self.initialize();
}

