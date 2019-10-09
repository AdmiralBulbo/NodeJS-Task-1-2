module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-es2015']
            },
            dist: {
                files: {
                    'es5/classes.js': 'es6/classes.js'
                }
            }
        },
        uglify: {
            build: {
                src: 'classes.js',
                dest: 'classes.min.js'
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['babel', 'uglify']);
};