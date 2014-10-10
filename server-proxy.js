var express = require('express'),
        app = express(),
       http = require('http'),
     server = require('http').createServer(app),
       exec = require('child_process').exec,
       path = require('path'),
       mime = require('mime'),
         fs = require('fs'),
parseString = require('xml2js').parseString,
	 io = require('socket.io').listen(server),
      child;

server.listen(80);

app.configure(function () {
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router);
});

io.sockets.on('connection', function (socket) {
  console.log(socket.id + " connected.");


  socket.on('postCode', function(data) {
    var input = data.code;
    input = input.replace(/ /g,'+');
    console.log(input)
    var api = "http://www.nearby.org.uk/api/convert.php?key=8ea87974162b67&p=";
    var gridCode;
    var scale = data.scale;
    GLOBAL.scale = scale
    console.log(scale)
    var result = http.get ({
      host: '172.19.232.62',
      port: 8080,
      path: api + input}, function(res){
      var body = '';
      res.on('data', function(chunk) {
	body += chunk;
      });
      res.on('end', function() {
	parseString(body, function (err, result) {
	  if(result.convert.output[0].en[0].$.failed != "failed"){
	    gridCode = result.convert.output[0].gr10[0].$.gr10;
	    console.log(gridCode)
	    gridCode = gridCode.replace(/ /g,'');
	    console.log(gridCode)
	    GLOBAL.gridCode = gridCode
	    fs.exists('public/generated/GENERATED_' + gridCode + '_scale_' + scale +'.stl', function(exists) {
	      if (!exists) {
		child = exec('cd python; python2 webstlwrite.py ' + gridCode + ' ' + scale, function(error, stdout, stderr) {
		  socket.emit('generated',{'fileName' : gridCode, 'scale': scale});
		  return;
		});
	      } else {
		socket.emit('generated',{'fileName' : gridCode, 'scale': scale});
	      }
	    });
	  } else {
	    socket.emit('invalid',{'invalid': true});
	  }
	});
      });
    }).on('error', function(e) {
      console.log("Got error: ", e);
    });

    });

    socket.on('disconnect', function() {
      console.log(socket.id + " disconnected.");
    });
});

app.get('/preview', function(req, res) {
  var file = 'generated/' + req.param('id') + '.stl';
  console.log(req.param('id'))
  res.sendfile("public/preview.html");
});

app.get('/download', function(req, res) {
  var file = 'public/generated/' + req.param('id') + '.stl';
  fs.exists(file, function(exists) {
    if(exists){
      var filename = path.basename(file);
      var mimetype = mime.lookup(file);

      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype);

      var filestream = fs.createReadStream(file);
      filestream.pipe(res);
    } else {
      res.redirect('/');
    }
  })
});

