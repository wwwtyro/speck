"use strict";

var glm = require('gl-matrix');
var Speck = require('./speck');
var fs = require('fs');
var xyz = require('./xyz');
var elements = require('./elements');

var speck;

function loadStructure(data) {

    speck.clearSpheres();

    var bounds = {
        x: Infinity,
        y: Infinity,
        z: Infinity,
        X: -Infinity,
        Y: -Infinity,
        Z: -Infinity
    };

    for (var i = 0; i < data.length; i++) {
        var a = data[i];
        var x = a.position[0];
        var y = a.position[1];
        var z = a.position[2];
        bounds.x = Math.min(x, bounds.x);
        bounds.X = Math.max(x, bounds.X);
        bounds.y = Math.min(y, bounds.y);
        bounds.Y = Math.max(y, bounds.Y);
        bounds.z = Math.min(z, bounds.z);
        bounds.Z = Math.max(z, bounds.Z);
    }

    var shift = {
        x: -bounds.x - (bounds.X - bounds.x)/2,
        y: -bounds.y - (bounds.Y - bounds.y)/2,
        z: -bounds.z - (bounds.Z - bounds.z)/2
    };
    
    for (var i = 0; i < data.length; i++) {
        var a = data[i];
        var x = a.position[0] + shift.x;
        var y = a.position[1] + shift.y;
        var z = a.position[2] + shift.z;
        var r = elements[a.symbol].color[0];
        var g = elements[a.symbol].color[1];
        var b = elements[a.symbol].color[2];
        var radius = elements[a.symbol].radius;
        speck.addSphere(x,y,z, r,g,b, radius);
    }
}

window.onload = function() {

    var canvas = document.getElementById("render-canvas");

    speck = new Speck(canvas, 384);

    var structs = {};
    structs.protein = fs.readFileSync(__dirname + "/samples/4E0O.xyz", 'utf8');
    structs.au = fs.readFileSync(__dirname + "/samples/au.xyz", 'utf8');
    structs.caffeine = fs.readFileSync(__dirname + "/samples/caffeine.xyz", 'utf8');
    structs.benzene = fs.readFileSync(__dirname + "/samples/benzene.xyz", 'utf8');
    structs.methane = fs.readFileSync(__dirname + "/samples/methane.xyz", 'utf8');

    loadStructure(xyz(structs.protein)[0]);

    var selector = document.getElementById("structure");
    selector.addEventListener("change", function() {
        loadStructure(xyz(structs[selector.value])[0]);
        speck.clear();
    });
    
    var lastX = 0.0;
    var lastY = 0.0;
    var buttonDown = false;

    canvas.addEventListener("mousedown", function(e) {
        document.body.style.cursor = "none";
        if (e.button == 0) {
            buttonDown = true;
        }
        lastX = e.clientX;
        lastY = e.clientY;
    });
    window.addEventListener("mouseup", function(e) {
        document.body.style.cursor = "";
        if (e.button == 0) {
            buttonDown = false;
        }
    });
    setInterval(function() {
        if (!buttonDown) {
            document.body.style.cursor = "";
        }
    }, 10);
    window.addEventListener("mousemove", function(e) {
        if (!buttonDown) {
            return;
        }
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        if (dx == 0 && dy == 0) {
            return;
        }
        lastX = e.clientX;
        lastY = e.clientY;
        if (e.shiftKey) {
            speck.translation.x -= dx*0.005*speck.scale;
            speck.translation.y += dy*0.005*speck.scale;
        } else {
            var m = glm.mat4.create();
            glm.mat4.rotateY(m, m, dx * 0.005);
            glm.mat4.rotateX(m, m, dy * 0.005);
            glm.mat4.multiply(speck.rotation, m, speck.rotation);
        }
        speck.clear();
    });
    canvas.addEventListener("mousewheel", function(e) {
        if (e.wheelDelta > 0) {
            if (e.shiftKey) {
                speck.elementScale *= 1/0.9
            } else {
                speck.scale *= 0.9;
            }
        } else {
            if (e.shiftKey) {
                speck.elementScale *= 0.9
            } else {
                speck.scale *= 1/0.9;
            }
        }
        speck.clear();
    })


    function loop() {
        speck.render();
        requestAnimationFrame(loop);
    }

    loop();

}
