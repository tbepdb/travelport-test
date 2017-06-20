'use strict';
module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-babel');
  const path = require('path');

  function wrapPath (fileName) {
    return path.normalize(path.join(__dirname, 'node_modules', fileName));
  }

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        plugins: [
          // 'transform-es2015-modules-amd'
        ],
        presets: ['es2015']
      },
      dist: {
        files: [{
          'expand': true,
          'cwd': 'client/source/js',
          'src': ['**/*.js'],
          'dest': 'client/babel/build/',
          'ext': '.js'
        }]
      }
    },
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
          src: ['client/source/js/**/*.js']
        }
      }
    },
    requirejs: {
      std: {
        options: {
          dir: 'client/dist/js',
          optimize: 'uglify',
          // optimize: 'none',
          baseUrl: 'client/babel/build',
          paths: {
            async: wrapPath('/async/dist/async'),
            require: wrapPath('/requirejs/require'),
            jquery: wrapPath('/jquery/dist/jquery'),
            bootstrap: wrapPath('/bootstrap/dist/js/bootstrap'),
            'bootstrap.datepicker': wrapPath('/bootstrap-datepicker/js/bootstrap-datepicker'),
            'bootstrap.datepicker.en': wrapPath('/bootstrap-datepicker/js/locales/bootstrap-datepicker-en-CA'),
            'jquery.autocomplete': wrapPath('/devbridge-autocomplete/dist/jquery.autocomplete'),
            lodash: wrapPath('/lodash/lodash'),
            moment: wrapPath('/moment/moment'),
            parsley: wrapPath('/parsleyjs/dist/parsley'),
            objectPath: wrapPath('/object-path/index'),
          },
          shim: {
            // just example of localization
            'bootstrap.datepicker.en': {
              deps: [
                'bootstrap.datepicker'
              ]
            },
            'bootstrap.datepicker': {
              deps: [
                'bootstrap'
              ]
            },
            parsley: {
              deps: [
                'jquery'
              ]
            },
            'jquery.autocomplete': {
              deps: [
                'jquery'
              ]
            },
            bootstrap: {
              deps: [
                'jquery'
              ]
            }
          },
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      'client/dist/css/styles.css': [
        wrapPath('/bootstrap/dist/css/bootstrap.css'),
        wrapPath('/bootstrap/dist/css/bootstrap-theme.css'),

        wrapPath('/jquery-ui/themes/base/core.css'),
        wrapPath('/jquery-ui/themes/base/theme.css'),
        wrapPath('/jquery-ui/themes/base/datepicker.css'),
        wrapPath('/jquery-ui/themes/base/autocomplete.css'),
        'client/source/css/**/*.css'
      ]
    },
    copy: {
      jqueryui: {
        files: [
          // includes files within path
          {expand: true, cwd: 'node_modules/jquery-ui/themes/base', src: ['images/**'], dest: 'client/dist', }
        ],
      },
    },
  });
  grunt.registerTask('build', ['babel', 'requirejs', 'cssmin']);
  grunt.registerTask('default', ['eslint']);
};
