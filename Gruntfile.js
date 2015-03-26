module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config     : require('./grunt_tasks/config'),
		clean      : require('./grunt_tasks/clean'),
		nodemon    : require('./grunt_tasks/nodemon'),
		concurrent : require('./grunt_tasks/concurrent'),

	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-nodemon');

	// Default task(s).
	grunt.registerTask('default', ['build']);
	grunt.registerTask('debug', ['nodemon']);
};