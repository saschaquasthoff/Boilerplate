module.exports = function(grunt) {


    // Load required tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');


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
        }

    });

    // 'default' task
    grunt.registerTask('default', []);

};