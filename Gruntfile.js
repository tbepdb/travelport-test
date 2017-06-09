'use strict';
module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.initConfig({
    eslint: {
      server: {
        options: {
          jshintrc: 'server/.eslintrc'
        },
        files: {
          src: ['server/**/*.js']
        }
      },
      client: {
        options: {
          jshintrc: 'client/.eslintrc'
        },
        files: {
          src: ['client/**/*.js']
        }
      }
    }
  });
  grunt.registerTask('default', ['eslint']);
};
