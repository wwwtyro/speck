"use strict";

var speckView = require("./view.js");

module.exports = function(component, renderer, container) {
    component.setState({
        interactions: {
            buttonDown: false,
            lastX: 0.0,
            lastY: 0.0
        }
    });

    function mousedownFn(e) {
        if(e.button == 0) {
            let tmp_interactions = component.state.interactions;
            tmp_interactions.buttonDown = true;
            tmp_interactions.lastX = e.clientX;
            tmp_interactions.lastY = e.clientY;

            component.setState({
                interactions: tmp_interactions,
                refreshView: true
            });
        }
    }
    container.addEventListener("mousedown", mousedownFn);

    function mouseupFn(e) {
        if(e.button == 0) {
            let tmp_interactions = component.state.interactions;
            if(!tmp_interactions.buttonDown) {
                return;
            }

            tmp_interactions.buttonDown = false;

             component.setState({
                interactions: tmp_interactions,
                refreshView: false
            });
        }
    }
    window.addEventListener("mouseup", mouseupFn);

    function mousemoveFn(e) {
        var tmp_interactions = component.state.interactions;
        if(!tmp_interactions.buttonDown){
            return;
        }

        var dx = e.clientX - tmp_interactions.lastX;
        var dy = e.clientY - tmp_interactions.lastY;
        if(dx == 0 && dy == 0) {
            return;
        }

        tmp_interactions.lastX = e.clientX;
        tmp_interactions.lastY = e.clientY;

        var view = Object.assign({}, component.props.view);
        speckView.rotate(view, dx, dy);

        component.props.setProps({
            view: view
        });

        component.setState({
            interactions: tmp_interactions,
            refreshView: true
        });
    }
    window.addEventListener("mousemove", mousemoveFn);

    function wheelFn(e) {
        // prevents the page from scrolling when using scroll wheel inside speck component
        e.preventDefault();

        component.props.setProps({
            view: Object.assign(
                component.props.view,
                {zoom: component.props.view.zoom * (e.deltaY < 0 ? 1/0.9 : 0.9)}
            )
        });

        component.setState({
            refreshView: true
        });
    }
    if(component.props.scrollZoom) {
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
