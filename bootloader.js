/**
* Modules dependencies.
*/
var fs       = require('fs');
var path     = require('path');
var express  = require('express');
var url      = require('url');
//var engine   = require('ejs-locals');

/**
* Application loader
*/
(function () {

	/**
	 * Constructor.
	 * @param {express} app.
	 */
	function Bootloader(app) {
		this.loadApi(app);
	}



	/**
	 * load module api controller s
	 * @param  {express} app
	 */
	Bootloader.prototype.loadApi = function (app) {
		var apiFolder = __dirname + '/backend/api/';
		loadControllerFromFolder(apiFolder, app);
	};

	/**
	 * Dynamically load controller from folder.
	 * @param  {String} folderpath
	 * @param  {express} app
	 */
	var loadControllerFromFolder = function(folderpath, app) {
        var self = this;
		fs.readdir(folderpath, function (err, files) {
			if (err) { throw err; }
			files.forEach(function (file) {
				if (path.extname(file) === '.js') {

					var Controller = require(folderpath + file);
					var controller = new Controller(app);

				}
			});
		});
	};

	module.exports = Bootloader;
})();