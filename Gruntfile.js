module.exports = function(grunt) {


    // Load required tasks
    grunt.loadNpmTasks('grunt-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    // Config
    grunt.initConfig({
        pkg: '<json:package.json>',


        // banner description
        meta: {
            banner: '/*!\\n' +
                ' * @project      <%= pkg.title || pkg.name %>\\n' +
                ' * @version      v<%= pkg.version %>\\n' +
                ' * @description  <%= pkg.description %>\\n' +
                ' * @date         <%= grunt.template.today("dd.mm.yyyy") %>\\n' +
                '<%= pkg.homepage ? " * @url          " + pkg.homepage + "\\n" : "" %>' +
                ' * @copyright    (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.url %>>\\n' +
                ' */'
        },


        // default directories
        dir: {
            // main dirs
            source: 'source/',
            staging: 'staging/',
            deploy: 'deploy/',
            vendor: 'vendor/',

            assets: 'assets/',
            sass: 'sass/',
            css: 'styles/',
            js: 'scripts/',
            template: 'templates/',

            // wordpress theme
            theme: 'bones/',
            wpTheme: '<%= dir.deploy %>wp-content/themes/<%= dir.theme %>'
        },


        // clean up deploy dir (grunt-contrib-clean)
        clean: {
            staging: [ '<%= dir.staging %>*' ],
            wordpress: [ '<%= dir.deploy %>*' ]
        },


        // copy files from source to deploy or staging dir (grunt-contrib-copy)
        copy: {

            // static templates and webroot dir files
            staging: {
                options: {
                    flatten: true
                },
                src: [
                    '<%= dir.source %><%= dir.template %>*.html',
                    '<%= dir.source %><%= dir.assets %>*'
                ],
                dest: '<%= dir.staging %>'
            },

            // fonts, images
            stagingAssets: {
                src: [
                    '<%= dir.source %><%= dir.assets %>fonts/**/*',
                    '<%= dir.source %><%= dir.assets %>images/**/*'
                ],
                dest: '<%= dir.staging %><%= dir.assets %>'
            },

            // vendor libraries
            stagingLibs: {
                options: {
                    flatten: true
                },
                src: [
                    '<%= dir.vendor %>jquery/jquery.js',
                    '<%= dir.vendor %>modernizr/modernizr.js',
                    '<%= dir.vendor %>selectivizr/selectivizr.js'
                ],
                dest: '<%= dir.staging %><%= dir.js %><%= dir.vendor %>'
            },

            // wordpress
            wordpress: {
                src: [
                    '<%= dir.vendor %>wordpress/**/*'
                ],
                dest: '<%= dir.deploy %>'
            },

            // wordpress theme
            wordpressTheme: {
                src: [
                    '<%= dir.vendor %><%= dir.theme %>**/*'
                ],
                dest: '<%= dir.wpTheme %>'
            },

            // fonts, images
            wordpressAssets: {
                src: [
                    '<%= dir.source %><%= dir.assets %>fonts/**/*',
                    '<%= dir.source %><%= dir.assets %>images/**/*'
                ],
                dest: '<%= dir.wpTheme %>assets/'
            },

            // vendor libraries
            wordpressLibs: {
                options: {
                    flatten: true
                },
                src: [
                    '<%= dir.vendor %>jquery/jquery.js',
                    '<%= dir.vendor %>modernizr/modernizr.js',
                    '<%= dir.vendor %>selectivizr/selectivizr.js'
                ],
                dest: '<%= dir.wpTheme %><%= dir.js %><%= dir.vendor %>'
            }
        },


        // concatenate js files (grunt-contrib-concat)
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! banner */'
            },

            // static JS
            staging: {
                src: [ '<%= dir.source %><%= dir.js %>**/*.js' ],
                dest: '<%= dir.staging %><%= dir.js %>scripts.js'
            },

            // wordpress JS
            wordpress: {
                src: [ '<%= dir.source %><%= dir.js %>**/*.js' ],
                dest: '<%= dir.wpTheme %><%= dir.js %>scripts.js'
            }
        },


        // compile sass files (grunt-compass)
        compass: {
            staging: {
                src: '<%= dir.source %><%= dir.sass %>',
                dest: '<%= dir.staging %><%= dir.css %>',
                outputstyle: 'nested',
                linecomments: true,
                forcecompile: true,
                debugsass: true,
                images: 'dev/assets/sprites' // reicht das? oder muss hier zusätzlich auch 'assets/css-images' eingetragen sein? oder gar nur 'assets/'?
            },

            wordpress: {
                src: '<%= dir.source %><%= dir.sass %>',
                dest: '<%= dir.wpTheme %><%= dir.css %>',
                outputstyle: 'nested',
                linecomments: true,
                forcecompile: true,
                debugsass: true,
                images: 'dev/assets/sprites' // reicht das? oder muss hier zusätzlich auch 'assets/css-images' eingetragen sein? oder gar nur 'assets/'?
            },

            deploy: {
                src: '<%= dir.source %><%= dir.sass %>',
                dest: '<%= dir.wpTheme %><%= dir.css %>',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true,
                debugsass: false,
                images: 'dev/assets/sprites' // reicht das? oder muss hier zusätzlich auch 'assets/css-images' eingetragen sein? oder gar nur 'assets/'?
            }
        },


        jshint: {
            // grunt: {
            //     files: {
            //         src: [
            //             'Gruntfile.js'
            //         ]
            //     },
            //     options: {
            //         predef: [
            //             "module"
            //         ]
            //     }
            // },
            staging: {
                files: {
                    src: [
                        '<%= dir.source %><%= dir.js %>**/*.js'
                    ]
                }
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },


        // minify js files for deployment (grunt-contrib-uglify)
        uglify: {
            deploy: {
                mangle: false,
                files: {
                    '<%= concat.wordpress.dest %>': [
                        '<%= concat.wordpress.src %>'
                    ]
                }
            }
        }

    });


    // 'default' task
    grunt.registerTask('default', []);


    // 'staging' task, used for working on static templates
    grunt.registerTask('staging', [
        'clean:staging',      // clean staging dir
        'copy:staging',       // copy templates
        'copy:stagingAssets', // copy assets
        'copy:stagingLibs',   // copy vendor libraries
        'compass:staging',    // compile Sass (nested with sourcemap)
        'concat:staging'      // concat JS
    ]);


    // 'wordpress' task, used for working on wordpress theme
    grunt.registerTask('wordpress', [
        'clean:wordpress',      // clean deploy dir
        'copy:wordpress',       // copy wordpress
        'copy:wordpressTheme',  // copy wordpress theme
        'copy:wordpressAssets', // copy assets
        'copy:wordpressLibs',   // copy vendor libraries
        'compass:wordpress',    // compile Sass (nested with sourcemap)
        'concat:wordpress'      // concat JS
    ]);


    // 'deploy' task, used for deploying final wordpress installation
    grunt.registerTask('deploy', [
        'clean:wordpress',      // clean deploy dir
        'copy:wordpress',       // copy wordpress
        'copy:wordpressTheme',  // copy wordpress theme
        'copy:wordpressAssets', // copy assets to staging
        'copy:wordpressLibs',   // copy vendor libraries
        'compass:deploy',       // compile Sass (compressed)
        'concat:wordpress',     // concat JS
        'uglify'                // minify JS
    ]);

};