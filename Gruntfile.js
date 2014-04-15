// Muffin workflow

(function() {

    'use strict';

    var _ = require('underscore');

    var mountFolder = function(connect, dir) {
        return connect['static'](require('path').resolve(dir));
    };

    module.exports = function(grunt) {

        this.loadNpmTasks('grunt-contrib-jshint');
        this.loadNpmTasks('grunt-contrib-connect');
        this.loadNpmTasks('grunt-contrib-watch');
        this.loadNpmTasks('grunt-jekyll');
        this.loadNpmTasks('grunt-contrib-clean');
        this.loadNpmTasks('grunt-contrib-sass');
        this.loadNpmTasks('grunt-contrib-copy');
        this.loadNpmTasks('grunt-contrib-cssmin');
        this.loadNpmTasks('grunt-contrib-imagemin');
        this.loadNpmTasks('grunt-sftp-deploy');
        this.loadNpmTasks('grunt-premailer');
        this.loadNpmTasks('grunt-litmus');

        var APP;

        APP = {
            'js': ['Gruntfile.js'],
            'jekyll': '{*/,}{*/,}{*/,}*{html,js,png,jpg,jpeg}',
            'scss': ['scss/{*/,}*.scss'],
            'ink': ['vendors/ink/css/ink.css'],
            'img': ['img/**/*.{png,jpg,jpeg,gif,webp}']
        };

        this.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            config: grunt.file.readJSON('config.json'),

            clean: {
                dist: ['_site'],
                tmp: ['.tmp']
            },

            copy: {
                tmp: {
                    files: [{
                        expand: true,
                        dot: true,
                        cwd: '.tmp/',
                        dest: '_site/',
                        src: '*/*'
                    }]
                },
            },

            jshint: {
                options: {
                    camelcase: true,
                    curly: true,
                    eqeqeq: true,
                    eqnull: true,
                    forin: true,
                    indent: 4,
                    trailing: true,
                    undef: true,
                    browser: true,
                    devel: true,
                    node: true,
                    globals: {
                        require: true
                    }
                },
                all: APP.js
            },

            doWatch: {
                scripts: {
                    files: [APP.js],
                    tasks: ['jshint']
                },
                jekyll: {
                    files: [APP.jekyll, '!_site/' + APP.jekyll],
                    tasks: ['jekyll', 'copy']
                },
                styles: {
                    files: APP.scss,
                    tasks: ['sass', 'copy']
                },
                images: {
                    files: APP.img,
                    tasks: ['copy']
                },
                options: {
                    livereload: 35728,
                    nospawn: true
                }
            },

            connect: {
                server: {
                    options: {
                        port: 4200,
                        hostname: '*',
                        open: true,
                        middleware: function(connect) {
                            return [
                                require('connect-livereload')({
                                    port: 35728
                                }), mountFolder(connect, './_site')
                            ];
                        }
                    }
                }
            },

            jekyll: {
                dist: {
                    options: {
                        dest: '_site'
                    }
                }
            },

            sass: {
                options: {
                    style: 'compressed'
                },
                dist: {
                    files: {
                        '.tmp/css/main.css': 'scss/main.scss'
                    }
                }
            },

            cssmin: {
                dist: {
                    files: {
                        '.tmp/css/main.css': [APP.ink, '.tmp/css/main.css']
                    }
                }
            },

            imagemin: {
                dist: {
                    options: {
                        optimizationLevel: 3,
                        progressive: true
                    },
                    files: [{
                        expand: true,
                        cwd: 'img',
                        src: '**/*.{png,jpg,jpeg,gif,webp}',
                        dest: '.tmp/img'
                    }]
                }
            },

            'sftp-deploy': {
                build: {
                    auth: {
                        host: '<%= config.ftp.host %>',
                        port: '<%= config.ftp.port %>',
                        authKey: 'default'
                    },
                    src: '_site/img',
                    dest: '<%= config.ftp.dest %>'
                }
            },

            premailer: {
                dist: {
                    options: {
                        removeClasses: false,
                        preserveStyles: true
                    },
                    files: {
                        '_site/index.min.html': ['_site/index.html']
                    }
                }
            },

            litmus: {
                test: {
                    src: ['_site/index.min.html'],
                    options: {
                        encodeSpecialChars: true,
                        username: '<%= config.litmus.username %>',
                        password: '<%= config.litmus.password %>',
                        url: '<%= config.litmus.url %>',
                        clients: [
                            'appmail6',
                            'notes8',
                            'notes85',
                            'ol2003',
                            'ol2007',
                            'ol2010',
                            'ol2011',
                            'ol2013',
                            'thunderbirdlatest',
                            'android4',
                            'androidgmailapp',
                            'androidgmailnew',
                            'gmailnew',
                            'ffgmailnew',
                            'chromegmailnew',
                            'iphone5s',
                            'ipad3',
                            'ipad',
                            'ipadmini',
                            'outlookcom',
                            'ffoutlookcom',
                            'chromeoutlookcom'
                        ]
                    }
                }
            }
        });

        this.renameTask('watch', 'doWatch');

        this.registerTask('build', ['clean', 'jshint', 'jekyll', 'sass', 'cssmin', 'copy', 'clean:tmp']);
        this.registerTask('watch', ['build', 'connect', 'doWatch']);
        this.registerTask('test', ['build', 'sftp-deploy', 'premailer', 'litmus']);
        this.registerTask('upload', ['sftp-deploy']);
        this.registerTask('imagemin', ['imagemin']);

        return this.registerTask('default', 'default', function() {
            grunt.log.writeln('');
            grunt.log.writeln('Muffin Workflow');
            grunt.log.writeln('---------------');
            grunt.log.writeln('');
            grunt.log.writeln('* run "grunt --help" to get an overview of all commands.');
        });
    };

}).call(this);
