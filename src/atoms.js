"use strict";

var elements = require("./elements");

module.exports = function() {

    var self = this;

    self.initialize = function() {
        self.atoms = [];
    };

    self.serialize = function() {
        return self.atoms;
    };

    self.deserialize = function(data) {
        self.atoms = data;
    }

    self.addAtom = function(symbol, x, y, z) {
        self.atoms.push({
            symbol: symbol,
            x: x,
            y: y,
            z: z,
        });
    };

    self.getCentroid = function() {
        var xsum = 0;
        var ysum = 0;
        var zsum = 0;
        for (var i = 0; i < self.atoms.length; i++) {
            xsum += self.atoms[i].x;
            ysum += self.atoms[i].y;
            zsum += self.atoms[i].z;
        }
        return {
            x: xsum/self.atoms.length,
            y: ysum/self.atoms.length,
            z: zsum/self.atoms.length
        };
    }

    self.center = function() {
        var shift = self.getCentroid();
        for (var i = 0; i < self.atoms.length; i++) {
            var a = self.atoms[i];
            a.x -= shift.x;
            a.y -= shift.y;
            a.z -= shift.z;
        }
    }

    self.getFarAtom = function() {
        if (self.farAtom !== undefined) {
            return self.farAtom;
        }
        self.farAtom = self.atoms[0];
        var maxd = 0.0;
        for (var i = 0; i < self.atoms.length; i++) {
            var a = self.atoms[i];
            var r = elements[a.symbol].radius;
            var rd = Math.sqrt(r*r + r*r + r*r) * 2.5;
            var d = Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z) + rd;
            if (d > maxd) {
                maxd = d;
                self.farAtom = a;
            }
        }
        return self.farAtom;
    }

    self.getRadius = function() {
        var a = self.getFarAtom();
        var r = elements[a.symbol].radius;
        var rd = Math.sqrt(r*r + r*r + r*r) * 2.5;
        return Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z) + rd;
    }

    self.initialize();
}