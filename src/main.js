"use strict";

var glm = require('gl-matrix');
var Imposter = require('./imposter-renderer');
var fs = require('fs');
var xyz = require('./xyz');
var elements = require('./elements');
var View = require("./view");
var Atoms = require("./atoms");

var atoms = new Atoms();
var imposter = null;
var needReset = false;
var resolution = 768;

var renderContainer;

function loadStructure(data) {

    atoms = new Atoms();

    for (var i = 0; i < data.length; i++) {
        var a = data[i];
        var x = a.position[0];
        var y = a.position[1];
        var z = a.position[2];
        atoms.addAtom(a.symbol, x,y,z);
    }

    atoms.center();

    imposter.setAtoms(atoms);

    needReset = true;

}


window.onload = function() {

    renderContainer = document.getElementById("render-container");

    var imposterCanvas = document.getElementById("imposter-canvas");

    imposter = new Imposter(imposterCanvas, resolution);


    var view = new View();
    view.setResolution(resolution);

    var structs = {};
    structs.protein0 = fs.readFileSync(__dirname + "/samples/4E0O.xyz", 'utf8');
    structs.protein1 = fs.readFileSync(__dirname + "/samples/4QCI.xyz", 'utf8');
    structs.testosterone = fs.readFileSync(__dirname + "/samples/testosterone.xyz", 'utf8');
    structs.au = fs.readFileSync(__dirname + "/samples/au.xyz", 'utf8');
    structs.caffeine = fs.readFileSync(__dirname + "/samples/caffeine.xyz", 'utf8');
    structs.benzene = fs.readFileSync(__dirname + "/samples/benzene.xyz", 'utf8');
    structs.methane = fs.readFileSync(__dirname + "/samples/methane.xyz", 'utf8');

    loadStructure(xyz(structs.testosterone)[0]);

    var selector = document.getElementById("controls-sample");
    selector.addEventListener("change", function() {
        loadStructure(xyz(structs[selector.value])[0]);
    });
    
    var lastX = 0.0;
    var lastY = 0.0;
    var buttonDown = false;

    renderContainer.addEventListener("mousedown", function(e) {
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
            view.translate(dx, dy);
        } else {
            view.rotate(dx, dy);
        }
        needReset = true;
    });
    renderContainer.addEventListener("mousewheel", function(e) {
        if (e.wheelDelta > 0) {
            if (e.shiftKey) {
                view.scaleAtoms(1/0.95);
            } else {
                view.zoom(1/0.9);
            }
        } else {
            if (e.shiftKey) {
                view.scaleAtoms(0.95);
            } else {
                view.zoom(0.9);
            }
        }
        needReset = true;
        e.preventDefault();
    });

    function setResolution(res) {
        resolution = res;
        imposter.setResolution(resolution);
        needReset = true;
    }

    var buttonUpColor = "#bbb";
    var buttonDownColor = "#3bf";

    function hideAllControls() {
        document.getElementById("controls-structure").style.display = "none";
        document.getElementById("controls-render").style.display = "none";
        document.getElementById("controls-help").style.display = "none";
        document.getElementById("controls-about").style.display = "none";
        document.getElementById("menu-button-structure").style.background = buttonUpColor;
        document.getElementById("menu-button-render").style.background = buttonUpColor;
        document.getElementById("menu-button-help").style.background = buttonUpColor;
        document.getElementById("menu-button-about").style.background = buttonUpColor;
    }

    function showControl(id) {
        hideAllControls();
        document.getElementById("controls-" + id).style.display = "block";
        document.getElementById("menu-button-" + id).style.background = buttonDownColor;
    }

    document.getElementById("menu-button-structure").addEventListener("click", function() {
        showControl("structure");
    });
    document.getElementById("menu-button-render").addEventListener("click", function() {
        showControl("render");
    });
    document.getElementById("menu-button-help").addEventListener("click", function() {
        showControl("help");
    });
    document.getElementById("menu-button-about").addEventListener("click", function() {
        showControl("about");
    });

    showControl("render");

    function reflow() {
        var menu = document.getElementById("controls-container");
        var ww = window.innerWidth;
        var wh = window.innerHeight;
        var rcw = Math.round(wh * 0.95);
        var rcm = Math.round((wh - rcw) / 2);
        renderContainer.style.height = rcw + "px";
        renderContainer.style.width = rcw + "px";
        renderContainer.style.left = rcm + "px";
        renderContainer.style.top = rcm + "px";
        menu.style.left = 48 + rcw + rcm * 2 + "px";
        menu.style.top = 48 + rcm + "px";
    }

    reflow();

    window.addEventListener("resize", reflow);

    var xyzData = document.getElementById("xyz-data");
    var xyzLoadButton = document.getElementById("xyz-button");
    xyzLoadButton.addEventListener("click", function() {
        loadStructure(xyz(xyzData.value)[0]);
    });

    document.getElementById("bond-radius").addEventListener("input", function() {
        needReset = true;
    })

    function loop() {
        var SPF = parseInt(document.getElementById("SPF").value);
        var AO = parseFloat(document.getElementById("AO").value);
        var RES = parseInt(document.getElementById("RES").value);
        var brightness = parseInt(document.getElementById("brightness").value);
        var outline = document.getElementById("outline").checked;
        var bondRadius = parseInt(document.getElementById("bond-radius").value);
        document.getElementById("brightness-pct").innerHTML = brightness + "%";
        document.getElementById("ao-pct").innerHTML = AO + "%";
        document.getElementById("spf-display").innerHTML = SPF;
        document.getElementById("bond-radius-pct").innerHTML = bondRadius + "%";
        if (RES !== resolution) {
            setResolution(RES);
        }
        if (needReset) {
            imposter.reset();
            needReset = false;
        }
        imposter.render(view, AO/100, SPF, brightness/100, outline, bondRadius/100);
        requestAnimationFrame(loop);
    }

    loop();

}
