var express = require('express');
var router = express.Router();

router.get('/', function(requete, reponse) {
  var data = requete.app.get('appData');
  var pageDefis = data.defis;
  var pageApi = data.api;

  reponse.render('index', {
    pageTitle: 'Accueil',
    defis: pageDefis,
    api: pageApi,
    pageID: 'index'
  });
});

module.exports = router;