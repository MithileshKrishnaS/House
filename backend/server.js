const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var port = process.env.PORT||8081;
var mysql = require('mysql');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )
app.listen(port, () => console.log(`listening on port ${port}!`));
app.all("*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
app.use(cors(
    {
        origin: "*",
    }
))

var con = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6469791",
    password: "7HNQyWi9n8",
    database:"sql6469791"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/",(req,res)=>{
    // create table
    // let sql='CREATE TABLE house (houseId INT NOT NULL,houseNo varchar(255),type varchar(255),status varchar(255),PRIMARY KEY (houseId));';
    // con.query(sql,(err,result)=>{
    //     if (err) throw err
    //     console.log('displayed');
    // })
    res.send('server running');
})

//insert
app.post('/saveHouse', function(req, res){
    var data=req.body;
    console.log(data)
    data.houseId=Number(data.houseId);
    console.log(data);
    let sql='INSERT INTO house SET ?';
    con.query(sql,data,(err,result)=>{
        if (err) throw err
        res.send("data added")
    })
});

//display
app.get('/getAllHouse', function(req, res){
    let sql='SELECT * FROM house';
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('displayed');
        res.json(result)
    })
});

//display by id
app.get('/getHouse/:id', function(req, res){
    let sql=`SELECT * FROM house WHERE houseId = ${req.params.id}`;
    con.query(sql,(err,result)=>{ 
        if (err) throw err
        console.log('displayed');
        res.send(result)
    })
});

//display by type
app.get('/getByType/:type', function(req, res){
    console.log(req.params.type)
    let sql="SELECT * FROM house WHERE type LIKE '%"+req.params.type[0]+"%'";
    con.query(sql,(err,result)=>{ 
        if (err) throw err
        console.log('displayed');
        res.send(result)
    })
});

//delete by id
app.post('/deleteHouse/:id', function(req, res){
    let sql=`DELETE FROM house WHERE houseId = ${req.params.id}`;
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('deleted');
        res.send(result)
    })
});
