var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');

http.createServer(function(req, res) {
    //Aquí va el código
    if (req.url == '/fileupload') {
        //Recoge el fichero
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload[0].filepath;
            var newpath = './' + files.filetoupload[0].name;

            mv(oldpath, newpath, function (err) {
                if (err) {
                    throw err;
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write('File uploaded and moved!');
                    res.end();
                }
            });
        });
    } else if (req.url == '/MiguelA') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1> Pagina alterna MiguelA </h1>");
        res.write("<p>Esta es la pagina alterna en node.js de <b>Miguel A</b></p>");
        res.end();
    } else {
        //Poner el formulario o página web da igual la ruta todo pasaría aquí
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1> Prueba IAW </h1>");
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        res.end();
    }
}).listen(8080);
