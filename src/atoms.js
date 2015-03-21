"use strict";

var elements = require("./elements");

module.exports = function() {

    var self = this;

    self.initialize = function() {
        self.atoms = [];
        self.clearBounds();
    };

    self.clearBounds = function() {
        self.bounds = {
            x: Infinity,
            y: Infinity,
            z: Infinity,
            X: -Infinity,
            Y: -Infinity,
            Z: -Infinity
        };
    }

    self.addAtom = function(symbol, x, y, z) {
        self.atoms.push({
            symbol: symbol,
            x: x,
            y: y,
            z: z
        });
        var r = elements[symbol].radius;
        self.bounds.x = Math.min(x-r, self.bounds.x);
        self.bounds.X = Math.max(x+r, self.bounds.X);
        self.bounds.y = Math.min(y-r, self.bounds.y);
        self.bounds.Y = Math.max(y+r, self.bounds.Y);
        self.bounds.z = Math.min(z-r, self.bounds.z);
        self.bounds.Z = Math.max(z+r, self.bounds.Z);
    };

    self.center = function() {
        var shift = {
            x: -self.bounds.x - (self.bounds.X - self.bounds.x)/2,
            y: -self.bounds.y - (self.bounds.Y - self.bounds.y)/2,
            z: -self.bounds.z - (self.bounds.Z - self.bounds.z)/2
        };
        for (var i = 0; i < self.atoms.length; i++) {
            var a = self.atoms[i];
            a.x += shift.x;
            a.y += shift.y;
            a.z += shift.z;
        }
    }

    self.getRadius = function() {
        var dx = self.bounds.X - self.bounds.x;
        var dy = self.bounds.Y - self.bounds.y;
        var dz = self.bounds.Z - self.bounds.z;
        return Math.sqrt(dx*dx + dy*dy + dz*dz)/2.0;
    }

    self.clear = function() {
        self.atoms = [];
        self.clearBounds();
    };

    self.initialize();
}