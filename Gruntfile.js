module.exports = function(grunt) {

    // Load required tasks
    grunt.loadNpmTasks('grunt-contrib-clean');

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
        }

    });

    // 'default' task
    grunt.registerTask('default', []);

};