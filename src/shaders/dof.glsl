#version 100
precision highp float;

attribute vec3 aPosition;

void main() {
    gl_Position = vec4(aPosition, 1);
}


// __split__


#version 100
precision highp float;

uniform sampler2D uColor;
uniform sampler2D uDepth;
uniform float uRes;
uniform float uDOFPosition;
uniform float uDOFStrength;
uniform int leftRight;

void main() {
    float invRes = 1.0/uRes;
    vec2 coord = gl_FragCoord.xy * invRes;

    float depth = texture2D(uDepth, coord).r;
    float scale = abs(uDOFPosition - depth);

    int steps = int(128.0 * uDOFStrength * 1.0);

    vec2 dir = vec2(1, 0);
    if (leftRight == 1) {
        dir = vec2(0, 1);
    }

    vec2 p = coord - dir * invRes * float(steps) * 0.5;
    vec4 sample = texture2D(uColor, coord);
    int i = 0;
    float count = 1.0;
    for(int _ = 0; _ < 128; _++) {
        float d = texture2D(uDepth, p).r;
        float s = pow(abs(uDOFPosition - d), 2.0) * step(d, depth);
        sample += texture2D(uColor, p) * s;
        count += s;
        p += dir * invRes;
        i++;
        if (i > steps) {
            break;
        }
    }

    gl_FragColor = sample/count;
}