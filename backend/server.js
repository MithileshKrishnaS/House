const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var port = process.env.PORT||8081;
var mysql = require('mysql');
app.use(express.static('public'));  
const Sequelize = require('sequelize'); 
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

const sequelize =   new Sequelize('house','root','manager,',{
    dialect:'mysql',
    host:'localhost'
})

const House = sequelize.define("house",{
    houseId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    houseNo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    type:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync()
    .then((result)=>{
        console.log('synced')
    })
    .catch((err)=>{
        console.log(err)
    })

app.get("/",(req,res)=>{
    // create table
    // let sql='CREATE TABLE house (houseId INT NOT NULL,houseNo varchar(255),type varchar(255),status varchar(255),PRIMARY KEY (houseId));';
    // con.query(sql,(err,result)=>{
    //     if (err) throw err
    //     console.log('displayed');
    // })
    res.send('server running');
})

function gethouse(req,res){
    House.findAll().then(result => {  
        console.log(result)     
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
}

//insert
app.post('/saveHouse', function(req, res){
    var data=req.body;
    data.houseId=Number(data.houseId);
    console.log('data');
    House.create({ 
    houseId:data.houseId,
    houseNo:data.houseNo,
    type:data.type,
    status:data.status
    }).then(result => {       
        gethouse(req,res)
    })
});

//display
app.get('/getAllHouse', function(req, res){
    House.findAll().then(result => {       
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});

//display by id
app.get('/getHouse/:id', function(req, res){
    House.findAll({where:{houseId:req.params.id}}).then(result => {       
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});

//display by type
app.get('/getByType/:type', function(req, res){
    House.findAll({where:{type:req.params.type}}).then(result => {       
        res.send(result)
    }).catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});

//delete by id
app.post('/deleteHouse/:id', function(req, res){
    House.destroy({where:{houseId:req.params.id}})
    .then(result => {gethouse(req,res)})
    .catch(function (err) {
        console.log("create failed with error: " + err );
        return 0;
    });
});
