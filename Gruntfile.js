module.exports = function(grunt) {
	grunt.initConfig({
		concat : {
			options : {
				separator : "\n"
			},
			js : {
				src : [
					'js/**/*.js'
				],
				dest : 'dist/main.js'
			}
		},
		uglify : {
			js : {
				files : {
					'dist/main.min.js' : ['<%= concat.js.dest %>']
				}
			}
		},
		jshint : {
			options : {
				globals : {
					jQuery : true,
					reporter : require('jshint-stylish')
				}
			},
			js : ['<%= concat.js.src %>']
		},
		watch : {
			js : {
				files : [
					'js/**/*.js'
				],
				tasks : ['watch_js']
			}
		}
	});

	/* LOAD EXTERNAL TASKS (PLUGINS) */
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	/* TASKS */
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('watch_js', ['jshint:js', 'concat:js', 'uglify:js']);
};