module.exports = function(grunt) {


    // Load required tasks
    grunt.loadNpmTasks('grunt-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // Config
    grunt.initConfig({
        pkg: '<json:package.json>',

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
            themeDir: 'bones/',
            wpTheme: '<%= dir.deploy %>wp-content/themes/<%= dir.themeDir %>'
        },


        // clean up deploy directory
        clean: {
            staging: [ '<%= dir.staging %>*' ],
            wordpress: [ '<%= dir.deploy %>*' ]
        },


        // copy files from source to deployor staging dir
        copy: {

            // static templates and webroot dir files
            staging: {
                options: { flatten: true },
                files: {
                    '<%= dir.staging %>': [
                        '<%= dir.source %><%= dir.template %>*.html',
                        '<%= dir.source %><%= dir.assets %>*'
                    ]
                }
            },

            // fonts, images
            stagingAssets: {
                files: {
                    '<%= dir.staging %><%= dir.assets %>': [
                        '<%= dir.source %><%= dir.assets %>fonts/**/*',
                        '<%= dir.source %><%= dir.assets %>images/**/*'
                    ]
                }
            },

            // wordpress & bones theme
            wordpress: {
                files: {
                    '<%= dir.deploy %>': [
                        '<%= dir.vendor %>wordpress/**/*'
                    ],
                    '<%= dir.wpTheme %>': [
                        '<%= dir.vendor %>bones/**/*'
                    ]
                }
            },

            // fonts, images
            wordpressAssets: {
                files: {
                    '<%= dir.wpTheme %>assets/': [
                        '<%= dir.source %><%= dir.assets %>fonts/**/*',
                        '<%= dir.source %><%= dir.assets %>images/**/*'
                    ]
                }
            }
        },


        // concatenate css and js files
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! banner */'
            },

            // static JS and CSS
            stagingJS: {
                src: [ '<%= dir.source %><%= dir.js %>**/*.js' ],
                dest: '<%= dir.staging %><%= dir.js %>scripts.js'
            },
            stagingCSS: {
                src: [
                    '<%= dir.vendor %>normalize-css/normalize.css',
                    '<%= compass.staging.dest %>styles.css'
                ],
                dest: '<%= compass.staging.dest %>styles.css'
            },

            // wordpress JS and CSS
            wordpressJS: {
                src: [ '<%= dir.source %><%= dir.js %>**/*.js' ],
                dest: '<%= dir.wpTheme %><%= dir.js %>scripts.js'
            },
            wordpressCSS: {
                src: [
                    '<%= dir.vendor %>normalize-css/normalize.css',
                    '<%= compass.wordpress.dest %>styles.css'
                ],
                dest: '<%= compass.wordpress.dest %>styles.css'
            }
        },


        // compile sass files
        compass: {
            staging: {
                src: '<%= dir.source %><%= dir.sass %>',
                dest: '<%= dir.staging %><%= dir.css %>',
                outputstyle: 'nested',
                linecomments: false,
                forcecompile: true,
                debugsass: false,
                images: 'dev/assets/sprites' // reicht das? oder muss hier zusätzlich auch 'assets/css-images' eingetragen sein? oder gar nur 'assets/'?
            },

            wordpress: {
                src: '<%= dir.source %><%= dir.sass %>',
                dest: '<%= dir.wpTheme %><%= dir.css %>',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true,
                debugsass: false,
                images: 'dev/assets/sprites' // reicht das? oder muss hier zusätzlich auch 'assets/css-images' eingetragen sein? oder gar nur 'assets/'?
            }
        },


        // minify css files for deployment
        mincss: {
            wordpress: {
                files: {
                    '<%= concat.wordpressCSS.dest %>': [
                        '<%= concat.wordpressCSS.src %>'
                    ]
                }
            }
        },


        // minify js files for deployment
        uglify: {
            wordpress: {
                mangle: false,
                files: {
                    '<%= concat.wordpressJS.dest %>': [
                        '<%= concat.wordpressJS.src %>'
                    ]
                }
            }
        }

    });

    // 'default' task
    grunt.registerTask('default', []);

};