/**
* Module dependencies.
*/
var MembershipFilters = require('../../middleware/membershipFilters');
var DossierOeuvreDAL = require('../dal/dossierOeuvreDAL');
var ChampsDAL = require('../dal/champsDAL');
var util = require('util'); 
/**
* oeuvreController class
*/
(function () {

    /**
    * Attributes.
    */

    var filters = new MembershipFilters();
    var dossierOeuvreDAL = new DossierOeuvreDAL();
    var champsDAL = new ChampsDAL();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function DossierOeuvreAPI(app) {
        this.routes(app);
    };

    //post, del, update

    DossierOeuvreAPI.prototype.routes = function(app) {

        app.get("/dossieroeuvre/:id", this.undef); //TODO
        app.get("/dossieroeuvre/oeuvre/:oeuvreId", this.getByOeuvre);

        app.post("/dossieroeuvre", this.ajouter);
        app.put("/dossieroeuvre", this.majVal);
        app.delete("/dossieroeuvre", this.undef); //TODO

    };

    DossierOeuvreAPI.prototype.undef = function(){
        return {"message":"unhandled route"};
    };

    DossierOeuvreAPI.prototype.getByOeuvre = function(req, res){

      var oid = req.params.oeuvreId;
      dossierOeuvreDAL.getByOeuvreId(oid, function(data){
        // console.log('[DossierOeuvreAPI][getByOeuvreId][success]:'+JSON.stringify(data));
        res.send(200, JSON.stringify(data));
      });
    };

    DossierOeuvreAPI.prototype.majVal = function(req, res){

        console.log("[API] demande de mise à jour pour :"+ JSON.stringify(req.body));
        dossierOeuvreDAL.updateValById(req.body.dossierOeuvreId, {valeur: req.body.valeur}, function(data){
            res.send(200, JSON.stringify(data));
        });

    };

    DossierOeuvreAPI.prototype.ajouter = function(req, res){

        var _dossOeuvre = {};
        _dossOeuvre.champsId = req.body.champsId;
        _dossOeuvre.oeuvreId = req.body.oeuvreId;
        _dossOeuvre.valeur = req.body.valeur;

        dossierOeuvreDAL.save(_dossOeuvre, function(dossierOeuvre){
             console.log('dossierOeuvre : '+JSON.stringify(dossierOeuvre));
            if(!dossierOeuvre.message){
                champsDAL.get(dossierOeuvre.champsId, function(champs){
                    console.log('champs :'+JSON.stringify(champs));
                    
                    _dossOeuvre.id = dossierOeuvre.id;
                    _dossOeuvre.champsId = champs.id;
                    _dossOeuvre.nom = champs.nom;
                    _dossOeuvre.type = champs.type;

                    console.log('[API] sending '+JSON.stringify(_dossOeuvre));
                    res.send(_dossOeuvre);
                        
                });
            } else {
                res.send(500, JSON.stringify(dossierOeuvre));
            }
        });

    };

    module.exports = DossierOeuvreAPI;
})();