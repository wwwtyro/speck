#version 100
precision highp float;

attribute vec3 aPosition;

void main() {
    gl_Position = vec4(aPosition, 1);
}


// __split__


#version 100
precision highp float;

uniform sampler2D uSceneDepth;
uniform sampler2D uRandRotDepth;
uniform sampler2D uAccumulator;
uniform mat4 uRot;
uniform vec2 uBottomLeft;
uniform vec2 uTopRight;
uniform float uDepth;
uniform float uRes;
uniform float uSampleCount;

void main() {

    vec4 dScene = texture2D(uSceneDepth, gl_FragCoord.xy/uRes);

    vec3 r = vec3(uBottomLeft + (gl_FragCoord.xy/uRes) * (uTopRight - uBottomLeft), 0.0);

    r.z = -(dScene.r - 0.5) * uDepth;
    r = vec3(uRot * vec4(r, 1));
    float depth = -r.z/uDepth + 0.5;

    vec2 p = (r.xy - uBottomLeft)/(uTopRight - uBottomLeft);

    vec4 dRandRot = texture2D(uRandRotDepth, p);

    float ao = 0.0;
    if (depth * 0.99 >= dRandRot.r) {
        ao = 1.0/256.0;
    }
    vec4 acc = texture2D(uAccumulator, gl_FragCoord.xy/uRes);
    acc.r = min(1.0, acc.r + ao);
        
    gl_FragColor = vec4(acc.rgb, 1);

}
