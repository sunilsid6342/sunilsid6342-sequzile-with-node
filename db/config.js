const { Sequelize } = require('sequelize');

const sequelize=new Sequelize("newapp","root","Root",{
    host:'localhost',
    port:3306,
    dialect: 'mysql'
});

const db={}

db.Sequelize=Sequelize
db.sequelize=sequelize

db.users=require("./User")(sequelize,Sequelize)
db.Image=require("./Image")(sequelize,Sequelize)

module.exports=db;
