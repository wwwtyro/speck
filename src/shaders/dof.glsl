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
uniform sampler2D uBlur;
uniform sampler2D uDepth;
uniform float uRes;
uniform float uDOFPosition;
uniform float uDOFStrength;

void main() {
    float invRes = 1.0/uRes;
    vec2 coord = gl_FragCoord.xy * invRes;

    float depth = texture2D(uDepth, coord).r;
    float scale = pow(abs(uDOFPosition - depth) * uDOFStrength, 0.5);

    vec4 color = texture2D(uColor, coord);
    vec4 blur = texture2D(uBlur, coord);

    scale = smoothstep(0.0, 1.0, scale);

    gl_FragColor = mix(color, blur, scale);
}