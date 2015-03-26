/**
* Module dependencies.
*/
var SearchDAL = require('../dal/searchDAL');
var MembershipFilters = require('../../middleware/membershipFilters');

/**
* oeuvreController class
*/
(function () {

    /**
    * Attributes.
    */
    var searchDAL = new SearchDAL();
    var filters = new MembershipFilters();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function SearchAPI(app) {
        this.routes(app);
    }


    SearchAPI.prototype.routes = function(app) {
        app.get("/search", this.undef); // TODO
    };

    SearchAPI.prototype.undef = function(){
        return {"message":"route en chantier..."};
    };


    module.exports = SearchAPI;
})();