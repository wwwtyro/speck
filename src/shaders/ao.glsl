#version 100
precision highp float;

attribute vec3 aPosition;

void main() {
    gl_Position = vec4(aPosition, 1);
}


// __split__


#version 100
precision highp float;

uniform sampler2D uDirectColor;
uniform sampler2D uSceneColor;
uniform sampler2D uAccumulatorOut;
uniform float uRes;
uniform float uSampleCount;

void main() {
    vec2 p = gl_FragCoord.xy/uRes;
    vec4 sceneColor = texture2D(uSceneColor, p);
    vec4 directColor = texture2D(uDirectColor, p);
    vec4 dAccum = texture2D(uAccumulatorOut, p);
    vec4 aoColor = vec4(2.0 * sceneColor.rgb * (1.0 - dAccum.r*255.0/uSampleCount), sceneColor.a);
    gl_FragColor = mix(directColor, aoColor, uSampleCount/255.0);
}
