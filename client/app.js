var express = require("express"),
	app = express(),
	port = process.env.port || 9000,
	middlewares = require("./middlewares");

app.set('view engine', 'jade');
app.set('views', 'app/src/templates');
app.use(express.static('app'));

app.get("/", middlewares.getFlowers, (req, res) => {
	res.render("home", { data: req.data });
});

app.listen(port, function(err){
  if(err) console.log(err);
  else console.log('server starts at port ' + port);
});