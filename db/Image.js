const {sequelize, Sequelize}=require("./config")

module.exports=(sequelize, Sequelize)=>{
    const Image=sequelize.define("Image",{
        data:{
            type:Sequelize.BLOB("long"),
            allownull:false
        }

    });
    return Image;
}