var http = require("http"),
	path = "http://localhost:8000/flowers";

exports.getFlowers = function(req, res, next) {
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
}
