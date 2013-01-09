Workflow-Schritte
=================

- Erstellung der statischen Templates
	- clean staging dir
	- copy templates
	- copy assets
	- copy vendor libraries
	- compile Sass (nested with sourcemap)
	- concat JS
	- lint (concatenated) JS (tbd)
- Erstellung des dynamischen Wordpress-Themes
	- clean deploy dir
	- copy wordpress
	- copy wordpress theme
	- copy assets
	- copy vendor libraries
	- compile Sass (nested with sourcemap)
	- concat JS
	- lint (concatenated) JS (tbd)
- Deployment des optimierten Wordpress-Themes
	- clean deploy dir
	- copy wordpress
	- copy wordpress theme
	- copy assets
	- copy vendor libraries
	- compile Sass (compressed)
	- concat JS
	- lint (concatenated) JS (tbd)
	- minify (concatenated) JS
	- lint (minified) JS (tbd)



Voraussetzungen und verwendete Tools
====================================

* [node.js & npm](http://nodejs.org)
* [Bower](http://twitter.github.com/bower/)
* [Sass](http://sass-lang.com) –  via Ruby `gem install sass`
* [Compass](http://compass-style.org) – via Ruby `gem install compass`
* Grunt.js – wird im zweiten Installationsschritt mit installiert, ebenso die folgenden Grunt-Plugins
	* [grunt-compass](https://github.com/kahlil/grunt-compass)
    * [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
    * [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
    * [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
    * [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
    * [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)



Features
========

- Installation von Vendor-Paketen (z.B. jQuery, Backbone, modernizr, etc.) mit Hilfe von [Bower](http://twitter.github.com/bower/)
- CSS-Preprocessing durch SASS oder Less
- konkatenieren und minimieren von JS-Dateien
- Unterstützung sowohl statischer Templates als auch dynamischer Wordpress-Themes

- grunt Tasks
	- Unterstützung von Sass/Less ([Plugin „grunt-compass“](https://github.com/kahlil/grunt-compass))
	- aufräumen des target dir ([Plugin „grunt-contrib-clean“](https://github.com/gruntjs/grunt-contrib-clean))
	- concatenate js files ([Plugin „grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat))
	- copy source to target dir ([Plugin „grunt-contrib-copy“](https://github.com/gruntjs/grunt-contrib-copy))
	- minify CSS ([Plugin „grunt-contrib-mincss“](https://github.com/gruntjs/grunt-contrib-mincss/))
	- minify JS ([Plugin „grunt-contrib-uglify“](https://github.com/gruntjs/grunt-contrib-uglify))





Installation
============

1. Checkout des git-Repositories von [GitHub](https://github.com/saschaquasthoff/Boilerplate.git)

		git checkout https://github.com/saschaquasthoff/Boilerplate.git

2. Installation der notwendigen node.js Plugins per

		npm install

3. Installation der Vendor-Pakete
	* Als Erstes muss hierfür die Liste der verwendeten Vendor-Pakete in der `component.json` angepasst werden. Standardmäßig sieht die Liste wie folgt aus:

			"dependencies": {
				"jquery": "latest",
				"selectivizr": "latest",
				"normalize-css": "latest",
				"modernizr": "lates"
			}

	* Anschliessend wird die Installation der Vendor-Pakete durch Twitter Bower mit dem Befehl

			bower install

		ausgeführt.




verfügbare Grunt-Tasks
======================

* **dev**
	* *clean* (up deploy directory)
	* *copy* (files to deploy directory)
	* *modernizr* (create customized modernizr lib)
	* *lint* (javascript files)
	* *concat:js* (concatenate javascript files)
	* *compass:dev* (compile sass/compass files)
	* *concat:css* (concatenate vendor styles and compiled css files)
* **test**
* **deploy**
	* *clean* (up deploy directory)
	* *copy* (files to deploy directory)
	* *modernizr* (create customized modernizr lib)
	* *lint* (javascript files)
	* *concat:js* (concatenate javascript files)
	* *min* (-ify javascript files)
	* *compass:deploy* (compile and minify sass/compass files)
	* *concat:css* (concatenate vendor styles and compiled css files)
	* *pngmin* (compress png images)
	* *jpgmin* (compress jpg images)



ToDo
====

- ImageOptim ([Plugin „grunt-imagine“](https://github.com/asciidisco/grunt-imagine))
- reload Server ([Plugin „grunt-reload“](https://github.com/webxl/grunt-reload))
- JSHint-Config in `.jshintrc` auslagern ([das ist in der aktuellen grunt-Version noch nicht implementiert, kommt aber wohl mit der nächsten Version](https://github.com/gruntjs/grunt/issues/141))

- compile HTML-Templates (built-in???)
- compile Bausteine-HTML



Ideen
=====

* Bausteine per HTML-Templating pflegen (mit Jade?) ([Plugin „grunt-jade“](https://github.com/phated/grunt-jade))
* Deploy-Task um FTP-Upload erweitern?
* JS-Dokumentation erstellen (per [Plugin „grunt-jsdoc-plugin“](https://github.com/krampstudio/grunt-jsdoc-plugin) oder per [Plugin „grunt-contrib-yuidoc“](https://github.com/gruntjs/grunt-contrib-yuidoc/))
* Validierung von HTML ([Plugin „grunt-html“](https://github.com/jzaefferer/grunt-html))
* HTML per HAML???
* dynamische Erstellung von Icon-Fonts per [grunt-webfont](https://github.com/sapegin/grunt-webfont)
* automatisches Testing von JS per Jasmine (oder ähnlichen Tools)
* JS-Concat auch per uglify, aber inkl. SourceMaps fürs Staging?
* lint CSS ([Plugin „grunt-css“](https://github.com/jzaefferer/grunt-css))
