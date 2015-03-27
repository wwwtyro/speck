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
uniform mat4 uInvRot;
uniform float uRes;
uniform vec2 uBottomLeft;
uniform vec2 uTopRight;
uniform float uDepth;

void main() {
    vec4 dScene = texture2D(uSceneDepth, gl_FragCoord.xy/uRes);
    vec4 dRandRot = texture2D(uRandRotDepth, gl_FragCoord.xy/uRes);
    vec4 acc = texture2D(uAccumulator, gl_FragCoord.xy/uRes);

    vec3 r = vec3(uBottomLeft + (gl_FragCoord.xy/uRes) * (uTopRight - uBottomLeft), 0.0);
    r.z -= dScene.r * uDepth;
    r.z += uDepth/2.0;
    r = vec3(uInvRot * vec4(r,0));
    r.z -= uDepth/2.0;
    r.z = -r.z/uDepth;

    if (r.z > dRandRot.r) {
        acc.r = min(1.0, acc.r + 1.0/255.0);
    }
    gl_FragColor = vec4(acc.r, 0, 0, 0);
}
