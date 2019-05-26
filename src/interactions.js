"use strict";

var speckView = require("./view.js");

module.exports = function(args) {
    var scrollZoom = args.scrollZoom === undefined ? true : args.scrollZoom;
    var container = args.container;

    var getRotation = args.getRotation;
    var setRotation = args.setRotation;

    var getZoom = args.getZoom;
    var setZoom = args.setZoom;

    var refreshView = args.refreshView;

    var interactions = {
        buttonDown: false,
        lastX: 0.0,
        lastY: 0.0
    };

    function mousedownFn(e) {
        if(e.button == 0) {
            interactions = {
                buttonDown: true,
                lastX: e.clientX,
                lastY: e.clientY
            };
        }
    }
    container.addEventListener("mousedown", mousedownFn);

    function mouseupFn(e) {
        if(e.button == 0) {
            if(!interactions.buttonDown) {
                return;
            }

            interactions.buttonDown = false;
        }
    }
    window.addEventListener("mouseup", mouseupFn);

    function mousemoveFn(e) {
        if(!interactions.buttonDown || (e.buttons === 0)){
            return;
        }

        var dx = e.clientX - interactions.lastX;
        var dy = e.clientY - interactions.lastY;
        if(dx == 0 && dy == 0) {
            return;
        }

        interactions.lastX = e.clientX;
        interactions.lastY = e.clientY;

        var viewDummyObj = {
            rotation: new Float32Array(getRotation())
        };
        speckView.rotate(viewDummyObj, dx, dy);

        setRotation(viewDummyObj.rotation);
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
        window.removeEventListener("mousemove", mousemoveFn);
        container.removeEventListener("wheel", wheelFn);
    }

    return removeAllEventListeners;
}
