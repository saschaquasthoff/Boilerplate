module.exports = function(grunt) {

    // Load required tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

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
        }

    });

    // 'default' task
    grunt.registerTask('default', []);

};