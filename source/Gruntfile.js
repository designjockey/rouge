'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    source: '.',
    dist: '../assets/css'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['<%= config.source %>/css/**/*.scss'],
          dest: 'build',
          ext: '.css'
        }]
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          "<%= config.dist %>/main.css" : "<%= config.source %>/css/index.scss"
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      styles: {
        files: ['<%= config.source %>/css/**/*.scss'],
        tasks: ['sass:dev']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('./dist'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.dist)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    }

  });

  grunt.registerTask('develop', [
    'watch'
  ]);

  grunt.registerTask('default', [

  ]);
};
