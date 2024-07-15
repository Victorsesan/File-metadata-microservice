var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//This is a project url which has a form where you upload a file it returns a json object which gives details or specify the file name, type, and size . We will be working most importantly on the size, to make our app url to return the exact file size//

//My solution 1

//#1 Create a FormData object in url which includes an option for file upload

//- Installing and seting up a Multer
//To handle file uploading we need to use a Multer(Can find in docs in npm webpage , search "Multer")

//-To install open your  terminal and write "npm install multer"
//-Optional in your terminal write the command "refresh" to see and make sure it has been included in your files
//- Check the file package.json to see your installed Multer

//- Next inorder to use Multer in our code we have to require it(This goes for any dependencies you install in your json while building your app)

//let multer = require('multer')/*Multer is written as a string :) */

//#1.1 setting up the file updload POST route
//- This is to create/setup the POST button in our app url and instruct what it should do when a user uploads and post

//- In our json files, if we go to views and click on index.html we will see a form data which we are to work with
//- From the form enctype , our form enctype is formed or coded as

//- <form enctype= "multipart/form-data" method= "POST" action= "/api/fileanalyse">

//- As shown above our multipart will represent our api when executed and our "form-data" which is the most important represents what the user has posted in our app url
//- The action now to be exectued will b after the user has clicked on POST button in our app url which will be directed to /api/fileanalyse our main route

//- From the form enctype the method to be able to read the file is POST and this action will be directed to "/api/fileanalyse"
//- From the form enctype we can also see the type section which tells our url what type of doc to be inputed in our form as type="file"
//- From the form enctype we also see a type section "submit" which tells our url how an uploaded "file" should go through and be excecuted as type="submit"
//- type="file" has a value of, value="upfile"  (which is the action carried out if file is true)
//- type="submit" has a value of, value="Upload"  (which is the action carried out if submit is true)

//- When setting up your post route , these should be taken into consideration , most especialy the action route 

//Creating our first argument whic is a post route from our action route in index.html "/api/fileanalyse"

//app.post('/api/fileanalyse' , multer().single('upfile'), (req, res) => {
    //console.log(request.file)/* upload a picture for testing*/

    //- In the above argument after getting our app route we run a multer middleware function  by calling multer({}) 
    //- Inside we can give it a function to direct 
    //where the uploded files to be stored to 
    //another function to control the specific file type to be uploaded
    //another to control the specific amount of files to be uploaded
    //another to save the full directory or path the file was uploaded from rather than just the file name
    //Read more about multer functions in npm website

    //- But in this case we dont actually want to save the uploaded file , we just want it to show its details and file size so we leave our multer function empty multer({})
    //- We also want just a single file to have its details so we use the .single method
    //- If we look again at the form index we can see the input with the type of file our upload button excutes is calle "upfile" , this is a universal name to describe any file type which will be uploaded in our upload form
    //- So we have multer upload a single file type "upfile" as multer().single('upfile') which will then be directed to our next index field called file to display its properties
    //- *Optional Next we write our own middleware function to take a req , res and console log for testing and upload a file in our url, this will give the file details in the terminal
    //- Next create a response object to now have the details in your app url 

//#2 When a files is uploaded return details of the file type name and size in our app url

    //let responseObject = {}
   // responseObject['name'] = request.file.originalname
    //responseObject['type'] = request.file.mimetype
    //responseObject['size'] = request.file.size

    //response.json({})
//})

//Can add some styling on your page if you want :)

// optional solutionn 2 

var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', multer().single('upfile'), (request, response) => {
  let responseObject = {};
  responseObject['name'] = request.file.originalname;
  responseObject['type'] = request.file.mimetype;
  responseObject['size'] = request.file.size;
  
  response.json(responseObject);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
