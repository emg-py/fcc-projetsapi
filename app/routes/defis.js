var express = require('express');
var router = express.Router();

// fonction request pour l'accès à l'api distante
var request = require('request');
var https = require('https');

var resultat;

router.get('/defis', function(requete, reponse) {
  var data = requete.app.get('appData');
  var pageDefis = data.defis;

  reponse.render('defis', {
    pageTitle: 'Défis',
    defis: pageDefis,
    pageID: 'listedefis'
  });
});

router.get('/defis/:url', function(requete, reponse) {
  var data = requete.app.get('appData');
  var pageDefis = [];
  var pageStories = [];
  var pageResultats = [];
  var pageLiensTests = [];

  data.defis.forEach(function(item) {
    if (item.url == requete.params.url) {
      pageDefis.push(item);
      pageStories.push(item.userstories);
    }
  });

  reponse.render('defis', {
    pageTitle: 'les défis',
    defis: pageDefis,
    pageID: 'listedefis'
  });
});

router.get('/defis/timestamp', function(requete, reponse) {
  var data = requete.app.get('appData');
  var pageDefis = [data.defis[0]];
  var pageStories = [data.defis[0]];

  reponse.render('timestamp', {
    pageTitle: 'les défis',
    defis: pageDefis,
    pageID: 'listedefis'
  });
});

/*
 * De nombreuses répétitions dans cette section d'affichage (render) 
 */

// interroger l'api distante si un paramètre est transmis
router.use('/defis/timestamp/:temps', function(requete, reponse, next) {
  var url = 'https://emg-py--fcc-timestamp.glitch.me/'+ requete.params.temps;
// selon : https://stackoverflow.com/questions/25183228/make-a-get-request-to-json-api-in-node-js
  request(url, function (erreur, reponse, json){
    if (!erreur && reponse.statusCode == 200) {
      status = 'succès';
      //resultat = json;
      resultat = JSON.stringify(JSON.parse(json), null, 2);
      console.log(resultat);
      next();
    } else {
      next(erreur);
    }
  })
});

// affichage de la page timestamp après interrogation de l'api distante 
router.get('/defis/timestamp/:temps', function(requete, reponse, next) {
    var data = requete.app.get('appData');
    var pageDefis = [data.defis[0]];
    var pageStories = [data.defis[0]];

    reponse.render('timestamp', {
    pageTitle: 'le défi : timestamp microservice',
    defis: pageDefis,
    pageApi: resultat,
    pageID: 'listedefis'
  });
});

/*
 * Script Request Header Parser
 */

// interroger l'api distante si un paramètre est transmis
router.use('/defis/request_header_parser/test', function(requete, reponse, next) {
// selon : https://stackoverflow.com/questions/25183228/make-a-get-request-to-json-api-in-node-js
  request('https://fcc-requestheaderparser.glitch.me', function (erreur, reponse, json){
    if (!erreur && reponse.statusCode == 200) {
      status = 'succès';
      resultat = json;
      //      resultat = JSON.stringify(json, null, 2);
      console.log(resultat);
      next();
    } else {
      next(erreur);
    }
  })
});

router.get('/defis/request_header_parser/test', function(requete, reponse, next) {
    var data = requete.app.get('appData');
    var pageDefis = [data.defis[1]];
    var pageStories = [data.defis[1]];
  
    reponse.render('requestheader', {
    pageTitle: 'le défi : request header parser microservice',
    defis: pageDefis,
    pageApi: resultat,
    pageID: 'listedefis'
  });
    console.log('2      resultat  ' + resultat);
});


// si aucune route ne peut être suivie, erreur 404
router.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});


module.exports = router;
