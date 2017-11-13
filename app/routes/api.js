var express = require('express');
var router = express.Router();
var port = process.env.PORT || 3000;
var appTimestamp = '../public/js/timestamp.js';

router.get('/:param', function(requete, reponse) {
  var temps = requete.params.temps;
  reponse.json(temps);
});

router.post('/api', function(requete, reponse) {
  appTimestamp.unshift(requete.body);
  fs.writeFile('app/data/feedback.json', JSON.stringify(appTimestamp), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  reponse.json(appTimestamp);
});



module.exports = router;
