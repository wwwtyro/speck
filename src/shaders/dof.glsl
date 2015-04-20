#version 100
precision highp float;

attribute vec3 aPosition;

void main() {
    gl_Position = vec4(aPosition, 1);
}


// __split__


#version 100
precision highp float;

uniform sampler2D uTexture;
uniform sampler2D uDepth;
uniform float uRes;
uniform float uDOFPosition;
uniform float uDOFStrength;

void main() {
    float invRes = 1.0/uRes;
    vec2 coord = gl_FragCoord.xy * invRes;

    float depth = texture2D(uDepth, coord).r;
    float scale = abs(uDOFPosition - depth) * uDOFStrength * 256.0;

    vec2 samples[64];
    samples[0] = vec2(-0.235357, -1.588132);
    samples[1] = vec2(0.032515, -1.231496);
    samples[2] = vec2(0.024227, -1.132140);
    samples[3] = vec2(-1.461785, 0.984939);
    samples[4] = vec2(-0.249909, -1.137626);
    samples[5] = vec2(1.014209, 0.638697);
    samples[6] = vec2(0.124567, 2.392972);
    samples[7] = vec2(1.840600, 0.225645);
    samples[8] = vec2(-0.097884, 0.683734);
    samples[9] = vec2(-1.728485, 1.574568);
    samples[10] = vec2(-0.056567, -0.470173);
    samples[11] = vec2(0.284706, -0.001546);
    samples[12] = vec2(-2.219195, 1.688671);
    samples[13] = vec2(-0.047446, 0.595799);
    samples[14] = vec2(-1.098921, -0.598496);
    samples[15] = vec2(0.138993, 0.262436);
    samples[16] = vec2(0.340561, -1.060691);
    samples[17] = vec2(0.697036, 0.579514);
    samples[18] = vec2(0.939659, 0.324136);
    samples[19] = vec2(-0.071267, -0.538781);
    samples[20] = vec2(0.186444, 1.040561);
    samples[21] = vec2(0.290718, -1.281741);
    samples[22] = vec2(-0.693334, -0.331386);
    samples[23] = vec2(0.728461, 1.264020);
    samples[24] = vec2(0.131709, 0.843209);
    samples[25] = vec2(-1.461604, 0.314785);
    samples[26] = vec2(-0.638726, 0.806682);
    samples[27] = vec2(0.887382, -0.719629);
    samples[28] = vec2(-1.380846, -0.393138);
    samples[29] = vec2(0.616917, -0.593151);
    samples[30] = vec2(1.048332, -0.829016);
    samples[31] = vec2(1.178416, 0.204305);
    samples[32] = vec2(-0.015033, -0.113922);
    samples[33] = vec2(0.747141, 1.192196);
    samples[34] = vec2(0.933324, -0.903756);
    samples[35] = vec2(1.989845, 0.278918);
    samples[36] = vec2(2.169654, 0.373756);
    samples[37] = vec2(-0.155409, 0.964275);
    samples[38] = vec2(-1.810682, 1.116107);
    samples[39] = vec2(1.340511, -0.004973);
    samples[40] = vec2(-0.435435, 0.138854);
    samples[41] = vec2(1.135632, -0.022170);
    samples[42] = vec2(-0.053724, 0.275418);
    samples[43] = vec2(0.801748, -0.724595);
    samples[44] = vec2(-0.751016, -0.213260);
    samples[45] = vec2(-0.051067, 0.506691);
    samples[46] = vec2(0.934748, 1.428895);
    samples[47] = vec2(-1.633387, -1.195244);
    samples[48] = vec2(1.305308, -1.036673);
    samples[49] = vec2(-0.401534, -1.186216);
    samples[50] = vec2(-1.058134, 0.367656);
    samples[51] = vec2(-0.024799, -0.795987);
    samples[52] = vec2(-0.397374, -1.845638);
    samples[53] = vec2(0.487839, 0.872820);
    samples[54] = vec2(-1.735779, 2.006692);
    samples[55] = vec2(-0.098321, -0.754747);
    samples[56] = vec2(-0.612245, 0.046972);
    samples[57] = vec2(-0.259972, -0.770346);
    samples[58] = vec2(1.339886, 0.531935);
    samples[59] = vec2(0.530813, -1.047743);
    samples[60] = vec2(0.460716, -0.335207);
    samples[61] = vec2(-1.378303, -0.961039);
    samples[62] = vec2(0.738591, -0.883880);
    samples[63] = vec2(-0.888296, 1.723557);

    vec4 s = vec4(0,0,0,0);

    for (int i = 0; i < 64; i++) {
        s += texture2D(uTexture, coord + scale * samples[i] * invRes);
    }

    s = s / 64.0;    

    s *= texture2D(uTexture, coord).a;

    gl_FragColor = s;
}