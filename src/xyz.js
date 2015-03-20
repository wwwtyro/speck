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
