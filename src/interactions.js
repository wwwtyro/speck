"use strict";

var speckView = require('./view.js'); 

module.exports = function(component, renderer, container) {
    component.setState({
	interactions: {
	    buttonDown: false,
	    lastX: 0.0,
	    lastY: 0.0
	}
    });

    
    container.addEventListener("mousedown", (e) => {
	if(e.button == 0) {
	    
	    let tmp_interactions = component.state.interactions;
	    tmp_interactions.buttonDown = true;
	    
	    component.setState({
		interactions: tmp_interactions,
		refreshView: true
	    }); 
	}
    });

    container.addEventListener("mouseup", (e) => {
	if(e.button == 0) {

	    let tmp_interactions = component.state.interactions;
	    tmp_interactions.buttonDown = false;

	    tmp_interactions.lastX = 0.0;
	    tmp_interactions.lastY = 0.0;
	    
	    component.setState({
		interactions: tmp_interactions,
		refreshView: true
	    });
	}
    });

    container.addEventListener("mousemove", (e) => {

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

	component.setState({
	    interactions: tmp_interactions,
	    refreshView: true
	});
	
	speckView.rotate(component.props.view, dx, dy);
	
    });

    if(component.props.scrollZoom) {

	container.addEventListener("wheel", (e) => {
	    
	    var wd = 0;
            if (e.deltaY < 0) {
		wd = 1;
            }
            else {
		wd = -1;
            }
	    component.props.view.zoom = component.props.view.zoom * (wd === 1 ? 1/0.9 : 0.9);

	    component.setState({
		refreshView: true
	    });

	}); 
    }
}
