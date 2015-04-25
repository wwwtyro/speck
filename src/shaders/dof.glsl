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
    samples[0] = vec2(-0.218731, 0.250770);
    samples[1] = vec2(-0.193668, -0.315982);
    samples[2] = vec2(-0.450913, -0.409088);
    samples[3] = vec2(0.002280, 0.642314);
    samples[4] = vec2(0.229120, 0.753211);
    samples[5] = vec2(-0.080271, 0.083317);
    samples[6] = vec2(-0.148262, -0.368632);
    samples[7] = vec2(-0.484370, 0.089420);
    samples[8] = vec2(0.688252, -0.409733);
    samples[9] = vec2(-0.076795, -0.589834);
    samples[10] = vec2(-0.257849, -0.537013);
    samples[11] = vec2(-0.685699, -0.237153);
    samples[12] = vec2(-0.316319, 0.707077);
    samples[13] = vec2(-0.159525, -0.756319);
    samples[14] = vec2(0.458429, -0.522718);
    samples[15] = vec2(0.828479, 0.222290);
    samples[16] = vec2(-0.528874, 0.714788);
    samples[17] = vec2(-0.340201, 0.239936);
    samples[18] = vec2(0.588459, -0.357803);
    samples[19] = vec2(0.351311, 0.353834);
    samples[20] = vec2(-0.166645, -0.343488);
    samples[21] = vec2(-0.425629, 0.757485);
    samples[22] = vec2(0.726243, 0.362463);
    samples[23] = vec2(-0.393606, 0.192204);
    samples[24] = vec2(-0.846636, -0.369012);
    samples[25] = vec2(-0.807029, -0.058118);
    samples[26] = vec2(0.472005, 0.452578);
    samples[27] = vec2(-0.320782, -0.882144);
    samples[28] = vec2(-0.451004, 0.116673);
    samples[29] = vec2(-0.092174, -0.204572);
    samples[30] = vec2(-0.224660, -0.499867);
    samples[31] = vec2(0.019669, -0.768027);
    samples[32] = vec2(0.109579, -0.093469);
    samples[33] = vec2(0.442851, -0.294368);
    samples[34] = vec2(-0.067804, 0.411827);
    samples[35] = vec2(0.137842, -0.440523);
    samples[36] = vec2(-0.471088, 0.001021);
    samples[37] = vec2(-0.166320, -0.113473);
    samples[38] = vec2(0.411575, 0.639872);
    samples[39] = vec2(0.373205, 0.303012);
    samples[40] = vec2(0.396774, -0.362823);
    samples[41] = vec2(-0.136575, 0.759543);
    samples[42] = vec2(0.045926, -0.083039);
    samples[43] = vec2(0.407941, -0.665393);
    samples[44] = vec2(-0.356924, 0.186836);
    samples[45] = vec2(-0.673843, 0.517691);
    samples[46] = vec2(0.170956, 0.946856);
    samples[47] = vec2(-0.802454, -0.284238);
    samples[48] = vec2(-0.399199, 0.345247);
    samples[49] = vec2(-0.686396, 0.021066);
    samples[50] = vec2(0.227659, -0.665666);
    samples[51] = vec2(-0.098781, 0.051615);
    samples[52] = vec2(-0.894108, -0.376060);
    samples[53] = vec2(-0.621799, 0.609207);
    samples[54] = vec2(-0.435770, -0.125782);
    samples[55] = vec2(0.148547, 0.890021);
    samples[56] = vec2(0.285718, -0.615716);
    samples[57] = vec2(-0.594853, -0.504440);
    samples[58] = vec2(-0.325079, -0.726732);
    samples[59] = vec2(0.818094, 0.254535);
    samples[60] = vec2(-0.313429, 0.025407);
    samples[61] = vec2(-0.096854, -0.074162);
    samples[62] = vec2(0.675590, -0.630287);
    samples[63] = vec2(-0.614608, -0.654763);

    float invRes = 1.0/uRes;
    vec2 coord = gl_FragCoord.xy * invRes;

    float depth = texture2D(uDepth, coord).r;
    float scale = abs(uDOFPosition - depth);

    vec4 sample = texture2D(uColor, coord);
    float count = 1.0;
    for(int i = 0; i < 64; i++) {
        vec2 p = samples[i];
        p = coord + scale * 64.0 * uDOFStrength * p * invRes;
        float d = texture2D(uDepth, p).r;
        float s = abs(uDOFPosition - d);
        sample += texture2D(uColor, p) * s;
        count += s;
    }

    gl_FragColor = sample/count;
}