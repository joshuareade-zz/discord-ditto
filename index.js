
// INIT
var Discordie = require("discordie");
var client = new Discordie({autoReconnect: true});

var fs = require('file-system');

var express = require('express');
var app = express();

//
// WEBPAGE
//
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



//
// DISCORD
//
client.connect({
  token: process.env.BOT_SECRET
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
  if (e.message.content == "ping")
    e.message.channel.sendMessage("pong");

  if (e.message.content == "transform bulbasaur")
  {
	e.message.channel.sendMessage("transforming...");
	client.User.setAvatar(fs.readFileSync(__dirname + "/public/dd_bulbasaur.jpg"));
  }

  if (e.message.content == "transform ditto")
  {
	e.message.channel.sendMessage("transforming...");
	client.User.setAvatar(fs.readFileSync(__dirname + "/public/dd_ditto.jpg"));
  }
});