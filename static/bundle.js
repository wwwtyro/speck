(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/rye/Dropbox/src/speck/node_modules/gl-matrix/dist/gl-matrix.js":[function(require,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.1.0
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function() {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = window;
    }    
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

var mat2Identity = new Float32Array([
    1, 0,
    0, 1
]);

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a1 * b2;
    out[1] = a0 * b1 + a1 * b3;
    out[2] = a2 * b0 + a3 * b2;
    out[3] = a2 * b1 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a1 * s;
    out[1] = a0 * -s + a1 * c;
    out[2] = a2 *  c + a3 * s;
    out[3] = a2 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v1;
    out[2] = a2 * v0;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx,ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0
 *  c, d, 0
 *  tx,ty,1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

var mat2dIdentity = new Float32Array([
    1, 0,
    0, 1,
    0, 0
]);

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5],
        ba = b[0], bb = b[1], bc = b[2], bd = b[3],
        btx = b[4], bty = b[5];

    out[0] = aa*ba + ab*bc;
    out[1] = aa*bb + ab*bd;
    out[2] = ac*ba + ad*bc;
    out[3] = ac*bb + ad*bd;
    out[4] = ba*atx + bc*aty + btx;
    out[5] = bb*atx + bd*aty + bty;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var aa = a[0],
        ab = a[1],
        ac = a[2],
        ad = a[3],
        atx = a[4],
        aty = a[5],
        st = Math.sin(rad),
        ct = Math.cos(rad);

    out[0] = aa*ct + ab*st;
    out[1] = -aa*st + ab*ct;
    out[2] = ac*ct + ad*st;
    out[3] = -ac*st + ct*ad;
    out[4] = ct*atx + st*aty;
    out[5] = ct*aty - st*atx;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {mat2d} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var vx = v[0], vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {mat2d} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

var mat3Identity = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]);

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[2];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;

    out[3] = xy - wz;
    out[4] = 1 - (xx + zz);
    out[5] = yz + wx;

    out[6] = xz + wy;
    out[7] = yz - wx;
    out[8] = 1 - (xx + yy);

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

var mat4Identity = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/**
* Calculates a 4x4 matrix from the given quaternion
*
* @param {mat4} out mat4 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat4} out
*/
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;

    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;

    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

var quatIdentity = new Float32Array([0, 0, 0, 1]);

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle around the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle around the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle around the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var cosHalfTheta = ax * bx + ay * by + az * bz + aw * bw,
        halfTheta,
        sinHalfTheta,
        ratioA,
        ratioB;

    if (Math.abs(cosHalfTheta) >= 1.0) {
        if (out !== a) {
            out[0] = ax;
            out[1] = ay;
            out[2] = az;
            out[3] = aw;
        }
        return out;
    }

    halfTheta = Math.acos(cosHalfTheta);
    sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
        out[0] = (ax * 0.5 + bx * 0.5);
        out[1] = (ay * 0.5 + by * 0.5);
        out[2] = (az * 0.5 + bz * 0.5);
        out[3] = (aw * 0.5 + bw * 0.5);
        return out;
    }

    ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    out[0] = (ax * ratioA + bx * ratioB);
    out[1] = (ay * ratioA + by * ratioB);
    out[2] = (az * ratioA + bz * ratioB);
    out[3] = (aw * ratioA + bw * ratioB);

    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = (function() {
    var s_iNext = [1,2,0];
    return function(out, m) {
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        var fTrace = m[0] + m[4] + m[8];
        var fRoot;

        if ( fTrace > 0.0 ) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.0);  // 2w
            out[3] = 0.5 * fRoot;
            fRoot = 0.5/fRoot;  // 1/(4w)
            out[0] = (m[7]-m[5])*fRoot;
            out[1] = (m[2]-m[6])*fRoot;
            out[2] = (m[3]-m[1])*fRoot;
        } else {
            // |w| <= 1/2
            var i = 0;
            if ( m[4] > m[0] )
              i = 1;
            if ( m[8] > m[i*3+i] )
              i = 2;
            var j = s_iNext[i];
            var k = s_iNext[j];
            
            fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
            out[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
            out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
            out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
        }
        
        return out;
    };
})();

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})();

},{}],"/home/rye/Dropbox/src/speck/node_modules/webgl.js/src/core.js":[function(require,module,exports){



module.exports.Buffer = function(gl) {

    var self = this;

    self.initialize = function() {
        self.buffer = gl.createBuffer();
    }

    self.bind = function() {
        gl.bindBuffer(gl.ARRAY_BUFFER, self.buffer);
    }

    self.set = function(data) {
        self.bind();
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    self.initialize();
};



module.exports.Renderable = function(gl, program, buffers, primitiveCount) {

    var self = this;

    self.primitiveCount = primitiveCount;

    self.initialize = function() {
    }

    self.render = function() {
        program.use();
        for (name in buffers) {
            var buffer = buffers[name].buffer;
            var size = buffers[name].size;
            try {
                var location = program.attribs[name].location;
            } catch (e) {
                console.log("Could not find location for", name);
                throw e;
            }
            buffer.bind();
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3 * primitiveCount);
        for (name in self.buffers) {
            gl.disableVertexAttribArray(program.attributes[name].location);
        }
    }

    self.initialize();
};



module.exports.Program = function(gl, vertexSource, fragmentSource) {

    var self = this;

    self.initialize = function() {
        self.program = self.compileProgram(vertexSource, fragmentSource);
        self.attribs = self.gatherAttribs();
        self.uniforms = self.gatherUniforms();
    }

    self.use = function() {
        gl.useProgram(self.program);
    }

    self.compileProgram = function(vertexSource, fragmentSource) {
        var vertexShader = self.compileShader(vertexSource, gl.VERTEX_SHADER);
        var fragmentShader = self.compileShader(fragmentSource, gl.FRAGMENT_SHADER);
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log(gl.getProgramInfoLog(program));
            throw "Failed to compile program.";
        }
        return program;
    }

    self.compileShader = function(source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var err = gl.getShaderInfoLog(shader);
            var lineno = parseInt(err.split(':')[2]);
            var split = source.split("\n");
            for (var i in split) {
                var q = parseInt(i) + 1;
                console.log(q + "  " + split[i]);
                if (i == lineno) {
                    console.warn(err);
                }
            }
            typeString = type == gl.VERTEX_SHADER ? "vertex" : "fragment";
            throw "Failed to compile " + typeString + " shader.";
        }
        return shader;
    }

    self.setUniform = function(name, type, value) {
        var args = Array.prototype.slice.call(arguments, 2);
        self.use(); // Make this idempotent. At the context level, perhaps?
        try {
            var location = self.uniforms[name].location;
        }
        catch(e) {
            console.log(name);
            throw e;
        }
        gl['uniform' + type].apply(gl, [location].concat(args));
    }

    self.gatherUniforms = function() {
        var uniforms = {};
        var nUniforms = gl.getProgramParameter(self.program, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < nUniforms; i++) {
            var uniform = gl.getActiveUniform(self.program, i);
            uniforms[uniform.name] = {
                name: uniform.name,
                location: gl.getUniformLocation(self.program, uniform.name),
                type: uniform.type,
                size: uniform.size
            };
        }
        return uniforms;
    }

    self.gatherAttribs = function() {
        var attribs = {};
        var nAttribs = gl.getProgramParameter(self.program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < nAttribs; i++) {
            var attrib = gl.getActiveAttrib(self.program, i);
            attribs[attrib.name] = {
                name: attrib.name,
                location: gl.getAttribLocation(self.program, attrib.name),
                type: attrib.type,
                size: attrib.size
            };
        }
        return attribs;
    }   

    self.initialize();
};


},{}],"/home/rye/Dropbox/src/speck/node_modules/webgl.js/src/index.js":[function(require,module,exports){
module.exports = require('./core.js');

},{"./core.js":"/home/rye/Dropbox/src/speck/node_modules/webgl.js/src/core.js"}],"/home/rye/Dropbox/src/speck/src/elements.js":[function(require,module,exports){
module.exports = {};
module.exports[  0] = module.exports[ 'Xx'] = {'symbol':  'Xx', 'name':       'unknown', 'mass':   1.00000000, 'radius':  1.0000, 'color': [1.000, 0.078, 0.576], 'number': 0};
module.exports[  1] = module.exports[  'H'] = {'symbol':   'H', 'name':      'hydrogen', 'mass':   1.00794000, 'radius':  0.3100, 'color': [1.000, 1.000, 1.000], 'number': 1};
module.exports[  2] = module.exports[ 'He'] = {'symbol':  'He', 'name':        'helium', 'mass':   4.00260200, 'radius':  0.2800, 'color': [0.851, 1.000, 1.000], 'number': 2};
module.exports[  3] = module.exports[ 'Li'] = {'symbol':  'Li', 'name':       'lithium', 'mass':   6.94100000, 'radius':  1.2800, 'color': [0.800, 0.502, 1.000], 'number': 3};
module.exports[  4] = module.exports[ 'Be'] = {'symbol':  'Be', 'name':     'beryllium', 'mass':   9.01218200, 'radius':  0.9600, 'color': [0.761, 1.000, 0.000], 'number': 4};
module.exports[  5] = module.exports[  'B'] = {'symbol':   'B', 'name':         'boron', 'mass':  10.81100000, 'radius':  0.8400, 'color': [1.000, 0.710, 0.710], 'number': 5};
module.exports[  6] = module.exports[  'C'] = {'symbol':   'C', 'name':        'carbon', 'mass':  12.01070000, 'radius':  0.7300, 'color': [0.565, 0.565, 0.565], 'number': 6};
module.exports[  7] = module.exports[  'N'] = {'symbol':   'N', 'name':      'nitrogen', 'mass':  14.00670000, 'radius':  0.7100, 'color': [0.188, 0.314, 0.973], 'number': 7};
module.exports[  8] = module.exports[  'O'] = {'symbol':   'O', 'name':        'oxygen', 'mass':  15.99940000, 'radius':  0.6600, 'color': [1.000, 0.051, 0.051], 'number': 8};
module.exports[  9] = module.exports[  'F'] = {'symbol':   'F', 'name':      'fluorine', 'mass':  18.99840320, 'radius':  0.5700, 'color': [0.565, 0.878, 0.314], 'number': 9};
module.exports[ 10] = module.exports[ 'Ne'] = {'symbol':  'Ne', 'name':          'neon', 'mass':  20.17970000, 'radius':  0.5800, 'color': [0.702, 0.890, 0.961], 'number': 10};
module.exports[ 11] = module.exports[ 'Na'] = {'symbol':  'Na', 'name':        'sodium', 'mass':  22.98976928, 'radius':  1.6600, 'color': [0.671, 0.361, 0.949], 'number': 11};
module.exports[ 12] = module.exports[ 'Mg'] = {'symbol':  'Mg', 'name':     'magnesium', 'mass':  24.30500000, 'radius':  1.4100, 'color': [0.541, 1.000, 0.000], 'number': 12};
module.exports[ 13] = module.exports[ 'Al'] = {'symbol':  'Al', 'name':      'aluminum', 'mass':  26.98153860, 'radius':  1.2100, 'color': [0.749, 0.651, 0.651], 'number': 13};
module.exports[ 14] = module.exports[ 'Si'] = {'symbol':  'Si', 'name':       'silicon', 'mass':  28.08550000, 'radius':  1.1100, 'color': [0.941, 0.784, 0.627], 'number': 14};
module.exports[ 15] = module.exports[  'P'] = {'symbol':   'P', 'name':    'phosphorus', 'mass':  30.97376200, 'radius':  1.0700, 'color': [1.000, 0.502, 0.000], 'number': 15};
module.exports[ 16] = module.exports[  'S'] = {'symbol':   'S', 'name':        'sulfur', 'mass':  32.06500000, 'radius':  1.0500, 'color': [1.000, 1.000, 0.188], 'number': 16};
module.exports[ 17] = module.exports[ 'Cl'] = {'symbol':  'Cl', 'name':      'chlorine', 'mass':  35.45300000, 'radius':  1.0200, 'color': [0.122, 0.941, 0.122], 'number': 17};
module.exports[ 18] = module.exports[ 'Ar'] = {'symbol':  'Ar', 'name':         'argon', 'mass':  39.94800000, 'radius':  1.0600, 'color': [0.502, 0.820, 0.890], 'number': 18};
module.exports[ 19] = module.exports[  'K'] = {'symbol':   'K', 'name':     'potassium', 'mass':  39.09830000, 'radius':  2.0300, 'color': [0.561, 0.251, 0.831], 'number': 19};
module.exports[ 20] = module.exports[ 'Ca'] = {'symbol':  'Ca', 'name':       'calcium', 'mass':  40.07800000, 'radius':  1.7600, 'color': [0.239, 1.000, 0.000], 'number': 20};
module.exports[ 21] = module.exports[ 'Sc'] = {'symbol':  'Sc', 'name':      'scandium', 'mass':  44.95591200, 'radius':  1.7000, 'color': [0.902, 0.902, 0.902], 'number': 21};
module.exports[ 22] = module.exports[ 'Ti'] = {'symbol':  'Ti', 'name':      'titanium', 'mass':  47.86700000, 'radius':  1.6000, 'color': [0.749, 0.761, 0.780], 'number': 22};
module.exports[ 23] = module.exports[  'V'] = {'symbol':   'V', 'name':      'vanadium', 'mass':  50.94150000, 'radius':  1.5300, 'color': [0.651, 0.651, 0.671], 'number': 23};
module.exports[ 24] = module.exports[ 'Cr'] = {'symbol':  'Cr', 'name':      'chromium', 'mass':  51.99610000, 'radius':  1.3900, 'color': [0.541, 0.600, 0.780], 'number': 24};
module.exports[ 25] = module.exports[ 'Mn'] = {'symbol':  'Mn', 'name':     'manganese', 'mass':  54.93804500, 'radius':  1.3900, 'color': [0.611, 0.478, 0.780], 'number': 25};
module.exports[ 26] = module.exports[ 'Fe'] = {'symbol':  'Fe', 'name':          'iron', 'mass':  55.84500000, 'radius':  1.3200, 'color': [0.878, 0.400, 0.200], 'number': 26};
module.exports[ 27] = module.exports[ 'Co'] = {'symbol':  'Co', 'name':        'cobalt', 'mass':  58.69340000, 'radius':  1.2600, 'color': [0.941, 0.565, 0.627], 'number': 27};
module.exports[ 28] = module.exports[ 'Ni'] = {'symbol':  'Ni', 'name':        'nickel', 'mass':  58.93319500, 'radius':  1.2400, 'color': [0.314, 0.816, 0.314], 'number': 28};
module.exports[ 29] = module.exports[ 'Cu'] = {'symbol':  'Cu', 'name':        'copper', 'mass':  63.54600000, 'radius':  1.3200, 'color': [0.784, 0.502, 0.200], 'number': 29};
module.exports[ 30] = module.exports[ 'Zn'] = {'symbol':  'Zn', 'name':          'zinc', 'mass':  65.38000000, 'radius':  1.2200, 'color': [0.490, 0.502, 0.690], 'number': 30};
module.exports[ 31] = module.exports[ 'Ga'] = {'symbol':  'Ga', 'name':       'gallium', 'mass':  69.72300000, 'radius':  1.2200, 'color': [0.761, 0.561, 0.561], 'number': 31};
module.exports[ 32] = module.exports[ 'Ge'] = {'symbol':  'Ge', 'name':     'germanium', 'mass':  72.64000000, 'radius':  1.2000, 'color': [0.400, 0.561, 0.561], 'number': 32};
module.exports[ 33] = module.exports[ 'As'] = {'symbol':  'As', 'name':       'arsenic', 'mass':  74.92160000, 'radius':  1.1900, 'color': [0.741, 0.502, 0.890], 'number': 33};
module.exports[ 34] = module.exports[ 'Se'] = {'symbol':  'Se', 'name':      'selenium', 'mass':  78.96000000, 'radius':  1.2000, 'color': [1.000, 0.631, 0.000], 'number': 34};
module.exports[ 35] = module.exports[ 'Br'] = {'symbol':  'Br', 'name':       'bromine', 'mass':  79.90400000, 'radius':  1.2000, 'color': [0.651, 0.161, 0.161], 'number': 35};
module.exports[ 36] = module.exports[ 'Kr'] = {'symbol':  'Kr', 'name':       'krypton', 'mass':  83.79800000, 'radius':  1.1600, 'color': [0.361, 0.722, 0.820], 'number': 36};
module.exports[ 37] = module.exports[ 'Rb'] = {'symbol':  'Rb', 'name':      'rubidium', 'mass':  85.46780000, 'radius':  2.2000, 'color': [0.439, 0.180, 0.690], 'number': 37};
module.exports[ 38] = module.exports[ 'Sr'] = {'symbol':  'Sr', 'name':     'strontium', 'mass':  87.62000000, 'radius':  1.9500, 'color': [0.000, 1.000, 0.000], 'number': 38};
module.exports[ 39] = module.exports[  'Y'] = {'symbol':   'Y', 'name':       'yttrium', 'mass':  88.90585000, 'radius':  1.9000, 'color': [0.580, 1.000, 1.000], 'number': 39};
module.exports[ 40] = module.exports[ 'Zr'] = {'symbol':  'Zr', 'name':     'zirconium', 'mass':  91.22400000, 'radius':  1.7500, 'color': [0.580, 0.878, 0.878], 'number': 40};
module.exports[ 41] = module.exports[ 'Nb'] = {'symbol':  'Nb', 'name':       'niobium', 'mass':  92.90638000, 'radius':  1.6400, 'color': [0.451, 0.761, 0.788], 'number': 41};
module.exports[ 42] = module.exports[ 'Mo'] = {'symbol':  'Mo', 'name':    'molybdenum', 'mass':  95.96000000, 'radius':  1.5400, 'color': [0.329, 0.710, 0.710], 'number': 42};
module.exports[ 43] = module.exports[ 'Tc'] = {'symbol':  'Tc', 'name':    'technetium', 'mass':  98.00000000, 'radius':  1.4700, 'color': [0.231, 0.620, 0.620], 'number': 43};
module.exports[ 44] = module.exports[ 'Ru'] = {'symbol':  'Ru', 'name':     'ruthenium', 'mass': 101.07000000, 'radius':  1.4600, 'color': [0.141, 0.561, 0.561], 'number': 44};
module.exports[ 45] = module.exports[ 'Rh'] = {'symbol':  'Rh', 'name':       'rhodium', 'mass': 102.90550000, 'radius':  1.4200, 'color': [0.039, 0.490, 0.549], 'number': 45};
module.exports[ 46] = module.exports[ 'Pd'] = {'symbol':  'Pd', 'name':     'palladium', 'mass': 106.42000000, 'radius':  1.3900, 'color': [0.000, 0.412, 0.522], 'number': 46};
module.exports[ 47] = module.exports[ 'Ag'] = {'symbol':  'Ag', 'name':        'silver', 'mass': 107.86820000, 'radius':  1.4500, 'color': [0.753, 0.753, 0.753], 'number': 47};
module.exports[ 48] = module.exports[ 'Cd'] = {'symbol':  'Cd', 'name':       'cadmium', 'mass': 112.41100000, 'radius':  1.4400, 'color': [1.000, 0.851, 0.561], 'number': 48};
module.exports[ 49] = module.exports[ 'In'] = {'symbol':  'In', 'name':        'indium', 'mass': 114.81800000, 'radius':  1.4200, 'color': [0.651, 0.459, 0.451], 'number': 49};
module.exports[ 50] = module.exports[ 'Sn'] = {'symbol':  'Sn', 'name':           'tin', 'mass': 118.71000000, 'radius':  1.3900, 'color': [0.400, 0.502, 0.502], 'number': 50};
module.exports[ 51] = module.exports[ 'Sb'] = {'symbol':  'Sb', 'name':      'antimony', 'mass': 121.76000000, 'radius':  1.3900, 'color': [0.620, 0.388, 0.710], 'number': 51};
module.exports[ 52] = module.exports[ 'Te'] = {'symbol':  'Te', 'name':     'tellurium', 'mass': 127.60000000, 'radius':  1.3800, 'color': [0.831, 0.478, 0.000], 'number': 52};
module.exports[ 53] = module.exports[  'I'] = {'symbol':   'I', 'name':        'iodine', 'mass': 126.90470000, 'radius':  1.3900, 'color': [0.580, 0.000, 0.580], 'number': 53};
module.exports[ 54] = module.exports[ 'Xe'] = {'symbol':  'Xe', 'name':         'xenon', 'mass': 131.29300000, 'radius':  1.4000, 'color': [0.259, 0.620, 0.690], 'number': 54};
module.exports[ 55] = module.exports[ 'Cs'] = {'symbol':  'Cs', 'name':        'cesium', 'mass': 132.90545190, 'radius':  2.4400, 'color': [0.341, 0.090, 0.561], 'number': 55};
module.exports[ 56] = module.exports[ 'Ba'] = {'symbol':  'Ba', 'name':        'barium', 'mass': 137.32700000, 'radius':  2.1500, 'color': [0.000, 0.788, 0.000], 'number': 56};
module.exports[ 57] = module.exports[ 'La'] = {'symbol':  'La', 'name':     'lanthanum', 'mass': 138.90547000, 'radius':  2.0700, 'color': [0.439, 0.831, 1.000], 'number': 57};
module.exports[ 58] = module.exports[ 'Ce'] = {'symbol':  'Ce', 'name':        'cerium', 'mass': 140.11600000, 'radius':  2.0400, 'color': [1.000, 1.000, 0.780], 'number': 58};
module.exports[ 59] = module.exports[ 'Pr'] = {'symbol':  'Pr', 'name':  'praseodymium', 'mass': 140.90765000, 'radius':  2.0300, 'color': [0.851, 1.000, 0.780], 'number': 59};
module.exports[ 60] = module.exports[ 'Nd'] = {'symbol':  'Nd', 'name':     'neodymium', 'mass': 144.24200000, 'radius':  2.0100, 'color': [0.780, 1.000, 0.780], 'number': 60};
module.exports[ 61] = module.exports[ 'Pm'] = {'symbol':  'Pm', 'name':    'promethium', 'mass': 145.00000000, 'radius':  1.9900, 'color': [0.639, 1.000, 0.780], 'number': 61};
module.exports[ 62] = module.exports[ 'Sm'] = {'symbol':  'Sm', 'name':      'samarium', 'mass': 150.36000000, 'radius':  1.9800, 'color': [0.561, 1.000, 0.780], 'number': 62};
module.exports[ 63] = module.exports[ 'Eu'] = {'symbol':  'Eu', 'name':      'europium', 'mass': 151.96400000, 'radius':  1.9800, 'color': [0.380, 1.000, 0.780], 'number': 63};
module.exports[ 64] = module.exports[ 'Gd'] = {'symbol':  'Gd', 'name':    'gadolinium', 'mass': 157.25000000, 'radius':  1.9600, 'color': [0.271, 1.000, 0.780], 'number': 64};
module.exports[ 65] = module.exports[ 'Tb'] = {'symbol':  'Tb', 'name':       'terbium', 'mass': 158.92535000, 'radius':  1.9400, 'color': [0.189, 1.000, 0.780], 'number': 65};
module.exports[ 66] = module.exports[ 'Dy'] = {'symbol':  'Dy', 'name':    'dysprosium', 'mass': 162.50000000, 'radius':  1.9200, 'color': [0.122, 1.000, 0.780], 'number': 66};
module.exports[ 67] = module.exports[ 'Ho'] = {'symbol':  'Ho', 'name':       'holmium', 'mass': 164.93032000, 'radius':  1.9200, 'color': [0.000, 1.000, 0.612], 'number': 67};
module.exports[ 68] = module.exports[ 'Er'] = {'symbol':  'Er', 'name':        'erbium', 'mass': 167.25900000, 'radius':  1.8900, 'color': [0.000, 0.902, 0.459], 'number': 68};
module.exports[ 69] = module.exports[ 'Tm'] = {'symbol':  'Tm', 'name':       'thulium', 'mass': 168.93421000, 'radius':  1.9000, 'color': [0.000, 0.831, 0.322], 'number': 69};
module.exports[ 70] = module.exports[ 'Yb'] = {'symbol':  'Yb', 'name':     'ytterbium', 'mass': 173.05400000, 'radius':  1.8700, 'color': [0.000, 0.749, 0.220], 'number': 70};
module.exports[ 71] = module.exports[ 'Lu'] = {'symbol':  'Lu', 'name':      'lutetium', 'mass': 174.96680000, 'radius':  1.8700, 'color': [0.000, 0.671, 0.141], 'number': 71};
module.exports[ 72] = module.exports[ 'Hf'] = {'symbol':  'Hf', 'name':       'hafnium', 'mass': 178.49000000, 'radius':  1.7500, 'color': [0.302, 0.761, 1.000], 'number': 72};
module.exports[ 73] = module.exports[ 'Ta'] = {'symbol':  'Ta', 'name':      'tantalum', 'mass': 180.94788000, 'radius':  1.7000, 'color': [0.302, 0.651, 1.000], 'number': 73};
module.exports[ 74] = module.exports[  'W'] = {'symbol':   'W', 'name':      'tungsten', 'mass': 183.84000000, 'radius':  1.6200, 'color': [0.129, 0.580, 0.839], 'number': 74};
module.exports[ 75] = module.exports[ 'Re'] = {'symbol':  'Re', 'name':       'rhenium', 'mass': 186.20700000, 'radius':  1.5100, 'color': [0.149, 0.490, 0.671], 'number': 75};
module.exports[ 76] = module.exports[ 'Os'] = {'symbol':  'Os', 'name':        'osmium', 'mass': 190.23000000, 'radius':  1.4400, 'color': [0.149, 0.400, 0.588], 'number': 76};
module.exports[ 77] = module.exports[ 'Ir'] = {'symbol':  'Ir', 'name':       'iridium', 'mass': 192.21700000, 'radius':  1.4100, 'color': [0.090, 0.329, 0.529], 'number': 77};
module.exports[ 78] = module.exports[ 'Pt'] = {'symbol':  'Pt', 'name':      'platinum', 'mass': 195.08400000, 'radius':  1.3600, 'color': [0.816, 0.816, 0.878], 'number': 78};
module.exports[ 79] = module.exports[ 'Au'] = {'symbol':  'Au', 'name':          'gold', 'mass': 196.96656900, 'radius':  1.3600, 'color': [1.000, 0.820, 0.137], 'number': 79};
module.exports[ 80] = module.exports[ 'Hg'] = {'symbol':  'Hg', 'name':       'mercury', 'mass': 200.59000000, 'radius':  1.3200, 'color': [0.722, 0.722, 0.816], 'number': 80};
module.exports[ 81] = module.exports[ 'Tl'] = {'symbol':  'Tl', 'name':      'thallium', 'mass': 204.38330000, 'radius':  1.4500, 'color': [0.651, 0.329, 0.302], 'number': 81};
module.exports[ 82] = module.exports[ 'Pb'] = {'symbol':  'Pb', 'name':          'lead', 'mass': 207.20000000, 'radius':  1.4600, 'color': [0.341, 0.349, 0.380], 'number': 82};
module.exports[ 83] = module.exports[ 'Bi'] = {'symbol':  'Bi', 'name':       'bismuth', 'mass': 208.98040000, 'radius':  1.4800, 'color': [0.620, 0.310, 0.710], 'number': 83};
module.exports[ 84] = module.exports[ 'Po'] = {'symbol':  'Po', 'name':      'polonium', 'mass': 210.00000000, 'radius':  1.4000, 'color': [0.671, 0.361, 0.000], 'number': 84};
module.exports[ 85] = module.exports[ 'At'] = {'symbol':  'At', 'name':      'astatine', 'mass': 210.00000000, 'radius':  1.5000, 'color': [0.459, 0.310, 0.271], 'number': 85};
module.exports[ 86] = module.exports[ 'Rn'] = {'symbol':  'Rn', 'name':         'radon', 'mass': 220.00000000, 'radius':  1.5000, 'color': [0.259, 0.510, 0.588], 'number': 86};
module.exports[ 87] = module.exports[ 'Fr'] = {'symbol':  'Fr', 'name':      'francium', 'mass': 223.00000000, 'radius':  2.6000, 'color': [0.259, 0.000, 0.400], 'number': 87};
module.exports[ 88] = module.exports[ 'Ra'] = {'symbol':  'Ra', 'name':        'radium', 'mass': 226.00000000, 'radius':  2.2100, 'color': [0.000, 0.490, 0.000], 'number': 88};
module.exports[ 89] = module.exports[ 'Ac'] = {'symbol':  'Ac', 'name':      'actinium', 'mass': 227.00000000, 'radius':  2.1500, 'color': [0.439, 0.671, 0.980], 'number': 89};
module.exports[ 90] = module.exports[ 'Th'] = {'symbol':  'Th', 'name':       'thorium', 'mass': 231.03588000, 'radius':  2.0600, 'color': [0.000, 0.729, 1.000], 'number': 90};
module.exports[ 91] = module.exports[ 'Pa'] = {'symbol':  'Pa', 'name':  'protactinium', 'mass': 232.03806000, 'radius':  2.0000, 'color': [0.000, 0.631, 1.000], 'number': 91};
module.exports[ 92] = module.exports[  'U'] = {'symbol':   'U', 'name':       'uranium', 'mass': 237.00000000, 'radius':  1.9600, 'color': [0.000, 0.561, 1.000], 'number': 92};
module.exports[ 93] = module.exports[ 'Np'] = {'symbol':  'Np', 'name':     'neptunium', 'mass': 238.02891000, 'radius':  1.9000, 'color': [0.000, 0.502, 1.000], 'number': 93};
module.exports[ 94] = module.exports[ 'Pu'] = {'symbol':  'Pu', 'name':     'plutonium', 'mass': 243.00000000, 'radius':  1.8700, 'color': [0.000, 0.420, 1.000], 'number': 94};
module.exports[ 95] = module.exports[ 'Am'] = {'symbol':  'Am', 'name':     'americium', 'mass': 244.00000000, 'radius':  1.8000, 'color': [0.329, 0.361, 0.949], 'number': 95};
module.exports[ 96] = module.exports[ 'Cm'] = {'symbol':  'Cm', 'name':        'curium', 'mass': 247.00000000, 'radius':  1.6900, 'color': [0.471, 0.361, 0.890], 'number': 96};
module.exports[ 97] = module.exports[ 'Bk'] = {'symbol':  'Bk', 'name':     'berkelium', 'mass': 247.00000000, 'radius':  1.6600, 'color': [0.541, 0.310, 0.890], 'number': 97};
module.exports[ 98] = module.exports[ 'Cf'] = {'symbol':  'Cf', 'name':   'californium', 'mass': 251.00000000, 'radius':  1.6800, 'color': [0.631, 0.212, 0.831], 'number': 98};
module.exports[ 99] = module.exports[ 'Es'] = {'symbol':  'Es', 'name':   'einsteinium', 'mass': 252.00000000, 'radius':  1.6500, 'color': [0.702, 0.122, 0.831], 'number': 99};
module.exports[100] = module.exports[ 'Fm'] = {'symbol':  'Fm', 'name':       'fermium', 'mass': 257.00000000, 'radius':  1.6700, 'color': [0.702, 0.122, 0.729], 'number': 100};
module.exports[101] = module.exports[ 'Md'] = {'symbol':  'Md', 'name':   'mendelevium', 'mass': 258.00000000, 'radius':  1.7300, 'color': [0.702, 0.051, 0.651], 'number': 101};
module.exports[102] = module.exports[ 'No'] = {'symbol':  'No', 'name':      'nobelium', 'mass': 259.00000000, 'radius':  1.7600, 'color': [0.741, 0.051, 0.529], 'number': 102};
module.exports[103] = module.exports[ 'Lr'] = {'symbol':  'Lr', 'name':    'lawrencium', 'mass': 262.00000000, 'radius':  1.6100, 'color': [0.780, 0.000, 0.400], 'number': 103};
module.exports[104] = module.exports[ 'Rf'] = {'symbol':  'Rf', 'name': 'rutherfordium', 'mass': 261.00000000, 'radius':  1.5700, 'color': [0.800, 0.000, 0.349], 'number': 104};
module.exports[105] = module.exports[ 'Db'] = {'symbol':  'Db', 'name':       'dubnium', 'mass': 262.00000000, 'radius':  1.4900, 'color': [0.820, 0.000, 0.310], 'number': 105};
module.exports[106] = module.exports[ 'Sg'] = {'symbol':  'Sg', 'name':    'seaborgium', 'mass': 266.00000000, 'radius':  1.4300, 'color': [0.851, 0.000, 0.271], 'number': 106};
module.exports[107] = module.exports[ 'Bh'] = {'symbol':  'Bh', 'name':       'bohrium', 'mass': 264.00000000, 'radius':  1.4100, 'color': [0.878, 0.000, 0.220], 'number': 107};
module.exports[108] = module.exports[ 'Hs'] = {'symbol':  'Hs', 'name':       'hassium', 'mass': 277.00000000, 'radius':  1.3400, 'color': [0.902, 0.000, 0.180], 'number': 108};
module.exports[109] = module.exports[ 'Mt'] = {'symbol':  'Mt', 'name':    'meitnerium', 'mass': 268.00000000, 'radius':  1.2900, 'color': [0.922, 0.000, 0.149], 'number': 109};
module.exports[110] = module.exports[ 'Ds'] = {'symbol':  'Ds', 'name':            'Ds', 'mass': 271.00000000, 'radius':  1.2800, 'color': [0.922, 0.000, 0.149], 'number': 110};
module.exports[111] = module.exports['Uuu'] = {'symbol': 'Uuu', 'name':           'Uuu', 'mass': 272.00000000, 'radius':  1.2100, 'color': [0.922, 0.000, 0.149], 'number': 111};
module.exports[112] = module.exports['Uub'] = {'symbol': 'Uub', 'name':           'Uub', 'mass': 285.00000000, 'radius':  1.2200, 'color': [0.922, 0.000, 0.149], 'number': 112};
module.exports[113] = module.exports['Uut'] = {'symbol': 'Uut', 'name':           'Uut', 'mass': 284.00000000, 'radius':  1.3600, 'color': [0.922, 0.000, 0.149], 'number': 113};
module.exports[114] = module.exports['Uuq'] = {'symbol': 'Uuq', 'name':           'Uuq', 'mass': 289.00000000, 'radius':  1.4300, 'color': [0.922, 0.000, 0.149], 'number': 114};
module.exports[115] = module.exports['Uup'] = {'symbol': 'Uup', 'name':           'Uup', 'mass': 288.00000000, 'radius':  1.6200, 'color': [0.922, 0.000, 0.149], 'number': 115};
module.exports[116] = module.exports['Uuh'] = {'symbol': 'Uuh', 'name':           'Uuh', 'mass': 292.00000000, 'radius':  1.7500, 'color': [0.922, 0.000, 0.149], 'number': 116};
module.exports[117] = module.exports['Uus'] = {'symbol': 'Uus', 'name':           'Uus', 'mass': 294.00000000, 'radius':  1.6500, 'color': [0.922, 0.000, 0.149], 'number': 117};
module.exports[118] = module.exports['Uuo'] = {'symbol': 'Uuo', 'name':           'Uuo', 'mass': 296.00000000, 'radius':  1.5700, 'color': [0.922, 0.000, 0.149], 'number': 118};

},{}],"/home/rye/Dropbox/src/speck/src/main.js":[function(require,module,exports){
"use strict";

var glm = require('gl-matrix');
var Speck = require('./speck');

var xyz = require('./xyz');
var elements = require('./elements');

var speck;

function loadStructure(data) {

    speck.clearSpheres();

    var bounds = {
        x: Infinity,
        y: Infinity,
        z: Infinity,
        X: -Infinity,
        Y: -Infinity,
        Z: -Infinity
    };

    for (var i = 0; i < data.length; i++) {
        var a = data[i];
        var x = a.position[0];
        var y = a.position[1];
        var z = a.position[2];
        bounds.x = Math.min(x, bounds.x);
        bounds.X = Math.max(x, bounds.X);
        bounds.y = Math.min(y, bounds.y);
        bounds.Y = Math.max(y, bounds.Y);
        bounds.z = Math.min(z, bounds.z);
        bounds.Z = Math.max(z, bounds.Z);
    }

    var shift = {
        x: -bounds.x - (bounds.X - bounds.x)/2,
        y: -bounds.y - (bounds.Y - bounds.y)/2,
        z: -bounds.z - (bounds.Z - bounds.z)/2
    };
    
    for (var i = 0; i < data.length; i++) {
        var a = data[i];
        var x = a.position[0] + shift.x;
        var y = a.position[1] + shift.y;
        var z = a.position[2] + shift.z;
        var r = elements[a.symbol].color[0];
        var g = elements[a.symbol].color[1];
        var b = elements[a.symbol].color[2];
        var radius = elements[a.symbol].radius;
        speck.addSphere(x,y,z, r,g,b, radius);
    }
}

window.onload = function() {

    var canvas = document.getElementById("render-canvas");

    speck = new Speck(canvas, 256);

    var structs = {};
    structs.protein = "681\n4E0O.pdb\nN         14.45600       -7.90000       10.95800\nC         13.86500       -7.78000       12.29000\nC         13.12700       -9.06500       12.68200\nC         11.85000       -9.33100       11.88500\nC         10.59800       -9.60200       12.72800\nN         10.37400       -8.60400       13.77200\nC         14.90600       -7.43400       13.35400\nO         16.07900       -7.80100       13.23700\nN         14.16100       -6.67500       14.37700\nC         15.10600       -6.10700       15.31800\nC         14.47100       -5.88700       16.69000\nO         13.24300       -5.87600       16.83300\nC         15.64300       -4.77700       14.77700\nO         14.63100       -3.79300       14.65300\nN         15.33300       -5.71900       17.68600\nC         14.93100       -5.41400       19.05500\nC         14.94200       -5.42100       19.06400\nC         14.33300       -4.00400       19.09600\nO         14.88900       -3.08500       18.50300\nC         16.12100       -5.56800       20.02900\nC         16.14300       -5.58300       20.04600\nC         17.24200       -4.59200       19.70800\nC         15.79900       -5.08500       21.44700\nC         15.67700       -5.45900       21.48300\nC         16.61400       -7.04600       20.10900\nN         13.20500       -3.83500       19.79000\nC         12.59100       -2.51500       19.90000\nC         12.17500       -2.35500       21.33700\nO         11.51600       -3.24900       21.88200\nC         11.38900       -2.35600       18.94600\nC         10.81300       -0.92700       18.97900\nC          9.93700       -0.58400       17.78700\nO          9.54600       -1.43900       16.98100\nN          9.63400        0.69300       17.63700\nN         12.63600       -1.26500       21.97200\nC         12.30500       -0.97600       23.36700\nC         11.69300        0.41100       23.37700\nO         12.27600        1.33700       22.79900\nC         13.54100       -1.05600       24.30600\nC         14.29000       -2.43400       24.24200\nC         13.13200       -0.67800       25.75800\nC         13.50900       -3.70400       24.76000\nN         10.51900        0.56000       24.02800\nC          9.79600        1.82000       24.02500\nC          9.51100        2.25400       25.43900\nO          9.10800        1.43800       26.26400\nC          8.46700        1.69500       23.18200\nC          7.65500        3.00800       23.21900\nC          8.78000        1.32200       21.72200\nN          9.69700        3.55200       25.70500\nC          9.28800        4.19500       26.94300\nC          8.25500        5.24600       26.50600\nO          8.57000        6.09700       25.67500\nC         10.48200        4.93300       27.60900\nC         10.08700        5.80500       28.77400\nC          9.78500        5.25200       30.01600\nC          9.95500        7.18900       28.62400\nC          9.41500        6.05300       31.09200\nC          9.61100        7.99800       29.69900\nC          9.34200        7.42700       30.93200\nO          9.05300        8.23900       31.99400\nN          7.03700        5.17600       27.02200\nC          6.04000        6.17700       26.65300\nC          5.31000        6.64200       27.91000\nO          4.51100        5.87500       28.45200\nC          5.05900        5.56800       25.61300\nC          4.14800        6.62400       25.00500\nC          3.12000        6.00500       24.06900\nC          2.34200        7.05400       23.31300\nN          1.24800        6.44100       22.50600\nN          4.17300        6.53300       33.01700\nC          4.63100        6.03000       31.72200\nC          5.93200        6.73200       31.28600\nC          5.76600        8.19200       30.80500\nC          4.87000        8.34400       29.57000\nN          5.57500        7.92800       28.35800\nC          4.82900        4.51800       31.79200\nO          4.92400        3.94100       32.88000\nN          4.84300        3.98300       30.54700\nC          4.99400        2.52600       30.40000\nC          6.34100        2.22700       29.75400\nO          6.86100        3.06500       29.03900\nC          3.90400        1.97700       29.47900\nC          2.49300        2.09000       30.01400\nC          1.52200        1.51000       29.01200\nO          1.34000        2.13000       27.93900\nO          1.02300        0.38800       29.25500\nN          6.85400        0.99400       29.92700\nC          8.13600        0.60200       29.37100\nC          8.01300       -0.78800       28.76800\nO          7.53900       -1.72800       29.44500\nC          9.23500        0.66800       30.47400\nC         10.59400        0.15000       30.06900\nC         10.95800       -1.17000       30.32300\nC         11.52800        0.99200       29.46700\nC         12.21300       -1.65900       29.93300\nC         12.79100        0.51100       29.09800\nC         13.12900       -0.81500       29.35500\nN          8.38000       -0.98800       27.45400\nN          8.46900       -2.21300       27.12400\nC          8.99500       -2.55900       25.94200\nO          9.41600       -1.74300       25.13000\nC          9.09400       -4.06500       25.58100\nC          9.70900       -4.38400       24.36200\nC          8.53500       -5.06900       26.37100\nC          7.33800       -5.81100       28.30000\nO          7.89200       -4.72700       27.52700\nC          8.68300       -6.40300       25.97000\nC          9.29900       -6.71300       24.75500\nC          9.83700       -5.70400       23.95500\nN         10.45600       -5.92900       22.77800\nC         10.50500       -7.08600       22.11600\nO          9.99700       -8.13000       22.49900\nC         11.23500       -7.08300       20.77900\nO         11.77700       -6.03000       20.47200\nC         14.32800       -9.28200       20.07300\nC         14.63900       -9.51500       17.64300\nC         15.70100       -9.30300       20.29400\nC         15.54700       -9.85200       16.62800\nC         16.54500       -9.52400       19.21300\nC         15.17500      -10.74000       15.61900\nBr        18.40600       -9.55400       19.45500\nBr        16.38800      -11.22200       14.24900\nC         16.06700       -9.74400       17.93700\nC         13.90000      -11.29000       15.61300\nC         14.70000       -9.75700       17.71500\nC         12.99000      -10.96000       16.61900\nC         13.84500       -9.51300       18.78300\nC         13.34300      -10.04800       17.61600\nC         12.38200       -9.57300       18.52600\nC         12.35000       -9.77600       18.72500\nC         11.74400       -8.24200       18.80000\nC         11.76100       -8.37300       18.80000\nN         11.23000       -8.29100       20.15800\nC         10.58400       -8.22300       17.84800\nO          9.56200       -8.86100       18.06200\nN         10.82200       -7.48000       16.76100\nC          9.83000       -7.34200       15.69200\nC         10.53800       -7.37100       14.34700\nO         11.21500       -6.41200       13.99700\nC          9.02300       -6.04700       15.88400\nN         -0.53400       14.60500       26.47100\nC          0.72100       14.38200       25.74800\nC          1.28400       15.69900       25.20100\nC          0.45300       16.33600       24.07400\nC          0.37300       15.49500       22.79700\nN          1.67500       15.33100       22.15600\nC          1.74900       13.73400       26.66800\nO          1.61800       13.77400       27.89500\nN          2.78600       13.10000       25.88000\nC          3.73200       12.34300       26.69000\nC          5.12200       12.27900       26.05100\nO          5.27400       12.35900       24.82900\nC          3.22200       10.91600       26.87200\nO          3.13800       10.23800       25.62800\nN          6.12700       12.06200       26.88500\nC          7.48100       11.80800       26.42400\nC          7.51400       10.38400       25.84200\nO          6.90500        9.47700       26.41600\nC          8.47400       12.00000       27.58900\nC          9.89300       11.61900       27.17000\nC          8.44900       13.46500       28.05800\nN          8.17900       10.21400       24.68100\nC          8.31500        8.92800       24.00800\nC          9.76300        8.77000       23.57900\nO         10.31300        9.66200       22.93600\nC          7.39600        8.82900       22.79000\nC          7.45900        7.42000       22.17100\nC          6.30500        7.05800       21.26300\nO          5.43400        7.87600       20.93700\nN          6.28100        5.80400       20.84400\nN         10.37700        7.64700       23.97000\nC         11.77300        7.33600       23.67700\nC         11.79400        5.94800       23.12500\nO         11.21300        5.03900       23.74000\nC         12.62900        7.41400       24.96300\nC         12.54000        8.82100       25.64500\nC         14.08600        7.00100       24.63800\nC         13.30400       10.01200       24.86000\nN         12.44400        5.78500       21.96000\nC         12.49300        4.51100       21.26900\nC         13.94200        4.09500       21.01600\nO         14.78700        4.90500       20.61700\nC         11.67800        4.56300       19.92300\nC         11.72400        3.20800       19.20900\nC         10.20700        4.93900       20.17900\nN         14.20500        2.82300       21.23000\nC         15.45900        2.15800       20.88300\nC         15.05800        1.07800       19.86800\nO         14.20100        0.25900       20.17400\nC         16.11200        1.52500       22.12700\nC         17.28100        0.61100       21.80300\nC         18.52800        1.13200       21.46600\nC         17.13000       -0.77700       21.79800\nC         19.58700        0.29700       21.10100\nC         18.20800       -1.62100       21.51200\nC         19.44200       -1.07600       21.19000\nO         20.51500       -1.90000       20.93200\nN         15.55200        1.14600       18.64000\nC         15.19100        0.18400       17.61700\nC         16.46700       -0.29100       16.92300\nO         17.06800        0.50200       16.20600\nC         14.17100        0.80100       16.62300\nC         13.62800       -0.22500       15.60800\nC         12.75000        0.47100       14.55300\nC         12.42200       -0.39700       13.36400\nN         11.87800        0.42400       12.24200\nN         21.51600       -0.27600       15.93900\nC         20.23800        0.25100       16.42200\nC         19.78500       -0.47300       17.70400\nC         19.39200       -1.95300       17.43300\nC         18.18400       -2.09500       16.49300\nN         16.95400       -1.55800       17.11000\nC         20.33700        1.75100       16.65800\nO         21.43900        2.27600       16.83700\nN         19.16000        2.37800       16.60200\nC         19.02300        3.82700       16.72600\nC         18.27200        4.14200       17.98700\nO         17.51600        3.28900       18.44400\nC         18.33300        4.43500       15.48600\nC         19.17400        4.32700       14.21000\nC         20.57100        4.92300       14.27800\nO         21.55900        4.15600       14.21700\nO         20.67800        6.15200       14.47500\nN         18.45900        5.37400       18.52500\nC         17.86300        5.79400       19.80700\nC         17.26300        7.18700       19.69600\nO         17.97600        8.11300       19.25500\nC         18.98000        5.79200       20.87400\nC         18.51700        6.24200       22.22900\nC         18.70100        7.55300       22.64200\nC         17.86500        5.36000       23.08600\nC         18.27000        7.96800       23.90000\nC         17.43800        5.78000       24.34700\nC         17.63300        7.09200       24.73700\nN         15.99600        7.36400       20.07100\nN         15.62400        8.57400       20.07700\nC         14.40400        8.90700       20.51300\nO         13.59500        8.10200       20.98400\nC         14.03100       10.42100       20.52800\nC         12.82300       10.71700       21.15400\nC         14.86500       11.43900       19.99700\nC         16.98900       12.22800       19.02900\nO         16.06900       11.13200       19.39500\nC         14.44400       12.77200       20.13500\nC         13.24700       13.05300       20.81700\nC         12.39300       12.04400       21.28100\nN         11.21300       12.26700       21.91800\nC         10.49200       13.39200       21.89700\nO         10.78200       14.42000       21.26300\nC          9.19400       13.40000       22.71000\nO          8.86000       12.41500       23.36700\nC          8.56400       15.71200       25.79300\nC          5.93400       15.75900       26.02200\nC          8.71900       15.71900       27.17700\nC          4.96600       16.28900       26.88700\nC          7.60200       15.89000       27.97900\nC          4.34300       17.49900       26.58800\nBr         7.80300       15.92000       29.83700\nBr         3.02300       18.26600       27.71300\nC          6.32900       16.07900       27.45800\nC          4.68900       18.20100       25.44300\nC          6.16800       16.08800       26.08200\nC          5.63400       17.68400       24.57100\nC          7.28600       15.91000       25.27200\nC          6.24800       16.45500       24.84400\nC          7.09800       15.96800       23.80000\nC          7.33300       16.03900       23.87400\nC          7.23000       14.59200       23.19000\nC          7.24100       14.67700       23.19400\nN          8.55600       14.53100       22.60200\nC          6.26100       14.65500       22.03700\nO          6.26800       15.59500       21.25400\nN          4.99000       14.35500       22.39300\nC          3.79600       14.37500       21.53400\nC          2.52300       14.21800       22.33900\nO          2.37800       13.22500       23.04400\nC          3.87900       13.35100       20.37500\nC          4.31800       11.93300       20.76800\nC          4.39000       10.98700       19.57200\nC          3.13700       10.15800       19.41100\nN          3.26600        9.17600       18.30300\nN          6.29700       17.34500      -12.97800\nC          6.39100       16.55100      -11.75800\nC          6.92600       17.38400      -10.59300\nC          8.34400       17.93200      -10.77900\nC          9.47000       16.93400      -10.48700\nN          9.29900       16.20900       -9.22700\nC          5.04700       15.94400      -11.38300\nO          3.99300       16.41100      -11.81400\nN          5.21400       14.79900      -10.50700\nC          3.97600       14.16100      -10.09600\nC          3.97800       13.80100       -8.61700\nO          5.04300       13.71400       -7.97900\nC          3.68400       12.93400      -10.96000\nO          4.67400       11.92800      -10.84700\nN          2.77200       13.62700       -8.06400\nC          2.61500       13.25300       -6.66300\nC          3.20000       11.85800       -6.41400\nO          3.03000       10.94900       -7.23200\nC          1.14000       13.34800       -6.19000\nC          0.26300       12.31100       -6.89300\nC          1.04400       13.21600       -4.66100\nN          3.90500       11.71300       -5.28500\nC          4.49400       10.44500       -4.89500\nC          4.29900       10.24300       -3.38600\nO          4.77900       11.05500       -2.57500\nC          5.97000       10.34200       -5.30400\nC          6.45600        8.89700       -5.18300\nC          7.86700        8.70200       -5.68600\nO          8.22600        9.09100       -6.80500\nN          8.69400        8.07900       -4.87400\nN          3.60600        9.15100       -3.02900\nC          3.33200        8.80400       -1.62600\nC          3.90400        7.41100       -1.38800\nO          3.60800        6.48600       -2.14000\nC          1.80400        8.89300       -1.28700\nC          1.19600       10.27400       -1.65100\nC          1.53200        8.50100        0.18300\nC          1.72500       11.53300       -0.82600\nN          4.75500        7.28300       -0.37000\nC          5.41700        6.02200       -0.03600\nC          5.09300        5.59300        1.39300\nO          5.12000        6.40700        2.33200\nC          6.96500        6.14500       -0.23000\nC          7.68800        4.84600        0.17900\nC          7.31200        6.50900       -1.67000\nN          4.83000        4.27900        1.54500\nC          4.69200        3.63300        2.82200\nC          5.81300        2.60200        2.79200\nO          5.85900        1.79500        1.85700\nC          3.33400        2.92200        2.93200\nC          3.25700        2.02300        4.14400\nC          2.91200        2.53100        5.39300\nC          3.54400        0.65800        4.04600\nC          2.80900        1.69900        6.50900\nC          3.47400       -0.17400        5.15800\nC          3.11600        0.35000        6.39000\nO          2.98800       -0.50300        7.45500\nN          6.74800        2.65400        3.76100\nC          7.83400        1.68000        3.79700\nC          7.94800        1.16900        5.22800\nO          8.32000        1.94800        6.10200\nC          9.15300        2.32800        3.29700\nC         10.30800        1.32400        3.18700\nC         11.62800        2.01800        2.90700\nC         12.76200        1.02200        2.81500\nN         14.07700        1.64200        3.14400\nN          6.97700        1.23500       10.44500\nC          7.11900        1.72800        9.08100\nC          6.09600        1.05100        8.15800\nC          6.39600       -0.42600        7.85600\nC          7.69900       -0.67800        7.07800\nN          7.62000       -0.16400        5.70600\nC          6.95300        3.23600        9.03800\nO          6.21700        3.81400        9.84400\nN          7.26300        3.84400        7.87800\nC          7.18600        5.28900        7.67200\nC          6.20800        5.58800        6.54900\nO          5.94800        4.72400        5.70700\nC          8.56800        5.87000        7.34200\nC          9.50500        5.96500        8.54300\nC         10.94200        6.37400        8.25900\nO         11.25500        6.74400        7.10300\nO         11.75800        6.33500        9.20900\nN          5.65400        6.80700        6.54700\nC          4.69000        7.20100        5.53100\nC          5.00900        8.61000        5.02600\nO          5.10700        9.54800        5.82500\nC          3.24100        7.12300        6.09900\nC          2.15600        7.59100        5.14900\nC          1.69900        8.91300        5.18000\nC          1.56800        6.70600        4.24800\nC          0.70500        9.35200        4.29500\nC          0.57100        7.14300        3.36300\nC          0.15000        8.46400        3.38900\nN          5.16600        8.86800        3.71300\nN          5.33900       10.05200        3.35100\nC          5.26900       10.39700        2.06200\nO          5.13100        9.58700        1.14900\nC          5.40600       11.89100        1.70500\nC          5.25300       12.22400        0.35100\nC          5.62100       12.89700        2.66100\nC          5.63400       13.62200        4.96400\nO          5.75300       12.56300        3.99400\nC          5.71400       14.23400        2.22700\nC          5.60500       14.53800        0.87400\nC          5.35000       13.54400       -0.07500\nN          5.25700       13.78800       -1.39800\nC          5.51200       14.94300       -2.02400\nO          5.86600       15.98700       -1.47200\nC          5.35400       14.92300       -3.53700\nO          4.94700       13.87400       -4.04500\nC          2.84700       16.98500       -5.52000\nC          3.85300       17.31700       -7.60200\nC          1.50200       17.03100       -5.88100\nC          3.22300       17.69500       -8.78700\nC          1.16600       17.30900       -7.20000\nC          3.63400       18.84200       -9.46000\nBr        -0.63900       17.32700       -7.71700\nBr         2.77600       19.34600      -11.06800\nC          2.12300       17.58200       -8.16500\nC          4.68200       19.60800       -8.96500\nC          3.46400       17.57900       -7.79800\nC          5.31900       19.22900       -7.78300\nC          3.81700       17.28500       -6.48100\nC          4.91700       18.07400       -7.10700\nC          5.27500       17.30700       -6.11300\nC          5.61200       17.70500       -5.81500\nC          5.70600       15.95200       -5.60900\nC          5.75800       16.20200       -5.59200\nN          5.62600       15.95500       -4.16000\nC          7.14600       15.78300       -6.02900\nO          8.08700       16.26800       -5.41400\nN          7.48700       14.85500       -6.95800\nC          8.79700       14.59300       -7.56300\nC          8.77700       15.01400       -9.02800\nO          7.90900       14.56700       -9.77900\nC          9.17900       13.10000       -7.43100\nC         10.61100       12.76700       -7.87900\nC         10.85900       11.26200       -7.86300\nC         12.29800       10.89000       -8.13400\nN         12.65400       11.03500       -9.56800\nN         13.88200       -7.20300        5.99500\nC         13.07100       -6.67800        4.90000\nC         12.77400       -7.78100        3.88100\nC         13.98200       -8.23000        3.07300\nC         14.54200       -7.16600        2.14400\nN         13.61500       -6.83300        1.06300\nC         11.76000       -6.08300        5.41300\nO         11.36100       -6.33000        6.55900\nN         11.05100       -5.22100        4.38700\nC          9.78300       -4.62900        4.79400\nC          8.80900       -4.43300        3.63100\nO          9.19600       -4.47200        2.45600\nC         10.01600       -3.29500        5.50500\nO         10.61600       -2.33600        4.64900\nN          7.53300       -4.19700        3.98000\nC          6.46800       -3.90200        3.02000\nC          6.71600       -2.51400        2.47700\nO          6.94400       -1.58300        3.25800\nC          5.06100       -3.98000        3.66500\nC          3.95400       -3.77200        2.63400\nC          4.87100       -5.30100        4.36600\nN          6.62500       -2.36500        1.15200\nC          6.79000       -1.06700        0.51500\nC          5.61800       -0.88700       -0.42900\nO          5.34900       -1.78400       -1.22900\nC          8.12200       -1.00700       -0.23700\nC          8.56300        0.41300       -0.55400\nC          9.94200        0.44500       -1.16700\nO         10.87700       -0.23600       -0.71700\nN         10.09100        1.23700       -2.21400\nN          4.87300        0.21300       -0.27500\nC          3.68200        0.50900       -1.09100\nC          3.89500        1.91900       -1.64400\nO          4.20500        2.82500       -0.88400\nC          2.35900        0.42100       -0.26900\nC          2.12000       -1.01300        0.33000\nC          1.15500        0.88400       -1.14000\nC          1.81500       -2.13600       -0.71100\nN          3.78200        2.07300       -2.96800\nC          4.01000        3.34700       -3.63100\nC          2.79100        3.74700       -4.42000\nO          2.19700        2.92600       -5.12100\nC          5.28400        3.27000       -4.56000\nC          5.49900        4.57000       -5.34600\nC          6.55100        2.94400       -3.75700\nN          2.47200        5.04500       -4.37400\nC          1.45300        5.65300       -5.22200\nC          2.23600        6.74300       -5.97400\nO          2.90000        7.54000       -5.33000\nC          0.32800        6.25300       -4.37600\nC         -0.62300        7.14800       -5.14800\nC         -1.61900        6.60900       -5.95600\nC         -0.54700        8.53200       -5.04100\nC         -2.49400        7.42900       -6.66700\nC         -1.43000        9.36000       -5.72600\nC         -2.40700        8.80400       -6.53400\nO         -3.27600        9.63500       -7.19400\nN          2.25900        6.71300       -7.31300\nC          2.99000        7.71200       -8.09600\nC          2.11100        8.15500       -9.24600\nO          1.86600        7.34500      -10.13900\nC          4.35100        7.14700       -8.58800\nC          5.25300        8.19700       -9.22700\nC          6.57000        7.61000       -9.69900\nC          7.39600        8.62800      -10.44300\nN          8.58700        8.00800      -11.07600\nN         -1.98700        8.01500      -12.15800\nC         -1.03800        7.45200      -11.20900\nC         -1.13400        8.20000       -9.87400\nC         -0.76000        9.69000       -9.94900\nC          0.71300        9.96000      -10.25100\nN          1.59600        9.39200       -9.22900\nC         -1.36100        5.97200      -10.99300\nO         -2.36300        5.46400      -11.51100\nN         -0.10000        5.42500      -10.71300\nC          0.00700        3.98200      -10.48600\nC          0.10800        3.67100       -9.00900\nO          0.57500        4.49900       -8.22800\nC          1.21200        3.38000      -11.23300\nC          1.18800        3.57200      -12.74300\nC          0.26800        2.62200      -13.48100\nO          0.69800        1.47900      -13.75500\nO         -0.88400        3.01500      -13.77500\nN         -0.27700        2.43900       -8.63400\nC         -0.24300        2.04600       -7.22700\nC          0.32200        0.64700       -7.07900\nO         -0.13900       -0.24300       -7.79100\nC         -1.67900        2.10400       -6.67800\nC         -1.84800        1.63100       -5.26000\nC         -2.19700        0.30800       -4.98600\nC         -1.66400        2.50400       -4.19500\nC         -2.32600       -0.13300       -3.66500\nC         -1.80700        2.06500       -2.88000\nC         -2.15900        0.75900       -2.62400\nN          1.27200        0.37300       -6.19100\nN          1.64800       -0.81200       -6.04100\nC          2.57200       -1.10600       -5.15000\nO          3.11900       -0.27100       -4.42400\nC          2.92900       -2.59100       -4.99100\nC          3.74800       -2.90300       -3.91700\nC          2.35600       -3.61100       -5.78800\nC          0.87100       -4.36300       -7.53800\nO          1.54200       -3.26900       -6.83600\nC          2.64600       -4.95300       -5.47600\nC          3.53300       -5.24000       -4.42500\nC          4.08600       -4.23400       -3.63700\nN          4.93100       -4.44300       -2.59800\nC          5.60800       -5.56500       -2.31900\nO          5.56200       -6.59300       -2.98400\nC          6.53300       -5.57000       -1.10100\nO          6.73800       -4.52000       -0.50000\nC          5.97400       -7.93200        2.08900\nC          8.17300       -7.90700        3.13400\nC          5.23900       -8.02600        3.26900\nC          8.65300       -8.34700        4.37200\nC          5.88700       -8.17800        4.49100\nC          9.47400       -9.46700        4.44300\nBr         4.87900       -8.19900        6.09400\nBr        10.11400      -10.09700        6.10700\nC          7.26800       -8.31100        4.54100\nC          9.83000      -10.16100        3.29800\nC          8.00600       -8.28000        3.35900\nC          9.35800       -9.72600        2.06300\nC          7.35600       -8.08500        2.14000\nC          8.55900       -8.59100        1.97800\nC          8.15500       -8.10100        0.87000\nC          8.03400       -8.23200        0.61400\nC          8.21300       -6.74500        0.18900\nC          8.20800       -6.78300        0.19300\nN          7.17000       -6.65500       -0.81500\nC          9.53600       -6.66600       -0.52300\nO          9.81000       -7.46300       -1.41000\nN         10.41600       -5.93100        0.18600\nC         11.81800       -5.69700       -0.15900\nC         12.68900       -5.85300        1.08400\nO         12.50400       -5.12900        2.05900\nC         11.99400       -4.31400       -0.80400\nC          2.82600       -2.52400       26.43600\nC          4.19000       -2.01700       26.89700\nO          4.00800       -1.13400       28.03400\nC          4.98400       -3.21700       27.39400\nC          4.95500       -1.31900       25.75800\nC          4.69700        0.16800       25.46600\nO          3.37700        0.58300       25.73600\nC          5.68400        1.10000       26.14900\nC         13.14800      -11.56000       25.42300\nC         12.40200      -10.22700       25.39500\nO         11.54300      -10.19400       24.23200\nC         11.50200      -10.15500       26.62100\nC         13.33900       -9.01100       25.38000\nC         14.24900       -8.85100       24.15600\nO         13.47500       -8.80000       22.97300\nC         15.08300       -7.58000       24.29300\nP         23.42800       -1.27000       19.11100\nO         24.97700       -1.47600       19.33000\nO         23.37500       -0.23800       17.91200\nO         22.86100       -2.67800       18.67500\nO         22.77100       -0.77500       20.48500\nC         14.80400        5.13300       17.10100\nC         14.56400        6.37700       16.25500\nO         14.48900        5.95500       14.87000\nC         13.21600        6.96700       16.65100\nC         15.71700        7.36700       16.48300\nC         15.89300        8.54500       15.51300\nO         16.52300        9.60300       16.20100\nC         16.79200        8.18500       14.33700\nC          8.32100        8.45300       18.63100\nC          9.66000        9.14300       18.38900\nO         10.67700        8.41300       19.13000\nC         10.01400        9.02900       16.90800\nC          9.65700       10.58400       18.93000\nC          8.88200       11.65900       18.15600\nO          7.94300       12.26400       19.02100\nC          9.83400       12.73200       17.63600\nC         10.80300       12.63700       -2.44400\nC          9.42900       13.12100       -1.98400\nO          9.62700       14.38900       -1.31000\nC          8.55200       13.39800       -3.19900\nC          8.71000       12.22800       -0.95400\nC          8.89300       10.70700       -0.98600\nO          8.50900       10.18700        0.26500\nC          8.01400       10.04400       -2.03300\nP         -5.22300        9.08500       -9.94500\nO         -4.26600       10.31500      -10.01500\nO         -6.70300        9.46400      -10.34000\nO         -4.73800        7.99400      -10.99600\nO         -5.25000        8.54200       -8.45600\nP         -2.90900       11.56100      -13.28800\nO         -2.28700       12.71200      -12.39600\nO         -3.06000       12.00400      -14.80400\nO         -1.89600       10.35700      -13.25300\nO         -4.34000       11.21300      -12.71300\nC          1.98700       -5.85200       -0.63600\nC          2.26200       -7.13800        0.13700\nO          3.64200       -7.52200       -0.06800\nC          2.08900       -6.87400        1.62100\nC          1.33200       -8.29200       -0.24600\nC          1.31300       -8.72600       -1.71200\nO          2.63300       -8.90200       -2.18800\nC          0.53300      -10.02600       -1.83500\nC          3.57500        2.56400       -8.40000\nC          4.21000        1.27100       -8.89100\nO          4.99100        1.59300      -10.07200\nC          5.14400        0.75500       -7.80300\nC          3.10800        0.25000       -9.20100\nC          3.38800       -0.78600      -10.29500\nO          4.20600       -1.81600       -9.79100\nC          2.08700       -1.38400      -10.82200\nO          5.57800       -0.44300       32.00800\nO         13.37600        3.17000       24.80100\nO          1.89500        5.16500       28.18200\nO          8.79300        7.22800       34.42700\nO         18.21000       -5.81300       16.72900\nO          7.14800       -3.03300       31.74400\nO          1.04500        5.57700       30.72000\nO          5.83100       -5.38000       32.05200\nO          6.23100        6.23500       34.89100\nO         15.80400       -1.94500       13.04300\nO          6.88300        0.90600       33.94700\nO         18.28100       -8.41700       15.04400\nO         20.62000        6.83700       17.44600\nO         20.19200        9.47900       19.00500\nO         24.10300       -0.58600       22.83800\nO         21.58600       -2.58900       14.70700\nO         21.86500        1.51500       13.74400\nO         21.39700       -9.49400       19.59000\nO         16.77100        1.22100       13.58400\nO         24.50500       -2.16000       14.83500\nO         22.32600       -4.22000       16.50400\nO         19.86500       -1.99300       13.14600\nO         19.61500        0.77200       12.61000\nO         26.48600       -1.40600       22.00500\nO         25.81500       -3.68500       18.99700\nO         23.45000        4.26800       16.62600\nO          7.67900       15.94900       32.63800\nO         15.00500        3.59100       13.45000\nO          0.59600       14.07200       -9.89300\nO          1.84500        4.72900       -0.67300\nO          5.88600        8.28300        8.98400\nO          4.30700        9.61300      -12.18800\nO          4.44400       10.84300        8.15200\nO          8.14900       12.09600      -10.87500\nO         11.03600        2.79200        6.55200\nO          6.44000       12.36400      -12.93400\nO          9.96900        7.43400       -8.11000\nO         -2.04200       13.17900       -9.78500\nO          3.11200        6.35800      -12.33700\nO         -1.99200        1.02000      -10.58300\nO         -1.81300       -2.01200       -8.96700\nO         -4.21000        0.46500      -12.44900\nO         -3.29000       17.19000       -9.08100\nO         -7.21300        8.22800       -6.92100\nO          0.40700        9.54100      -14.41100\nO         -8.10400       11.53400      -11.08400\nO         -5.21600        5.82400       -9.41100\nO         -1.93700        9.75300      -15.98700\nO          0.47500       12.77300      -12.48600\nO         -1.48700        6.53800      -14.59200\n";
    structs.au = "147\n\nAu      0.863612620000000     10.165467520000000     14.256430499999999\nAu      9.158830980000001     10.168167879999999     14.257049560000000\nAu      9.159737340000000     10.174013459999999      7.103283459999999\nAu      9.155459819999999     10.164014380000001     21.403742619999999\nAu      3.536031720000000     10.168052180000000     14.258336300000000\nAu     11.991745740000001     10.168714400000001     14.260906660000002\nAu     11.963589560000001     10.211136260000000      7.356301680000000\nAu     11.967944559999999     10.132059860000000     21.159022040000000\nAu      6.325499960000000     10.168469220000000     14.260199719999999\nAu      6.355999780000000     10.208776240000001      7.353304919999999\nAu      6.345758120000000     10.132798780000000     21.157132100000002\nAu     14.781116220000001     10.170959760000001     14.262894100000000\nAu     10.534406219999999      2.845260080000000     14.250076879999998\nAu      2.125023160000000     12.641243160000000     14.251751020000000\nAu     10.575386119999999     12.624920880000001     14.262562860000001\nAu     10.593460540000001     12.587808480000000      7.352597719999999\nAu     10.526010300000001     12.616388980000000     21.164485679999999\nAu      5.012285460000000      2.984262840000000     14.262548819999999\nAu     13.311812800000000      2.985800480000000     14.264742440000001\nAu      4.905614480000001     12.622649259999999     14.230518640000000\nAu      5.008343600000000     12.565793240000000     21.030971000000001\nAu     13.410571460000002     12.626194099999999     14.236499159999999\nAu     13.302405999999998     12.568254659999999     21.033563980000000\nAu      7.788829099999999      2.843013420000000     14.251100499999998\nAu      7.742124260000000     12.624067300000000     14.260593880000000\nAu      7.724426060000000     12.586806440000000      7.351619339999999\nAu      7.784013120000000     12.618119539999999     21.162864319999997\nAu     16.191204639999999     12.645833459999999     14.257775740000001\nAu      9.158925620000000      5.257858060000000     14.228462040000000\nAu      9.154226120000001      5.380656060000000     21.033531220000000\nAu      9.155995420000000     15.077901019999999     14.288651519999998\nAu      9.157136820000000     14.963458899999999      7.483340020000000\nAu      3.498336660000000      5.313453600000000     14.265123080000000\nAu     11.972274340000000      5.298077720000000     14.259220819999999\nAu      3.496341940000000     15.018875820000000     14.251661060000000\nAu     11.967292740000000     15.037564879999998     14.261018720000001\nAu      6.347732820000000      5.298397520000000     14.258763999999999\nAu     14.819427740000002      5.317480220000000     14.269699859999999\nAu      6.346155400000000     15.036827519999999     14.259293099999999\nAu     14.818271520000000     15.023060259999999     14.258375300000001\nAu      2.128337120000000      7.691413079999999     14.258700560000001\nAu     10.576051979999999      7.711782260000000     14.255566260000000\nAu     10.533309279999999      7.722703300000000      7.353082360000000\nAu     10.593273080000001      7.753437900000000     21.159922160000001\nAu     10.527279360000000     17.493783839999999     14.268429500000000\nAu      4.907006520000000      7.711380820000000     14.279644339999999\nAu      5.018669500000000      7.770077900000000      7.485901800000000\nAu     13.410827040000001      7.713210700000000     14.284747100000001\nAu     13.308877400000002      7.781854340000001      7.490537860000000\nAu      5.008466060000000     17.349843940000000     14.252558840000001\nAu     13.301738060000000     17.351301240000002     14.256733400000000\nAu      7.740891340000000      7.712818360000000     14.255203040000000\nAu      7.791607720000001      7.721838539999999      7.350393700000001\nAu      7.717247200000000      7.753175820000000     21.158911800000002\nAu     16.191535620000000      7.695249380000001     14.267623240000001\nAu      7.784077079999999     17.493631480000001     14.266470920000001\nAu      2.125016660000000     10.985237120000001     16.593982340000000\nAu     10.573708079999999     10.988244540000000     16.573102259999999\nAu     10.599431700000000     11.008222159999999      9.640751379999999\nAu      4.904894800000000     10.958586340000000     16.582938060000000\nAu      4.797085020000000     11.072825139999999      9.559204720000000\nAu     13.409801340000000     10.962052139999999     16.584929400000000\nAu     13.523682900000001     11.076968500000000      9.561577480000000\nAu      7.740862480000000     10.986569099999999     16.572575239999999\nAu      7.722113360000001     11.005736560000001      9.638074940000001\nAu     16.190527599999999     10.988372719999999     16.601881660000000\nAu      9.159939619999999      3.421496780000000     16.643787680000003\nAu      9.154988959999999     13.524979000000000     16.633948759999999\nAu      9.158716840000000     13.421151380000001      9.667335599999999\nAu     11.968593520000001      3.669379740000000     16.598455380000001\nAu      3.313264760000000     13.539844239999999     16.642308539999998\nAu     11.971667240000000     13.456146860000000     16.585873460000002\nAu     12.127575459999999     13.497952780000000      9.555636480000000\nAu      6.351888400000000      3.670629560000000     16.597595560000002\nAu      6.339419840000000     13.453129820000001     16.581985159999999\nAu      6.191201640000000     13.493866359999998      9.552486840000000\nAu     14.999319140000001     13.543817040000000     16.649418499999999\nAu     10.597054520000000      6.083837760000000     16.581554340000000\nAu     10.557973140000000      5.936142159999999      9.549838220000000\nAu     10.553856560000000     16.015784200000002     16.684597279999998\nAu     10.593468339999999     15.876478800000001      9.679218120000000\nAu      4.793162400000000      6.033481480000000     16.674877179999999\nAu      4.936440340000001      6.071313819999999      9.682076820000001\nAu     13.522813459999998      6.034534480000000     16.680086020000001\nAu     13.385230820000000      6.076066880000000      9.684464920000000\nAu      4.930156400000000     15.848296879999999     16.592067180000001\nAu     13.381421820000000     15.849883660000000     16.595894120000001\nAu      7.721514060000000      6.085409720000000     16.581326839999999\nAu      7.763594800000001      5.935789339999999      9.548683560000001\nAu      7.756494200000000     16.015047100000000     16.683024799999998\nAu      7.720494340000000     15.877279600000000      9.677998200000001\nAu      9.158962540000001      8.531048500000001     16.568571500000001\nAu      9.161255220000001      8.508946419999999      9.637058860000000\nAu      3.395627820000001      8.452850639999999     16.673673640000001\nAu      3.503085820000000      8.555548040000000      9.682645960000000\nAu     12.061374519999999      8.488833860000000     16.628525159999999\nAu     11.969932780000001      8.550032659999999      9.670092900000000\nAu      6.254300520000000      8.485909380000001     16.626350780000003\nAu      6.351873840000000      8.547565260000001      9.666534020000000\nAu     14.918766460000001      8.456427460000000     16.676955880000001\nAu     14.818144380000001      8.559658380000000      9.690416579999999\nAu      9.155953300000000     11.832542540000000     18.878440359999999\nAu      9.159930259999999     11.809070520000001     11.945885380000000\nAu      3.496278240000000     11.779142960000001     18.835935820000000\nAu      3.396407820000000     11.877639539999999     11.836954220000001\nAu     11.966987760000000     11.794568500000000     18.850603979999999\nAu     12.063524980000000     11.851241220000000     11.891350900000001\nAu      6.344966680000000     11.793077139999999     18.849372880000001\nAu      6.256522740000000     11.847429880000000     11.888873360000000\nAu     14.815080799999999     11.783016699999999     18.840128060000001\nAu     14.920508979999999     11.884274999999999     11.845360019999999\nAu     10.593444939999999      4.462880240000000     18.839991040000001\nAu     10.555949040000000      4.323226180000000     11.832352740000001\nAu     10.552947860000000     14.404032239999999     18.966047620000001\nAu     10.596872520000000     14.252528939999999     11.935924520000000\nAu      4.935478860000000      4.481313980000000     11.922548039999999\nAu     13.379642120000000      4.483206260000000     11.923870920000001\nAu      4.927449540000000     14.264799120000001     18.833586459999999\nAu      4.794869560000000     14.298742900000001     11.836907940000000\nAu     13.380052139999998     14.269710519999999     18.839714920000002\nAu     13.523931460000000     14.305552559999999     11.842328160000001\nAu      7.723164800000000      4.461643680000000     18.838729520000001\nAu      7.760097540000000      4.322051240000000     11.832373799999999\nAu      7.755293519999999     14.403829180000001     18.964483200000000\nAu      7.718251580000000     14.250858699999998     11.933992979999999\nAu      9.158510660000001      6.921140459999999     18.847012339999999\nAu      9.159591480000000      6.814742740000000     11.883556100000000\nAu      9.156623059999999     16.913815880000001     11.873156880000000\nAu      3.322400380000000      6.792320080000001     11.872268720000001\nAu     12.126664420000001      6.843997420000000     18.958888520000002\nAu     11.969807980000001      6.880197220000000     11.932946480000000\nAu     11.963199299999999     16.669041220000000     11.921977340000000\nAu      6.188792220000000      6.840847259999999     18.957189679999999\nAu      6.351272460000001      6.877352559999999     11.929342100000000\nAu     14.997031919999998      6.796853700000000     11.879009999999999\nAu      6.350472180000000     16.667712359999999     11.920068940000000\nAu      2.127711300000000      9.346223119999999     11.921345280000001\nAu     10.596674139999999      9.336642899999999     18.876497380000000\nAu     10.575921200000000      9.351760080000000     11.944868000000000\nAu      4.792412820000000      9.261764200000000     18.955158559999997\nAu      4.909205600000000      9.374698320000000     11.934458380000001\nAu     13.523164459999998      9.264880300000000     18.959285800000000\nAu     13.410174699999999      9.379346080000001     11.938734600000000\nAu      7.716485660000000      9.334826280000001     18.874975599999999\nAu      7.742896460000000      9.351474339999999     11.943685000000000\nAu     16.191630000000000      9.352642260000000     11.928390240000001\nAu     17.453820800000003     10.170143879999999     14.266305039999999\n";
    structs.caffeine = "24\r\nCaffeine\r\nH      -3.3804130    -1.1272367     0.5733036\r\nN       0.9668296    -1.0737425    -0.8198227\r\nC       0.0567293     0.8527195     0.3923156\r\nN      -1.3751742    -1.0212243    -0.0570552\r\nC      -1.2615018     0.2590713     0.5234135\r\nC      -0.3068337    -1.6836331    -0.7169344\r\nC       1.1394235     0.1874122    -0.2700900\r\nN       0.5602627     2.0839095     0.8251589\r\nO      -0.4926797    -2.8180554    -1.2094732\r\nC      -2.6328073    -1.7303959    -0.0060953\r\nO      -2.2301338     0.7988624     1.0899730\r\nH       2.5496990     2.9734977     0.6229590\r\nC       2.0527432    -1.7360887    -1.4931279\r\nH      -2.4807715    -2.7269528     0.4882631\r\nH      -3.0089039    -1.9025254    -1.0498023\r\nH       2.9176101    -1.8481516    -0.7857866\r\nH       2.3787863    -1.1211917    -2.3743655\r\nH       1.7189877    -2.7489920    -1.8439205\r\nC      -0.1518450     3.0970046     1.5348347\r\nC       1.8934096     2.1181245     0.4193193\r\nN       2.2861252     0.9968439    -0.2440298\r\nH      -0.1687028     4.0436553     0.9301094\r\nH       0.3535322     3.2979060     2.5177747\r\nH      -1.2074498     2.7537592     1.7203047\r\n";
    structs.benzene = "12\nbenzene example\nC        0.00000        1.40272        0.00000\nH        0.00000        2.49029        0.00000\nC       -1.21479        0.70136        0.00000\nH       -2.15666        1.24515        0.00000\nC       -1.21479       -0.70136        0.00000\nH       -2.15666       -1.24515        0.00000\nC        0.00000       -1.40272        0.00000\nH        0.00000       -2.49029        0.00000\nC        1.21479       -0.70136        0.00000\nH        2.15666       -1.24515        0.00000\nC        1.21479        0.70136        0.00000\nH        2.15666        1.24515        0.00000\n  ";
    structs.methane = "5\nmethane molecule (in ångströms)\nC        0.000000        0.000000        0.000000\nH        0.000000        0.000000        1.089000\nH        1.026719        0.000000       -0.363000\nH       -0.513360       -0.889165       -0.363000\nH       -0.513360        0.889165       -0.363000\n";

    loadStructure(xyz(structs.protein)[0]);

    var selector = document.getElementById("structure");
    selector.addEventListener("change", function() {
        loadStructure(xyz(structs[selector.value])[0]);
        speck.clear();
    });
    
    var lastX = 0.0;
    var lastY = 0.0;
    var buttonDown = false;

    canvas.addEventListener("mousedown", function(e) {
        document.body.style.cursor = "none";
        if (e.button == 0) {
            buttonDown = true;
        }
        lastX = e.clientX;
        lastY = e.clientY;
    });
    window.addEventListener("mouseup", function(e) {
        document.body.style.cursor = "";
        if (e.button == 0) {
            buttonDown = false;
        }
    });
    setInterval(function() {
        if (!buttonDown) {
            document.body.style.cursor = "";
        }
    }, 10);
    window.addEventListener("mousemove", function(e) {
        if (!buttonDown) {
            return;
        }
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        if (dx == 0 && dy == 0) {
            return;
        }
        lastX = e.clientX;
        lastY = e.clientY;
        if (e.shiftKey) {
            speck.translation.x -= dx*0.005*speck.scale;
            speck.translation.y += dy*0.005*speck.scale;
        } else {
            var m = glm.mat4.create();
            glm.mat4.rotateY(m, m, dx * 0.005);
            glm.mat4.rotateX(m, m, dy * 0.005);
            glm.mat4.multiply(speck.rotation, m, speck.rotation);
        }
        speck.clear();
    });
    canvas.addEventListener("mousewheel", function(e) {
        if (e.wheelDelta > 0) {
            if (e.shiftKey) {
                speck.elementScale *= 1/0.9
            } else {
                speck.scale *= 0.9;
            }
        } else {
            if (e.shiftKey) {
                speck.elementScale *= 0.9
            } else {
                speck.scale *= 1/0.9;
            }
        }
        speck.clear();
    })


    function loop() {
        speck.render();
        requestAnimationFrame(loop);
    }

    loop();

}

},{"./elements":"/home/rye/Dropbox/src/speck/src/elements.js","./speck":"/home/rye/Dropbox/src/speck/src/speck.js","./xyz":"/home/rye/Dropbox/src/speck/src/xyz.js","gl-matrix":"/home/rye/Dropbox/src/speck/node_modules/gl-matrix/dist/gl-matrix.js"}],"/home/rye/Dropbox/src/speck/src/speck.js":[function(require,module,exports){
"use strict";

var glm = require('gl-matrix');
var core = require('webgl.js');


module.exports = function (canvas, resolution) {

        var self = this;

        var spheres = [];
        var spheresDirty = true;
        var spheresDataTexture = null;
        var float_texture_ext = null;
        var lastFrame = null;
        var iteration = 1;
        var gl, canvas, program;

        self.initialize = function() {

            self.rotation = glm.mat4.create();
            self.scale = 10.0;
            self.elementScale = 1.0;
            self.translation = {
                x: 0.0,
                y: 0.0
            }

            // Initialize canvas/gl.
            canvas.width = canvas.height = resolution;
            gl = canvas.getContext('webgl');

            // Initialize the last frame texture.
            gl.activeTexture(gl.TEXTURE0);
            lastFrame = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, lastFrame);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.bindTexture(gl.TEXTURE_2D, null);

            window.gl = gl;

            // float texture extension
            float_texture_ext = gl.getExtension('OES_texture_float');

            // Initialize shaders.
            var raw = "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvarying vec3 vPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1.0);\n    vPosition = aPosition;\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nstruct Sphere {\n    vec3 position;\n    vec3 color;\n    float radius;\n};\n\n#define BIGNUM 10000000\n\nuniform sampler2D uLastFrame;\nuniform sampler2D uSphereData;\n\nuniform vec2 uRes;\nuniform vec2 uTranslation;\n\nuniform vec4 uRand;\n\nuniform mat4 uRotation;\n\nuniform float uIteration;\nuniform float uScale;\nuniform float uElementScale;\n\nuniform int uSpheresLength;\n\nfloat SAMPLE_RADIUS = 2.0 * uScale;\nfloat TEXEL_SIZE = 1.0 / float(uSpheresLength);\nvec2 BOTTOM_LEFT = vec2(-uScale + uTranslation.x, -uScale + uTranslation.y);\nvec2 TOP_RIGHT = vec2(uScale + uTranslation.x, uScale + uTranslation.y);\n\nSphere getSphere(int index) {\n    vec4 d0 = texture2D(uSphereData, vec2(TEXEL_SIZE * (float(index) + 0.0) + 0.5 * TEXEL_SIZE, 0.0));\n    vec4 d1 = texture2D(uSphereData, vec2(TEXEL_SIZE * (float(index) + 1.0) + 0.5 * TEXEL_SIZE, 0.0));\n    Sphere s;\n    s.position = vec3(uRotation * vec4(d0.xyz, 1));\n    s.color = vec3(d0.w, d1.xy);\n    s.radius = d1.z * uElementScale;\n    return s;\n}\n\nfloat raySphereIntersect(vec3 r0, vec3 rd, Sphere s) {\n    float a = dot(rd, rd);\n    vec3 s0_r0 = r0 - s.position;\n    float b = 2.0 * dot(rd, s0_r0);\n    float c = dot(s0_r0, s0_r0) - (s.radius * s.radius);\n    if (b*b - 4.0*a*c < 0.0) {\n        return -1.0;\n    }\n    return (-b - sqrt((b*b) - 4.0*a*c))/(2.0*a);\n}\n\nvec2 randv2=fract(cos((gl_FragCoord.xy+gl_FragCoord.yx*vec2(1000.0,1000.0))+uRand.xy)*10000.0);\nvec2 rand2() {\n    randv2+=vec2(1.0,1.0);\n    return vec2(fract(sin(dot(randv2.xy ,vec2(12.9898,78.233))) * 43758.5453),\n        fract(cos(dot(randv2.xy ,vec2(4.898,7.23))) * 23421.631));\n}\n\nvec3 cosineDirection(vec3 n) {\n    vec2 r = rand2() * 6.283; \n    vec3 dr = vec3(sin(r.x) * vec2(sin(r.y), cos(r.y)), cos(r.x));\n    return (dot(dr, n) < 0.0) ? -dr : dr;\n}\n\nint SPP = 1;\nvoid main() {\n    vec4 color = vec4(0,0,0,0);\n    for (int j = 0; j < BIGNUM; j++) {\n        if (j >= SPP) {\n            break;\n        }\n        vec4 sample;\n        vec3 r0 = vec3(BOTTOM_LEFT + (gl_FragCoord.xy/uRes) * (TOP_RIGHT - BOTTOM_LEFT), 64.0);\n        r0.xy += rand2() / uRes * SAMPLE_RADIUS;\n        float mint = 1000000.0;\n        bool intersects = false;\n        Sphere hit;\n        for (int i = 0; i < BIGNUM; i+=2) {\n            if (i >= uSpheresLength) {\n                break;\n            }\n            Sphere s = getSphere(i);\n            float t = raySphereIntersect(r0, vec3(0, 0, -1), s);\n            if (t >= 0.0 && t < mint) {\n                mint = t;\n                sample = vec4(s.color, 1);\n                intersects = true;\n                hit = s;\n            }\n        }\n        if (!intersects) {\n            sample = vec4(0,0,0,0);\n        } else {\n            r0 = r0 + mint * vec3(0, 0, -1);\n            vec3 normal = normalize(r0 - hit.position);\n            vec3 rd = cosineDirection(normal);\n            for (int i = 0; i < BIGNUM; i+=2) {\n                if (i >= uSpheresLength) {\n                    break;\n                }\n                float t = raySphereIntersect(r0, rd, getSphere(i));\n                if (t >= 0.0) {\n                    sample = vec4(0,0,0,1);\n                    break;\n                }\n            }\n        }\n        color += sample;\n    }\n\n    color /= float(SPP);\n    vec4 last = texture2D(uLastFrame, gl_FragCoord.xy / uRes);\n    gl_FragColor = color/uIteration + last * (uIteration - 1.0)/uIteration;\n}\n";
            raw = raw.split('// __split__');
            program = new core.Program(gl, raw[0], raw[1]);

            // Initialize viewport.
            gl.viewport(0, 0, resolution, resolution);

            // Initialize geometry.
            var position = [
                -1, -1, 0,
                 1, -1, 0,
                 1,  1, 0,
                -1, -1, 0,
                 1,  1, 0,
                -1,  1, 0
            ];

            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };

            attribs.aPosition.buffer.set(new Float32Array(position));

            var count = position.length / 9;

            // Create the renderable.
            self.renderable = new core.Renderable(gl, program, attribs, count);
        }

        self.clear = function() {
            iteration = 1;
        }

        self.clearSpheres = function() {
            spheres = [];
            spheresDirty = true;
        }

        // Add a sphere.
        self.addSphere = function(x, y, z, r, g, b, radius) {
            spheres.push.apply(spheres, [x, y, z, r, g, b, radius, 0.0]);
            spheresDirty = true;
        }

        function genSphereDataTexture() {
            if (!spheresDirty) {
                return;
            }
            var width = spheres.length/4;
            gl.activeTexture(gl.TEXTURE1);
            spheresDataTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, spheresDataTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, 1, 0, gl.RGBA, gl.FLOAT, new Float32Array(spheres));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.bindTexture(gl.TEXTURE_2D, null);
            spheresDirty = false;
        }

        self.render = function() {
            genSphereDataTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lastFrame);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, spheresDataTexture);
            program.setUniform("uLastFrame", "1i", 0);
            program.setUniform("uSphereData", "1i", 1);
            program.setUniform("uRes", "2fv", [resolution, resolution]);
            program.setUniform("uSpheresLength", "1i", spheres.length/4);
            program.setUniform("uIteration", "1f", iteration);
            program.setUniform("uRotation", "Matrix4fv", false, self.rotation);
            program.setUniform("uScale", "1f", self.scale);
            program.setUniform("uElementScale", "1f", self.elementScale);
            program.setUniform("uTranslation", "2fv", [self.translation.x, self.translation.y]);
            program.setUniform("uRand", "4fv", [Math.random(), Math.random(), Math.random(), Math.random()]);
            self.renderable.render();
            if (iteration < 64) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, lastFrame);
                gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, resolution, resolution, 0)
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            iteration++;
            return canvas;
        }

        self.initialize();

}

},{"gl-matrix":"/home/rye/Dropbox/src/speck/node_modules/gl-matrix/dist/gl-matrix.js","webgl.js":"/home/rye/Dropbox/src/speck/node_modules/webgl.js/src/index.js"}],"/home/rye/Dropbox/src/speck/src/xyz.js":[function(require,module,exports){
module.exports = function(data) {
    var lines = data.split('\n');
    var natoms = parseInt(lines[0]);
    var nframes = Math.floor(lines.length/(natoms+2));
    var trajectory = []
    for(var i = 0; i < nframes; i++) {
        var atoms = [];
        for(var j = 0; j < natoms; j++) {
            var line = lines[i*(natoms+2)+j+2].split(/\s+/);
            var atom = {};
            atom.symbol = line[0];
            atom.position = [parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])];
            atoms.push(atom);
        }
        trajectory.push(atoms);
    }
    return trajectory;
}

},{}]},{},["/home/rye/Dropbox/src/speck/src/main.js"]);
