"use strict";

var speckView = require("./view.js");

module.exports = function(args) {
    if(arguments.length > 1) {
        throw "Error: The Speck Interactions module has changed!";
    }
    else if((arguments.length === 0) || (typeof args !== "object")) {
        throw "Error: Arguments not provided to interactions";
    }

    var scrollZoom = args.scrollZoom === undefined ? true : args.scrollZoom;
    var container = args.container;

    var getRotation = args.getRotation;
    var setRotation = args.setRotation;

    var getTranslation = args.getTranslation;
    var setTranslation = args.setTranslation;

    var getZoom = args.getZoom;
    var setZoom = args.setZoom;

    var refreshView = args.refreshView;

    var interactions = {
        buttonDown: false,
        shiftDown: false,
        lastX: 0.0,
        lastY: 0.0
    };

    function mousedownFn(e) {
        if(e.button === 0) {
            interactions = {
                buttonDown: true,
                shiftDown: interactions.shiftDown,
                lastX: e.clientX,
                lastY: e.clientY
            };
        }
    }
    container.addEventListener("mousedown", mousedownFn);

    function mouseupFn(e) {
        if(e.button === 0) {
            if(!interactions.buttonDown) {
                return;
            }

            interactions.buttonDown = false;
        }
    }
    window.addEventListener("mouseup", mouseupFn);

    function keychangeFn(e) {
        interactions.shiftDown = e.shiftKey;
    }
    window.addEventListener("keydown", keychangeFn);
    window.addEventListener("keyup", keychangeFn);

    function mousemoveFn(e) {
        if(!interactions.buttonDown || (e.buttons === 0)){
            return;
        }

        // prevents interaction with other page elements while dragging
        e.preventDefault();

        var dx = e.clientX - interactions.lastX;
        var dy = e.clientY - interactions.lastY;
        if(dx === 0 && dy === 0) {
            return;
        }

        interactions.lastX = e.clientX;
        interactions.lastY = e.clientY;

        if(interactions.shiftDown) {
            var translation = getTranslation();
            var inverseZoom = 0.001/getZoom();
            setTranslation({
                x: translation.x - dx * inverseZoom,
                y: translation.y + dy * inverseZoom
            });
        }
        else {
            var viewDummyObj = {
                rotation: new Float32Array(getRotation())
            };
            speckView.rotate(viewDummyObj, dx, dy);

            setRotation(viewDummyObj.rotation);
        }
        refreshView();
    }
    window.addEventListener("mousemove", mousemoveFn);

    function wheelFn(e) {
        // prevents the page from scrolling when using scroll wheel inside speck component
        e.preventDefault();

        setZoom(getZoom() * (e.deltaY < 0 ? 1/0.9 : 0.9));
        refreshView();

    }
    if(scrollZoom) {
        container.addEventListener("wheel", wheelFn);
    }

    function removeAllEventListeners() {
        container.removeEventListener("mousedown", mousedownFn);
        window.removeEventListener("mouseup", mouseupFn);
        window.removeEventListener("keydown", keychangeFn);
        window.removeEventListener("keyup", keychangeFn);
        window.removeEventListener("mousemove", mousemoveFn);
        container.removeEventListener("wheel", wheelFn);
    }

    return removeAllEventListeners;
}
