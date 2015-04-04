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
    vec4 c = texture2D(uTexture, gl_FragCoord.xy/uRes);
    gl_FragColor = vec4(c.rgb, 1);
}
