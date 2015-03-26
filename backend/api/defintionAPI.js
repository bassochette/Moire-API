function DefinitionAPI(app) {
    this.routes(app);
}

DefinitionAPI.prototype.routes = function (app) {

    app.all('/', this.undef)


}

DefinitionAPI.prototype.presentation = function(request, response){

    var presentation = {
        "Bonjour" : "Je suis l'api Moire.",
        "Routes" : {
            'utilisateur' : "REST",
            'oeuvre' : 'REST',
            'dossierOeuvre' : 'Rest',
            'image' : 'REST',
            'search' : 'Work in progress',
            'champs' : 'REST'
        },
        "Olympe" : {
            "Moire" : "museion.io",
            "Zeus" : "museion.io",
            "Ephaïstos" : "museion.io",
            "Hades" : "museion.io",
            "Hermes" : "museion.io"
        }
    };

    response.send(200, JSON.stringify(presentation));
}


DefinitionAPI.prototype.undef = function () {
    return {"message": "route en chantier..."}
}
