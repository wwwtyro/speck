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
uniform sampler2D uSceneDepth;
uniform sampler2D uAccumulatorOut;
uniform float uRes;
uniform float uAO;
uniform float uBrightness;
uniform float uOutlineStrength;

void main() {
    vec2 p = gl_FragCoord.xy/uRes;
    vec4 sceneColor = texture2D(uSceneColor, p);
    if (uOutlineStrength > 0.0) {
        float depth = texture2D(uSceneDepth, p).r;
        float r = 1.0/511.0;
        float d0 = abs(texture2D(uSceneDepth, p + vec2(-r,  0)).r - depth);
        float d1 = abs(texture2D(uSceneDepth, p + vec2( r,  0)).r - depth);
        float d2 = abs(texture2D(uSceneDepth, p + vec2( 0, -r)).r - depth);
        float d3 = abs(texture2D(uSceneDepth, p + vec2( 0,  r)).r - depth);
        float d = max(d0, d1);
        d = max(d, d2);
        d = max(d, d3);
        sceneColor.rgb *= pow(1.0 - d, uOutlineStrength * 32.0);
        sceneColor.a = max(step(0.003, d), sceneColor.a);
    }
    vec4 dAccum = texture2D(uAccumulatorOut, p);
    float shade = max(0.0, 1.0 - (dAccum.r + dAccum.g + dAccum.b + dAccum.a) * 0.25 * uAO);
    shade = pow(shade, 2.0);
    gl_FragColor = vec4(uBrightness * sceneColor.rgb * shade, sceneColor.a);
}
