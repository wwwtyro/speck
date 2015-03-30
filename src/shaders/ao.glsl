#version 100
precision highp float;

attribute vec3 aPosition;

void main() {
    gl_Position = vec4(aPosition, 1);
}


// __split__


#version 100
precision highp float;

uniform sampler2D uSceneColor;
uniform sampler2D uAccumulatorOut;
uniform float uRes;

void main() {
    vec4 color = texture2D(uSceneColor, gl_FragCoord.xy/uRes);
    vec4 dAccum = texture2D(uAccumulatorOut, gl_FragCoord.xy/uRes);
    gl_FragColor = vec4(2.0 * color.rgb * (1.0 - 0.75 * dAccum.r), color.a);
}
