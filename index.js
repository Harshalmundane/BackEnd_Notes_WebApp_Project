// nodes vs express
// node is the main thing but Express ke code se hum server ka code likh sakate he 
// what is express js= package,routing 
// why express =http is diffficult to use express makes this easier
// routing =routes bananae ke process ko routing kah

// const express=require(`express`);
// const app=express();

// app.get('/',function(req,res){
//   res.send("hellow world");
// })

// app.get('/profile',function(req,res){
//   res.send("hellow from profile world");
// })
// app.listen(3000);

// fundametal of javascript
// arrays and object
// function return
// async js coding
// for each map filter fiind in index

//var arr=[1,2,3,4];

// var ans=arr.map(function(val){
//   return val*3;
// })

// console.log(ans);

// var arr = [1, 2, 3, 4,5,6,6];
// var ans=arr.filter(function (val) {
//   if (val > 3) {
//     return true;
//   }
// })
// console.log(ans);

// var arr=[1,2,3,4];
//  var find=arr.find(function(val){
//   if(val==2) return val;
//  })

//  ""console.log(find);

// var obj = {
//   name:"harsh",
//   age:23
// }

// Object.freeze(obj);

// Node js basic 
// js se backed nahi ban sakta kuki js ke pas o functionality nahi hai jinse backend banta hai
// ryan dahl isne socha js se backed banna chahiye
// google chrome ka v8 code open source hai and ryan dahl us code mein update kar tha ahe
// kyuki chrome ka v8 engine bana hai c++ he
// fir usne socha ki humai to js main code karna he

// node js is js runtime enviroment


// backend video 5

// Form handling ,session
// handle backend process fo form and making sure the data coming from any frontend ib,ew,templating engines we still handlie it 
//  hum log kuch bhi data frontend per browser par rakh skte hai and jab bhi aap kuchh bhi requiest
//  backend par karoge wo fe par saved data automatically backend par chala jaayega

// ex
// const express=require(`express`);
// const app=express();

// tume to bheja tha plan text per server ko mila blob which is not directly readble ab is cheej ko handle karna padega
//  ki hum us blob ko wapps se readle kare uski liye 
// app.use(express.json());
// app.use(express.urlencoded({extends:true}));

// app.get("/",function(req,res){
//   res.send("hellow good evenning")
// })
// app.listen(3000);


//  backend video 6

// ejs,dynamic routing ,initialization project

// step 1:initialization project with npm
// step 2:express install

// dynamic routing 
// how to get data from frontend to backend route


// hum log kai baar kuch route dekhate hai umein srif ek hi hissa change hata hai
// author/harsh
// author/harshita
// author/harshal
// can u seen pattern first name is some so we can not made differant differant routes for
//  all for this so that time dynamic route come in the pictures

// const fs = require('fs');

// const express = require(`express`);
// const path = require('path');
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extends: true }));
// app.use(express.static(path.join(__dirname,'public')));
// app.set('view engine', 'ejs');

// app.get("/", function (req, res) {
//   res.render("index")
// })

// app.get("/profile/:username", function (req, res) {
//   res.send("ichal raha he")
// })

// app.listen(3000, function () {
//   console.log("its runing");
// })


// backend video 7
// Define a route for the root path

// Route to create files
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to render home page with list of files
app.get("/", function (req, res) {
    fs.readdir(path.join(__dirname, 'files'), function (err, files) {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading directory.");
        }
        res.render("index", { files: files });
    });
});

// Route to read and display content of a file
app.get("/files/:filename", function (req, res) {
    const filePath = path.join(__dirname, 'files', req.params.filename);
    fs.readFile(filePath, "utf-8", function (err, filedata) {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file.");
        }
        res.render('show', { filename: req.params.filename, filedata: filedata });
    });
});

// Route to create a new file
app.post("/create", function (req, res) {
    const fileName = `file_${req.body.title.split(' ').join('')}.txt`;
    const filePath = path.join(__dirname, 'files', fileName);

    fs.mkdir(path.join(__dirname, 'files'), { recursive: true }, (err) => {
        if (err) {
            console.error("Error creating directory:", err);
            return res.status(500).send("Error creating directory.");
        }

        fs.writeFile(filePath, req.body.details, function (err) {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error writing file.");
            }
            res.redirect("/");
        });
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//we are making notes taking web app
