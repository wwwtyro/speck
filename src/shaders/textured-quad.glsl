#version 100
precision highp float;

attribute vec3 aPosition;

void main() {
    gl_Position = vec4(aPosition, 1);
}


// __split__


#version 100
precision highp float;

uniform sampler2D uTexture;
uniform float uRes;

void main() {
    gl_FragColor = texture2D(uTexture, gl_FragCoord.xy/uRes);
}
