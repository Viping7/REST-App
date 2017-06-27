var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');

var index=require('./routes/index');
var tasks=require('./routes/tasks');

//View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//Static Folder

app.use(express.static(path.join(__dirname,'/client/dist')));

//Body Parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(3000,function(){
    console.log('server connected');
});