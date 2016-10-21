var express = require("express"),
	http = require("http"),
	app = express(),
	port = process.env.port || 9000,
	path = "http://localhost:8000/flowers";

app.set('view engine', 'jade');
app.set('views', 'app/src/templates');
app.use(express.static('app'));

app.use("/", (req, res, next) => {
	http.get(path, (response) => {
	  response.setEncoding('utf-8');
          if(response.statusCode == 200) {
            var complete_data = '';
     		
            response.on('data', function(data){
              complete_data += data;
     
            });
     
            response.on('end', function(){
     		  req.data = JSON.parse(complete_data);
	          next();
            });
	  	  }
	}).on('error', (error) => {
	  console.log(`Got error: ${error.message}`);
	  req.data = error;
	  next();
	});
});

app.get("/", (req, res) => {
	res.render("home", { data: req.data });
});

app.listen(port, function(err){
  if(err) console.log(err);
  else console.log('server starts at port ' + port);
});