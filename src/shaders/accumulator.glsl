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
uniform sampler2D uSceneNormal;
uniform sampler2D uRandRotDepth;
uniform sampler2D uAccumulator;
uniform mat4 uRot;
uniform mat4 uInvRot;
uniform vec2 uSceneBottomLeft;
uniform vec2 uSceneTopRight;
uniform vec2 uRotBottomLeft;
uniform vec2 uRotTopRight;
uniform float uDepth;
uniform float uRes;

void main() {

    vec4 dScene = texture2D(uSceneDepth, gl_FragCoord.xy/uRes);

    vec3 r = vec3(uSceneBottomLeft + (gl_FragCoord.xy/uRes) * (uSceneTopRight - uSceneBottomLeft), 0.0);

    r.z = -(dScene.r - 0.5) * uDepth;
    r = vec3(uRot * vec4(r, 1));
    float depth = -r.z/uDepth + 0.5;

    vec2 p = (r.xy - uRotBottomLeft)/(uRotTopRight - uRotBottomLeft);

    vec4 dRandRot = texture2D(uRandRotDepth, p);

    float ao = step(dRandRot.r, depth * 0.995);

    vec3 normal = texture2D(uSceneNormal, gl_FragCoord.xy/uRes).rgb * 2.0 - 1.0;
    vec3 dir = vec3(uInvRot * vec4(0, 0, 1, 0));
    float mag = dot(dir, normal);
    float sampled = step(0.0, mag);

    ao *= sampled;

    vec4 acc = texture2D(uAccumulator, gl_FragCoord.xy/uRes);

    acc.r += ao/255.0;
        
    gl_FragColor = acc;

}
