let express = require("express");
let mongodb = require('mongodb');
let sanitizeHTML = require('sanitize-html');

let app = express();
let db;

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3001
}
app.use(express.static('public'));

let connectionString = 'mongodb+srv://todoAppUser:xurwida31@cluster0-flrc6.mongodb.net/TodoApp?retryWrites=true&w=majority';
mongodb.connect(connectionString, {useNewUrlParser: true}, function (err, client) {
   db = client.db();
    app.listen(port);
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

function passwordProtected(req, res, next){
    res.set('WWW-Authenticate', 'Basic realm="Simple ToDo-App"');
    console.log(req.headers.authorization);
    if (req.headers.authorization == "Basic bGVhcm46amF2YXNjcmlwdA=="){
        next()
    }else{
        res.status(401).send("Authorization required")
    }
}

app.use(passwordProtected);

app.get('/', function (req,res) {
    db.collection('items').find().toArray(function (err, items) {
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo-list</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="todo-list.css">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-6 offset-3">
            <h1 class="text-center py-1 mt-3" style="font-size: 120px; font-family: Calibri,sans-serif;">To-Do App</h1>
            <form id="create-form" action="/create-item" method="POST" class="jumbotron p-3 shadow-sm">
                <div class="d-flex align-items-center">
                    <input id="create-field" name="item" autofocus autocomplete="off" type="text" class="form-control">
                    <button class="btn btn-primary m-3" style="width: 200px">Add New Item</button>
                </div>
            </form>
            <ul id="item-list" class="list-group pb-5">
              ${items.map(function (item) {
                  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                    <span class="item-text" style="font-size: 30px; font-family: Calibri,sans-serif;">${item.text}</span>
                    <div>
                        <button data-id="${item._id}" class="edit-me btn btn-sm mr-1">
                            <img src="https://image.flaticon.com/icons/svg/481/481874.svg" alt="nothing" 
                            style="width: 30px;
                                   height: 30px;
                                   display: inline-block;">
                        </button>
                        <button data-id="${item._id}" class="delete-me btn ">
                            <img src="https://image.flaticon.com/icons/svg/1214/1214428.svg" alt="nothing" 
                            style="width: 30px;
                                   height: 30px;
                                   display: inline-block;">
                        </button>
                    </div>
                </li>`
        }).join('')}
            </ul>
        </div>
    </div>
</div>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
 <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 <script src="/browser.js"></script>
</body>
</html>`)
    });

});

app.post("/create-item", function(req,res){
    let safeText = sanitizeHTML(req.body.text, {allowedTags:[], allowedAttributes:[]})
    db.collection('items').insertOne({text:safeText}, function (err, info) {
        res.json(info.ops[0])
    });
});

app.post('/update-item', function (req,res) {
    let safeText = sanitizeHTML(req.body.text, {allowedTags:[], allowedAttributes:[]})
    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)},{$set:{text:safeText}}, function () {
        res.send('Success')
    })
});

app.post("/delete-item", function (req, res) {
   db.collection('items').deleteOne({_id: new mongodb.ObjectID(req.body.id)}, function () {
        res.send("Success")
   })
});