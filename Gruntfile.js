module.exports = function (grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        connect: {
          options: {
            port: 9000,
            hostname: 'localhost',
            livereload: 35729
          },
          dev: {
            options: {
              open: true,
              middleware: function (connect) {
                return [
                  connect().use('/bower_components', connect.static('./bower_components')),
                  connect.static('./dev/public')
                ];
              }
            }
          }
        },
        wiredep: {
            task: {
                devDependencies: true,
                src: ['./dev/public/index.html']
            }
        },
        // replaced by connect task
        express: {
            dev: {
              options: {
                script: 'dev/server.js'
              }
            },
            dist: {
              options: {
                script: 'dev/dist.js',
                node_env: 'production'
              }
            },
            test: {
              options: {
                script: 'path/to/test/server.js'
              }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dev/public/includes/main.css': 'dev/public/includes/main.scss'
                }
            }
        },
        watch: {
            // bower: {
            //     files: ['bower.json'],
            //     tasks: ['wiredep']
            // },
            // express: {
            //     files: ['*|)}>#*.js', '*|)}>#*.html', '*|)}>#*.css'],
            //     tasks: ['express:dev'],
            //     options: {
            //         livereload: true
            //     }
            // },
          livereload: {
            options: {
              livereload: '<%= connect.options.livereload %>'
            },
            files: [
              'dev/public/{,*/}*.{html,js}'
            ]
          },
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass:dev']
            },
        },
    });


    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-wiredep');


    //grunt.registerTask('server', ['express:dev', 'watch']);
    grunt.registerTask('serve', 'Starting Web Server', function () {
      grunt.task.run([
        // 'wiredep',
        'connect',
        'watch'
      ]);
    });
    grunt.registerTask('dist', ['express:dist', 'watch']);
};
