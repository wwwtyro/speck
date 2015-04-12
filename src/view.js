"use strict";


var glm = require("gl-matrix");
var elements = require("./elements")


var MIN_ATOM_RADIUS = Infinity;
for (var i = 0; i <= 118; i++) {
    MIN_ATOM_RADIUS = Math.min(MIN_ATOM_RADIUS, elements[i].radius);
}


function clamp(min, max, value) {
    return Math.min(max, Math.max(min, value));
}


module.exports = function View(serialized) {

    var self = this;

    var aspect = 1.0;
    var zoom = 0.125;
    var translation = {x: 0.0, y: 0.0};
    var atomScale = 0.6;
    var bondScale = 0.5;
    var rotation = glm.mat4.create();
    var ao = 0.5;
    var brightness = 0.5;
    var outline = false;
    var spf = 32;
    var resolution = 768;

    self.initialize = function() {
        if (serialized !== undefined) {
            self.deserialize(serialized);
        }
    };

    self.serialize = function() {
        return {
            aspect: aspect,
            zoom: zoom,
            translation: {x: translation.x, y: translation.y},
            atomScale: atomScale,
            bondScale: bondScale,
            rotation: glm.mat4.clone(rotation),
            ao: ao,
            brightness: brightness,
            outline: outline,
            spf: spf,
            resolution: resolution
        }
    };

    self.deserialize = function(data) {
        aspect = data.aspect;
        zoom = data.zoom;
        translation = {x: data.translation.x, y: data.translation.y};
        atomScale = data.atomScale;
        bondScale = data.bondScale;
        rotation = glm.mat4.clone(data.rotation);
        ao = data.ao;
        brightness = data.brightness;
        outline = data.outline;
        spf = data.spf;
        resolution = data.resolution;
    };

    self.clone = function() {
        return new View(self.serialize());
    };

    self.setResolution = function(res) {
        resolution  = res;
    };

    self.getResolution = function() {
        return resolution;
    };

    self.setZoom = function(val) {
        zoom = clamp(0.001, 2.0, val);
    };

    self.getZoom = function() {
        return zoom;
    };

    self.translate = function(dx, dy) {
        translation.x -= dx/(resolution * zoom);
        translation.y += dy/(resolution * zoom);
    };

    self.getTranslation = function() {
        return {x: translation.x, y: translation.y};
    };

    self.setTranslation = function(x, y) {
        translation.x = x;
        translation.y = y;
    };

    self.rotate = function(dx, dy) {
        var m = glm.mat4.create();
        glm.mat4.rotateY(m, m, dx * 0.005);
        glm.mat4.rotateX(m, m, dy * 0.005);
        glm.mat4.multiply(rotation, m, rotation);
    };

    self.setRotation = function(rot) {
        rotation = glm.mat4.clone(rot);
    };

    self.getRotation = function() {
        return glm.mat4.clone(rotation);
    };

    self.setAtomScale = function(val) {
        atomScale = clamp(0, 1, val);
    };

    self.getAtomScale = function() {
        return atomScale;
    };

    self.setBondScale = function(val) {
        bondScale = clamp(0, 1, val);
    };

    self.getBondScale = function() {
        return bondScale;
    };

    self.setAmbientOcclusion = function(val) {
        ao = clamp(0, 1, val);
    };

    self.getAmbientOcclusion = function() {
        return ao;
    };

    self.setBrightness = function(val) {
        brightness = clamp(0, 1, val);
    };

    self.getBrightness = function() {
        return brightness;
    };

    self.setOutline = function(val) {
        outline = val;
    };

    self.getOutline = function() {
        return outline;
    };

    self.setSamplesPerFrame = function(val) {
        spf = val;
    };

    self.getSamplesPerFrame = function() {
        return spf;
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
    };

    self.getBondRadius = function() {
        return bondScale * MIN_ATOM_RADIUS * atomScale;
    };

    self.initialize();
}

