"use strict";


var glm = require("./gl-matrix");
var elements = require("./elements")


var MIN_ATOM_RADIUS = Infinity;
var MAX_ATOM_RADIUS = -Infinity;
for (var i = 0; i <= 118; i++) {
    MIN_ATOM_RADIUS = Math.min(MIN_ATOM_RADIUS, elements[i].radius);
    MAX_ATOM_RADIUS = Math.max(MAX_ATOM_RADIUS, elements[i].radius);
}


function clamp(min, max, value) {
    return Math.min(max, Math.max(min, value));
}


var _new = module.exports.new = function() {
    return {
        aspect: 1.0,
        zoom: 0.125,
        translation: {
            x: 0.0,
            y: 0.0
        },
        atomScale: 0.6,
        relativeAtomScale: 1.0,
        bondScale: 0.5,
        rotation: glm.mat4.create(),
        ao: 0.5,
        aoRes: 128,
        brightness: 0.5,
        outline: 0.0,
        spf: 32,
        bonds: false,
        bondThreshold: 1.2,
        bondShade: 0.0,
        atomShade: 0.0,
        resolution: 768,
        dofStrength: 0.0,
        dofPosition: 0.5,
        fxaa: 1
    };
};


var _center = module.exports.center = function(v, atoms) {
    var maxX = -Infinity;
    var minX = Infinity;
    var maxY = -Infinity;
    var minY = Infinity;
    for(var i = 0; i < atoms.atoms.length; i++) {
        var a = atoms.atoms[i];
        var r = elements[a.symbol].radius;
        r = 2.5 * v.atomScale * (1 + (r - 1) * v.relativeAtomScale);
        var p = glm.vec4.fromValues(a.x, a.y, a.z, 0);
        glm.vec4.transformMat4(p, p, v.rotation);
        maxX = Math.max(maxX, p[0] + r);
        minX = Math.min(minX, p[0] - r);
        maxY = Math.max(maxY, p[1] + r);
        minY = Math.min(minY, p[1] - r);
    }
    var cx = minX + (maxX - minX) / 2.0;
    var cy = minY + (maxY - minY) / 2.0;
    v.translation.x = cx;
    v.translation.y = cy;
    var scale = Math.max(maxX - minX, maxY - minY);
    v.zoom = 1/(scale * 1.01);
};


var _override = module.exports.override = function(v, data) {
    for (var key in data) {
        v[key] = data[key];
    }
    _resolve(v);
};


var _clone = module.exports.clone = function(v) {
    return _deserialize(_serialize(v));
};


var _serialize = module.exports.serialize = function(v) {
    return JSON.stringify(v);
};


var _deserialize = module.exports.deserialize = function(v) {
    v = JSON.parse(v);
    v.rotation = glm.mat4.clone(v.rotation);
    return v;
};


var _resolve = module.exports.resolve = function(v) {
    v.dofStrength = clamp(0, 1, v.dofStrength);
    v.dofPosition = clamp(0, 1, v.dofPosition);
    v.zoom = clamp(0.001, 2.0, v.zoom);
    v.atomScale = clamp(0, 1, v.atomScale);
    v.relativeAtomScale = clamp(0, 1, v.relativeAtomScale);
    v.bondScale = clamp(0, 1, v.bondScale);
    v.bondShade = clamp(0, 1, v.bondShade);
    v.atomShade = clamp(0, 1, v.atomShade);
    v.ao = clamp(0, 1, v.ao);
    v.brightness = clamp(0, 1, v.brightness);
    v.outline = clamp(0, 1, v.outline);
};


var _translate = module.exports.translate = function(v, dx, dy) {
    v.translation.x -= dx/(v.resolution * v.zoom);
    v.translation.y += dy/(v.resolution * v.zoom);
    _resolve(v);
};


var _rotate = module.exports.rotate = function(v, dx, dy) {
    var m = glm.mat4.create();
    glm.mat4.rotateY(m, m, dx * 0.005);
    glm.mat4.rotateX(m, m, dy * 0.005);
    glm.mat4.multiply(v.rotation, m, v.rotation);
    _resolve(v);
};


var _getRect = module.exports.getRect = function(v) {
    var width = 1.0/v.zoom;
    var height = width/v.aspect;
    var bottom = -height/2 + v.translation.y;
    var top = height/2 + v.translation.y;
    var left = -width/2 + v.translation.x;
    var right = width/2 + v.translation.x;
    return {
        bottom: bottom,
        top: top,
        left: left,
        right: right
    };
};


var _getBondRadius = module.exports.getBondRadius = function(v) {
    return v.bondScale * v.atomScale * 
        (1 + (MIN_ATOM_RADIUS - 1) * v.relativeAtomScale);
};


