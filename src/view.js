"use strict";

var glm = require("gl-matrix");

module.exports = function() {

    var self = this;

    self.initialize = function() {
        self.bottom = -1;
        self.top = 1;
        self.left = -1;
        self.right = 1;
        self.atomScale = 1;
        self.rotation = glm.mat4.create();
    };

    self.zoom = function(amount) {
        self.bottom *= amount;
        self.top *= amount;
        self.left *= amount;
        self.right *= amount;
    };

    self.translate = function(dx, dy) {
        self.bottom += dy;
        self.top += dy;
        self.left += dx;
        self.right += dx;
    };

    self.rotate = function(dx, dy) {
        var m = glm.mat4.create();
        glm.mat4.rotateY(m, m, dx);
        glm.mat4.rotateX(m, m, dy);
        glm.mat4.multiply(self.rotation, m, self.rotation);
    };

    self.scaleAtoms = function(amount) {
        self.atomScale *= amount;
    };

    self.initialize();
}