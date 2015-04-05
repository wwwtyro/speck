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
uniform float uSampleCount;
uniform float uAO;
uniform float uBrightness;

void main() {
    vec2 p = gl_FragCoord.xy/uRes;
    vec4 sceneColor = texture2D(uSceneColor, p);
    vec4 dAccum = texture2D(uAccumulatorOut, p);
    float shade = max(0.0, 1.0 - (dAccum.r + dAccum.g + dAccum.b + dAccum.a) * 0.25 * uAO);
    shade = pow(shade, 2.0);
    gl_FragColor = vec4(uBrightness * sceneColor.rgb * shade, sceneColor.a);
}
