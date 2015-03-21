
var n = -1;
var p = 1;

module.exports = {

	position: [

		// -X
		n, n, n,
		n, n, p,
		n, p, p,
		n, n, n,
		n, p, p,
		n, p, n,

		// +X
		p, n, p,
		p, n, n,
		p, p, n,
		p, n, p,
		p, p, n,
		p, p, p,

		// -Y
		n, n, n,
		p, n, n,
		p, n, p,
		n, n, n,
		p, n, p,
		n, n, p,

		// +Y
		n, p, p,
		p, p, p,
		p, p, n,
		n, p, p,
		p, p, n,
		n, p, n,

		// -Z
		p, n, n,
		n, n, n,
		n, p, n,
		p, n, n, 
		n, p, n,
		p, p, n,

		// +Z
		n, n, p,
		p, n, p,
		p, p, p,
		n, n, p,
		p, p, p,
		n, p, p

	]

};