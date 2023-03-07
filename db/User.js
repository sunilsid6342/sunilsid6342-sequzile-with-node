const {sequelize, Sequelize}=require("./config")

module.exports=(sequelize, Sequelize)=>{
    const User=sequelize.define("User",{
        name:{
            type:Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        age:{
            type: Sequelize.INTEGER
        }

    });
    return User;
}