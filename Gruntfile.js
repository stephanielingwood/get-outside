/*jshint node: true*/
'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    // watch: {
    //   source: {
    //     files: ['app/**/*.sass'],
    //     tasks: ['sass'],
    //     options: {
    //       livereload: true
    //     }
    //   }
    // },

    sass: {
      dist: {
        files: {
          'app/main.css' : 'app/main.sass'
        }
      }
    },

    jshint: {
      all: ['app/**/*.js', '*.js']
    },

    jscs: {
      all: {
        src: ["app/*.js", "server.js", "test/**/*.js", '!app/bundle.js', '!test/test_bundle.js'],
        options: {
            config: ".jscsrc",
        }
      }
    },

    simplemocha: {
      src: ['test/server/*.js']
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        cwd: 'app/',
        src: ['**/*.html', '**/*.css'],
        expand: true,
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['test/client/**/*test.js'],
        dest: 'test/test_bundle.js',
        options: {
          transform : ['debowerify']
        }
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha', 'browserify:test']);
  grunt.registerTask('build:dev', ['clean:dev', 'sass', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('default', ['build:dev', 'test']);
};
