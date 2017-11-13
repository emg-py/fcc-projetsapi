var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');


app.set('port', process.env.PORT || 3000 );
app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'API Projects';
app.locals.pageDefis = dataFile.defis;
app.locals.pageDefisStories = dataFile.defis.userstories;

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/defis'));
app.use(require('./routes/api'));

var server = app.listen(app.get('port'), function() {
  console.log("le serveur est à l'écoute sur le port " + app.get('port'));
});


//reload(app);