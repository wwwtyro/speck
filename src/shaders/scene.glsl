#version 100
precision highp float;

attribute vec3 aImposter;
attribute vec3 aPosition;
attribute float aRadius;
attribute vec3 aColor;

uniform mat4 uView;
uniform mat4 uProjection;
uniform mat4 uModel;
uniform float uAtomScale;

varying vec3 vColor;
varying vec3 vPosition;
varying float vRadius;

void main() {
    gl_Position = uProjection * uView * uModel * vec4(uAtomScale * aRadius * aImposter + aPosition, 1.0);
    vColor = aColor;
    vRadius = aRadius * uAtomScale;
    vPosition = vec3(uModel * vec4(aPosition, 1));
}


// __split__


#version 100
#extension GL_EXT_frag_depth: enable
precision highp float;

uniform vec2 uBottomLeft;
uniform vec2 uTopRight;
uniform vec2 uRes;
uniform float uDepth;

varying vec3 vPosition;
varying float vRadius;
varying vec3 vColor;


float raySphereIntersect(vec3 r0, vec3 rd) {
    float a = dot(rd, rd);
    vec3 s0_r0 = r0 - vPosition;
    float b = 2.0 * dot(rd, s0_r0);
    float c = dot(s0_r0, s0_r0) - (vRadius * vRadius);
    if (b*b - 4.0*a*c <= 0.0) {
        return -1.0;
    }
    return (-b - sqrt((b*b) - 4.0*a*c))/(2.0*a);
}

void main() {
    vec3 r0 = vec3(uBottomLeft + (gl_FragCoord.xy/uRes) * (uTopRight - uBottomLeft), 0.0);
    vec3 rd = vec3(0, 0, -1);
    float t = raySphereIntersect(r0, rd);
    if (t < 0.0) {
        discard;
    }
    vec3 coord = r0 + rd * t;
    vec3 normal = normalize(coord - vPosition);
    float fade = dot(normal, vec3(0, 0, 1)) * 0.5 + 0.5;
    // gl_FragColor = vec4(fade * vColor, 1);
    gl_FragColor = vec4(vColor * 0.75, 1);
    gl_FragDepthEXT = -coord.z/uDepth;
}
