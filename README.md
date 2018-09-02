# favana-docx ![npm version](https://badge.fury.io/js/favana-docx.svg)

This module can generate Office Open XML files for Microsoft Office 2007 and later.
Also the output is a stream and file, not dependent on any output tool.
This module should work on any environment that supports Node.js 10.3.0 or later including Windows.

This module generate Word (.docx) document and stream.
## Feature : ##

- Generating Microsoft Word document (.docx file):
  - Create Word document.
  - You can add one or more paragraphs to the document and you can set the fonts, colors, alignment, etc.
  - You can add one or more table to the document and you can set the fonts,  colorFont , backgroundCell, etc.
  - Support Merge in Table.

- Generating Microsoft Word document (stream):
  - You can generate word document in the format stream.

- Generating Microsoft Word document (pdf):
  - You can generate word document in the format pdf.


## Installation : ##

 via Git:

      https://github.com/Favana/Favana-docx.git

 via npm:

      $npm i -g npm
      $npm i --save favana-docx

This module is depending on:

- @salishq/loadash
- @types/archiver
- @types/node
- loadash
- archiver
- express


## Public API : ##

   - generate word document (.docx file):
        ```js
         var docx_officegen =  require('favana-docx');

         var docx = new docx_officegen.Docx(fileName, filePath);
         docx.createTable(data);
         docx.createP();
         docx.addContentP(data, styleObject);

         var out = docx.generate();

             if(out == false){
               // your syntax
             }else{
                console.log(out)
                // OR generate file OR Stream and Pdf
             }
        ```

   - generate word document (stream):
        ```js
           var docx_officegen =  require('favana-docx');
           var express  = require('express');
           var app = express();

           var docx = new docx_officegen.Docx(fileName, filePath);
           docx.createTable(data);
           docx.createP();
           docx.addContentP(data, styleObject);

           var out = docx.generate();

              if(out == false){
                 // your syntax
              }else{
                 // create stream //
                 app.get(url, function(request, response){

                      response.writeHead(200, {
                          "Content-Type": "application/docx",
                          "Content-Disposition": "attachment; filename=filename.docx"
                      });
                      docx.CreateStream(function(data){
                            data.pipe(response);
                            data.on('finish', function(){
                                console.log('The stream has been created and the file is ready to download');
                            });
                      }); // docx.CreateStream

                 }); // app.get
                 var server = app.listen(3000, function () {
                         console.log('Listining On', server_1.address().port);
                 });
              }
        ```


