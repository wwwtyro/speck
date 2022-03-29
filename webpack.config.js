const path = require('path'); 

module.exports = {
    mode: 'production', 
    entry: {main: './build/index.js'},
    output: {
	path: path.resolve(__dirname, 'static'),
	filename: 'bundle.js',
	publicPath: '/build/',
	libraryTarget: 'umd'
    }
}
