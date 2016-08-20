module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		name: 'mealworm',

		banner: '/*!\n' +
				' * mealworm <%= pkg.version %> by Khinenw\n' +
				' * Copyright 2015-<%= grunt.template.today("yyyy") %> Khinenw\n' +
				' * Licensed under the <%= pkg.license %> license\n' +
				' */\n',

		clean: {
			dist: 'dist'
		},

		watch: {
			css: {
				files: "resources/less/*.less",
				tasks: ["dist-css"]
			},

			js: {
				files: ["resources/js/*.js", "resources/js/*.jsx"],
				tasts: ["dist-js"]
			}
		},

		less: {
			dist: {
				expand: true,
				cwd: 'resources/less',
				src: '*.less',
				dest: 'build/css',
				ext: '.css'
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24',
					'Explorer >= 9',
					'iOS >= 6',
					'Opera >= 16',
					'Safari >= 6'
				]
			},
			dist: {
				options: {
					map: true
				},
				files: [{
					expand: true,
					cwd: 'build/css',
					src: '*.css',
					dest: 'build/css'
				}]
			}
		},

		csscomb: {
			options: {
				config: 'resources/less/.csscomb.json'
			},
			dist: {
				cwd: 'build/css',
				expand: true,
				src: ['*.css'],
				dest: 'build/css'
			}
		},

		cssmin: {
			options: {
				compatibility: 'ie9',
				keepSpecialComments: '*',
				advanced: false
			},
			minify: {
				files: [{
					expand: true,
					cwd: 'build/css',
					src: '*.css',
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},

		babel: {
			options: {
				sourceMap: true,
				presets: ['react', 'es2015']
			},
			dist: {
				files: [{
					cwd: 'resources/js',
					expand: true,
					src: ['*.js', '*.jsx'],
					dest: 'build/js'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some'
			},
			dist: {
				files: [{
					cwd: 'build/js',
					expand: true,
					src: '*.js',
					dest: 'dist/js',
					ext: '.min.js'
				}]
			}
		}
	});

	grunt.registerTask('default', ['dist-css', 'dist-js']);
	grunt.registerTask('dist-css', ['less', 'autoprefixer', 'csscomb', 'cssmin']);
	grunt.registerTask('dist-js', ['babel', 'uglify']);
	grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);
	grunt.registerTask('watch-css', ['watch:css']);
	grunt.registerTask('watch-js', ['watch:js']);
};
