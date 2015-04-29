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

    vec2 samples[64];
    samples[0] = vec2(0.857612, 0.019885);
    samples[1] = vec2(0.563809, -0.028071);
    samples[2] = vec2(0.825599, -0.346856);
    samples[3] = vec2(0.126584, -0.380959);
    samples[4] = vec2(0.782948, 0.594322);
    samples[5] = vec2(0.292148, -0.543265);
    samples[6] = vec2(0.130700, 0.330220);
    samples[7] = vec2(0.236088, 0.159604);
    samples[8] = vec2(-0.305259, 0.810505);
    samples[9] = vec2(0.269616, 0.923026);
    samples[10] = vec2(0.484486, 0.371845);
    samples[11] = vec2(-0.638057, 0.080447);
    samples[12] = vec2(0.199629, 0.667280);
    samples[13] = vec2(-0.861043, -0.370583);
    samples[14] = vec2(-0.040652, -0.996174);
    samples[15] = vec2(0.330458, -0.282111);
    samples[16] = vec2(0.647795, -0.214354);
    samples[17] = vec2(0.030422, -0.189908);
    samples[18] = vec2(0.177430, -0.721124);
    samples[19] = vec2(-0.461163, -0.327434);
    samples[20] = vec2(-0.410012, -0.734504);
    samples[21] = vec2(-0.616334, -0.626069);
    samples[22] = vec2(0.590759, -0.726479);
    samples[23] = vec2(-0.590794, 0.805365);
    samples[24] = vec2(-0.924561, -0.163739);
    samples[25] = vec2(-0.323028, 0.526960);
    samples[26] = vec2(0.642128, 0.752577);
    samples[27] = vec2(0.173625, -0.952386);
    samples[28] = vec2(0.759014, 0.330311);
    samples[29] = vec2(-0.360526, -0.032013);
    samples[30] = vec2(-0.035320, 0.968156);
    samples[31] = vec2(0.585478, -0.431068);
    samples[32] = vec2(-0.244766, -0.906947);
    samples[33] = vec2(-0.853096, 0.184615);
    samples[34] = vec2(-0.089061, 0.104648);
    samples[35] = vec2(-0.437613, 0.285308);
    samples[36] = vec2(-0.654098, 0.379841);
    samples[37] = vec2(-0.128663, 0.456572);
    samples[38] = vec2(0.015980, -0.568170);
    samples[39] = vec2(-0.043966, -0.771940);
    samples[40] = vec2(0.346512, -0.071238);
    samples[41] = vec2(-0.207921, -0.209121);
    samples[42] = vec2(-0.624075, -0.189224);
    samples[43] = vec2(-0.120618, 0.689339);
    samples[44] = vec2(-0.664679, -0.410200);
    samples[45] = vec2(0.371945, -0.880573);
    samples[46] = vec2(-0.743251, 0.629998);
    samples[47] = vec2(-0.191926, -0.413946);
    samples[48] = vec2(0.449574, 0.833373);
    samples[49] = vec2(0.299587, 0.449113);
    samples[50] = vec2(-0.900432, 0.399319);
    samples[51] = vec2(0.762613, -0.544796);
    samples[52] = vec2(0.606462, 0.174233);
    samples[53] = vec2(0.962185, -0.167019);
    samples[54] = vec2(0.960990, 0.249552);
    samples[55] = vec2(0.570397, 0.559146);
    samples[56] = vec2(-0.537514, 0.555019);
    samples[57] = vec2(0.108491, -0.003232);
    samples[58] = vec2(-0.237693, -0.615428);
    samples[59] = vec2(-0.217313, 0.261084);
    samples[60] = vec2(-0.998966, 0.025692);
    samples[61] = vec2(-0.418554, -0.527508);
    samples[62] = vec2(-0.822629, -0.567797);
    samples[63] = vec2(0.061945, 0.522105);

    float invRes = 1.0/uRes;
    vec2 coord = gl_FragCoord.xy * invRes;

    float strength = uDOFStrength * uRes/768.0;

    float depth = texture2D(uDepth, coord).r;
    float range = uDOFPosition - depth;
    float scale = abs(range);

    vec4 sample = texture2D(uColor, coord);
    float count = 1.0;
    for(int i = 0; i < 64; i++) {
        vec2 p = samples[i];
        p = coord + scale * 64.0 * strength * p * invRes;
        float d = texture2D(uDepth, p).r;
        float r = uDOFPosition - d;
        float s = abs(r);
        sample += texture2D(uColor, p) * s;
        count += s;
    }

    gl_FragColor = sample/count;
}