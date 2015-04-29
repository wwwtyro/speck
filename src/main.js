"use strict";

var fs = require("fs");
var kb = require("keyboardjs");
var lz = require("lz-string");
var $ = require("jquery");

var Renderer = require("./renderer");
var View = require("./view");
var Atoms = require("./atoms");
var xyz = require("./xyz");
var samples = require("./samples");
var elements = require("./elements");
var presets = require("./presets");

window._speck_debug_getView = function() {
    console.log(JSON.stringify(view.serialize()));
}

kb.active = function(key) {
    var keys = kb.activeKeys();
    for (var i = 0; i < keys.length; i++) {
        if (key === keys[i]) {
            return true;
        }
    }
    return false;
}

var atoms = new Atoms();
var view = new View();
var renderer = null;
var needReset = false;

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
    renderer.setAtoms(atoms, view);
    needReset = true;
}

function loadSample() {
    var selector = document.getElementById("controls-sample");
    $.ajax({
        url: "static/samples/" + selector.value,
        success: function(data) {
            loadStructure(xyz(data)[0]);
        }
    });
}

window.onload = function() {

    renderContainer = document.getElementById("render-container");

    var imposterCanvas = document.getElementById("renderer-canvas");

    renderer = new Renderer(imposterCanvas, view.getResolution(), view.getAORes());

    var selector = document.getElementById("controls-sample");
    for (var i = 0; i < samples.length; i++) {
        var sample = samples[i];
        var option = document.createElement("option");
        option.value = sample.file;
        option.innerHTML = sample.name;
        if (i === 0) {
            option.selected = "selected";
        }
        selector.appendChild(option);
    }

    selector.addEventListener("change", loadSample);

    if (location.hash !== "") {
        var hash = location.hash.slice(1, location.hash.length);
        var data = lz.decompressFromEncodedURIComponent(hash);
        data = JSON.parse(data);
        atoms.deserialize(data.atoms);
        view.deserialize(data.view);
        renderer.setAtoms(atoms, view);
        renderer.setResolution(view.getResolution(), view.getAORes());
        needReset = true;
    } else {
        loadSample();
    }

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
        var wd = 0;
        if (e.wheelDelta > 0) {
            wd = 1;
        }
        else {
            wd = -1;
        }
        if (kb.active("a")) {
            var scale = view.getAtomScale();
            scale += wd/100;
            view.setAtomScale(scale);
            document.getElementById("atom-radius").value = Math.round(scale * 100);
            needReset = true;
        } else if (kb.active("z")) {
            var scale = view.getRelativeAtomScale();
            scale += wd/100;
            view.setRelativeAtomScale(scale);
            document.getElementById("relative-atom-radius").value = Math.round(scale * 100);
            needReset = true;
        } else if (kb.active("d")) {
            var scale = view.getDofStrength();
            scale += wd/100;
            view.setDofStrength(scale);
            document.getElementById("dof-strength").value = Math.round(scale * 100);
        } else if (kb.active("p")) {
            var scale = view.getDofPosition();
            scale += wd/100;
            view.setDofPosition(scale);
            document.getElementById("dof-position").value = Math.round(scale * 100);
        } else if (kb.active("b")) {
            var scale = view.getBondScale();
            scale += wd/100;
            view.setBondScale(scale);
            document.getElementById("bond-radius").value = Math.round(scale * 100);
            needReset = true;
        } else if (kb.active("s")) {
            var scale = view.getBondShade();
            scale += wd/100;
            view.setBondShade(scale);
            document.getElementById("bond-shade").value = Math.round(scale * 100);
            needReset = true;
        } else if (kb.active("o")) {
            var ao = view.getAmbientOcclusion();
            ao += wd/100;
            view.setAmbientOcclusion(ao);
            document.getElementById("ambient-occlusion").value = Math.round(ao * 100);
        } else if (kb.active("l")) {
            var bright = view.getBrightness();
            bright += wd/100;
            view.setBrightness(bright);
            document.getElementById("brightness").value = Math.round(bright * 100);
        } else if (kb.active("q")) {
            var outline = view.getOutlineStrength();
            outline += wd/100;
            view.setOutlineStrength(outline);
            document.getElementById("outline-strength").value = Math.round(outline * 100);
        } else {
            var zoom = view.getZoom() * (wd === 1 ? 1/0.9 : 0.9);
            view.setZoom(zoom);
            needReset = true;
        }
        e.preventDefault();
    });

    var buttonUpColor = "#bbb";
    var buttonDownColor = "#3bf";

    function hideAllControls() {
        document.getElementById("controls-structure").style.display = "none";
        document.getElementById("controls-render").style.display = "none";
        document.getElementById("controls-share").style.display = "none";
        document.getElementById("controls-help").style.display = "none";
        document.getElementById("controls-about").style.display = "none";
        document.getElementById("menu-button-structure").style.background = buttonUpColor;
        document.getElementById("menu-button-render").style.background = buttonUpColor;
        document.getElementById("menu-button-share").style.background = buttonUpColor;
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
    document.getElementById("menu-button-share").addEventListener("click", function() {
        showControl("share");
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

    document.getElementById("xyz-button").addEventListener("click", function() {
        loadStructure(xyz(document.getElementById("xyz-data").value)[0]);
    });

    document.getElementById("atom-radius").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("atom-radius").value);
        view.setAtomScale(scale/100);
        needReset = true;
    });

    document.getElementById("relative-atom-radius").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("relative-atom-radius").value);
        view.setRelativeAtomScale(scale/100);
        needReset = true;
    });

    document.getElementById("dof-strength").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("dof-strength").value);
        view.setDofStrength(scale/100);
    });

    document.getElementById("dof-position").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("dof-position").value);
        view.setDofPosition(scale/100);
    });

    document.getElementById("bond-radius").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("bond-radius").value);
        view.setBondScale(scale/100);
        needReset = true;
    });

    document.getElementById("bond-shade").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("bond-shade").value);
        view.setBondShade(scale/100);
        needReset = true;
    });

    document.getElementById("ambient-occlusion").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("ambient-occlusion").value);
        view.setAmbientOcclusion(scale/100);
    });

    document.getElementById("brightness").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("brightness").value);
        view.setBrightness(scale/100);
    });

    document.getElementById("ao-resolution").addEventListener("change", function(e) {
        var resolution = parseInt(document.getElementById("ao-resolution").value);
        view.setAORes(resolution);
        renderer.setResolution(view.getResolution(), resolution);
        needReset = true;
    });

    document.getElementById("outline-strength").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("outline-strength").value);
        view.setOutlineStrength(scale/100);
    });

    document.getElementById("samples-per-frame").addEventListener("change", function(e) {
        var spf = parseInt(document.getElementById("samples-per-frame").value);
        view.setSamplesPerFrame(spf);
    });

    document.getElementById("resolution").addEventListener("change", function(e) {
        var resolution = parseInt(document.getElementById("resolution").value);
        view.setResolution(resolution);
        renderer.setResolution(resolution, view.getAORes());
        needReset = true;
    });

    document.getElementById("view-preset").addEventListener("change", function(e) {
        var preset = document.getElementById("view-preset").value;
        view.deserialize(JSON.parse(presets[preset]));
        updateControls();
        renderer.setAtoms(atoms, view);
        needReset = true;
    });

    document.getElementById("bonds").addEventListener("click", function(e) {
        view.setBonds(document.getElementById("bonds").checked)
        renderer.setAtoms(atoms, view);
        needReset = true;
    });

    document.getElementById("bond-threshold").addEventListener("change", function(e) {
        view.setBondThreshold(parseFloat(document.getElementById("bond-threshold").value));
        renderer.setAtoms(atoms, view);
        needReset = true;
    });

    document.getElementById("fxaa").addEventListener("change", function(e) {
        view.setFXAA(parseInt(document.getElementById("fxaa").value))
    });

    document.getElementById("share-url-button").addEventListener("click", function(e) {
        var data = {
            view: view.serialize(),
            atoms: atoms.serialize()
        }
        data = lz.compressToEncodedURIComponent(JSON.stringify(data));
        document.getElementById("share-url").value = location.href.split("#")[0] + "#" + data;
    });

    document.getElementById("share-url").addEventListener("click", function(e) {
        this.select();
    });


    function updateControls() {
        document.getElementById("atom-radius").value = Math.round(view.getAtomScale() * 100);
        document.getElementById("relative-atom-radius").value = Math.round(view.getRelativeAtomScale() * 100);
        document.getElementById("bond-radius").value = Math.round(view.getBondScale() * 100);
        document.getElementById("bond-shade").value = Math.round(view.getBondShade() * 100);
        document.getElementById("bond-threshold").value = view.getBondThreshold();
        document.getElementById("ambient-occlusion").value = Math.round(view.getAmbientOcclusion() * 100);
        document.getElementById("brightness").value = Math.round(view.getBrightness() * 100);
        document.getElementById("ao-resolution").value = view.getAORes();
        document.getElementById("samples-per-frame").value = view.getSamplesPerFrame();
        document.getElementById("outline-strength").value = Math.round(view.getOutlineStrength() * 100);
        document.getElementById("bonds").checked = view.getBonds();
        document.getElementById("fxaa").value = view.getFXAA();
        document.getElementById("resolution").value = view.getResolution();
        document.getElementById("dof-strength").value = Math.round(view.getDofStrength() * 100);
        document.getElementById("dof-position").value = Math.round(view.getDofPosition() * 100);
    }

    updateControls();

    function loop() {
        document.getElementById("atom-radius-text").innerHTML = Math.round(view.getAtomScale() * 100) + "%";
        document.getElementById("relative-atom-radius-text").innerHTML = Math.round(view.getRelativeAtomScale() * 100) + "%";
        document.getElementById("bond-radius-text").innerHTML = Math.round(view.getBondScale() * 100) + "%";
        document.getElementById("bond-shade-text").innerHTML = Math.round(view.getBondShade() * 100) + "%";
        document.getElementById("ambient-occlusion-text").innerHTML = Math.round(view.getAmbientOcclusion() * 100) + "%";
        document.getElementById("brightness-text").innerHTML = Math.round(view.getBrightness() * 100) + "%";
        document.getElementById("outline-strength-text").innerHTML = Math.round(view.getOutlineStrength() * 100) + "%";
        document.getElementById("dof-strength-text").innerHTML = Math.round(view.getDofStrength() * 100) + "%";
        document.getElementById("dof-position-text").innerHTML = Math.round(view.getDofPosition() * 100) + "%";
        if (needReset) {
            renderer.reset();
            needReset = false;
        }
        renderer.render(view);
        requestAnimationFrame(loop);
    }

    loop();

}
