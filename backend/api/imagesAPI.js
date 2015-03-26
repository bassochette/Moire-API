/**
 * Module dependencies.
 */
var ImagesDAL = require('../dal/imagesDAL');
var MembershipFilters = require('../../middleware/membershipFilters');
//var Formidable = require('formidable'),
var util = require('util');

/**
 * oeuvreController class
 */
(function () {

    /**
     * Attributes.
     */
    var imagesDAL = new ImagesDAL();
    var filters = new MembershipFilters();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function ImagesAPI(app) {
        this.routes(app);
    }


    ImagesAPI.prototype.routes = function (app) {

        app.get("/images/", this.undef); //TODO
        app.get("/images/oeuvre/:oeuvreId", this.getInfoByOeuvre);
        app.get("/images/detail/:imageId", this.getInfo);
        app.get("/images/:oeuvreId/:digest", this.image);

        app.post("/images", this.upload);
        app.put("/images", this.undef); //TODO
        app.delete("/images", this.undef); // TODO this.remove est une methode GET pour le moment

    };

    ImagesAPI.prototype.undef = function () {
        return {"message": "route en chantier..."};
    };

    ImagesAPI.prototype.image = function (req, res) {
        var oeuvreId = req.params.oeuvreId;
        var digest = req.params.digest;

        console.log("[iamgesAPI][image] requested " + oeuvreId + "/" + digest);

        imagesDAL.getBinaryByDigest(oeuvreId, digest, function (info, binary) {
            res.writeHead(200, {mimeType: info.type});
            res.end(binary);
        });


    };

    ImagesAPI.prototype.getInfo = function (req, res) {
        // get path from dal
        imagesDAL.getImageInfo(req.params.oeuvreId, function (image) {
            //res.writeHead(200, { contentType: "application/json"});
            res.send(image);
            res.end();
        });

    }

    ImagesAPI.prototype.getInfoByOeuvre = function (req, res) {
        imagesDAL.getAllImageInfoByOeuvre(req.params.oeuvreId, function (images) {
            //res.writeHead(200, { contentType: "application/json"});
            res.send(images);
            //res.end();
        });
    };

    ImagesAPI.prototype.upload = function (req, res) {

        //console.log("Une image messire!");
        // console.log("[imagesAPI][upload]"+util.inspect(req.body));
        var image = req.files.imagesUpload;
        image.oeuvreId = req.body.oeuvreId;

        imagesDAL.saveImage(image, function (img) {
            if (img.message) {
                console.log('[imagesAPI][svg]' + img.message);
            }
            //res.writeHead(200, { contentType: "application/json"});
            res.end(img);
        });

    }

    ImagesAPI.prototype.remove = function (req, res) {
        var imgId = req.params.id;

        console.log('[API]request to remove image ' + imgId);
        imagesDAL.delete(imgId, function (data) {
            if (data) {
                console.log("[API]Erreur suppression image " + data.message);
            } else {
                console.log("[API]Image " + imgId + " deleted.");
            }

        });

    };

    module.exports = ImagesAPI;
})();