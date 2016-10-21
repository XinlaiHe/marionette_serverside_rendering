var path = require("path");

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['./app/src/main.js', './app/src/collections/*', './app/src/models/*', './app/src/views/*', 'app.js'],
            options: {
                globals: {
                    jQuery: true,
                },
                esversion: 6,
            },
        },

        webpack: {
            options: {
                // configuration for all builds
            },
            build: {
                // configuration for this build
                entry: "./app/src/main.js",
                output: {
                    path: path.resolve(__dirname, "./app/dist"),
                    filename: "app.bundle.js"
                },
                module: {
                    loaders: [
                      {
                        test: /\.js?$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel',
                        query: {
                          presets: ['es2015']
                        }
                      }
                    ]
                  }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '8080'
                    },
                    // omit this property if you aren't serving HTML files and
                    // don't want to open a browser tab on start
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                          // Delay before server listens on port
                          setTimeout(function() {
                            require('open')('http://localhost:' + (process.env.port || 9000));
                          }, 1000);
                        });
                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                          // Delay before server listens on port
                          setTimeout(function() {
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                          }, 1000);
                        });
                    }
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>', './app/src/templates/*', './app/src/styles/*'],
            tasks: ['jshint', 'webpack:build', 'uglify', 'compass', 'cssmin'],
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        compass: {
            development: {
                options: {
                    sassDir: './app/src/styles',
                    cssDir: './app/dist',
                    outputStyle: 'compressed'
                }
            }
        },
        uglify: {
            dist: {
                 files: {
                      './app/dist/app.min.js': ['./app/dist/app.bundle.js']
             }
            }
        },
        cssmin: {
            css:{
                src: 'dest/css/app.bundle.css',
                dest: 'dest/css/app.min.css'
            }
        },    
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['jshint', 'webpack:build', 'uglify', 'compass', 'cssmin', 'concurrent:dev']);

};