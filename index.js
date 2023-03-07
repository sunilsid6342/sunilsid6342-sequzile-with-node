const express = require("express");
const app = express()
const cors = require("cors")
const bodyparser = require('body-parser')
const path = require('path');
const db = require("./db/config")
const { Op } = require("sequelize")
const fs = require('fs');

const User = db.users
const Image=db.Image
app.use(express.json())
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
db.sequelize.sync();



app.post("/imageupload",(req,resp)=>{
    console.log(req.files)
    // var imageData = fs.readFileSync(req.file);
    // Image.create({
        
    //     data: imageData
    // }).then(image => {
    //     try{
    //         fs.writeFileSync('/path/to/file', image.data);				
    //     }catch(e){
    //         console.log(e);
    //     }
    // })

    console.log();
});

app.post("/", async (req, resp) => {
    User.create(req.body).then(data => {
        resp.send(data)
    }).catch(err => {
        console.log(err);
    })
    console.log("Data Saved")
});

app.get("/getlist", async (req, resp) => {
    User.findAll().then(data => {
        resp.send(data)
    }).catch(err => {
        console.log(err)
    })
});

app.get("/getlist/:id", async (req, resp) => {
    console.log(req.params.id)
    const ids = req.params.id
    await User.findAll({
        where: {
            [Op.or]: [
                { name: {[Op.like]:"%"+ids+"%"} },
                { email: {[Op.like]:"%"+ids+"%"} },
                { age: {[Op.like]:"%"+ids+"%"} }
            ]
        }
    }).then(data => {
        resp.send(data)
    }).finally(data=>{
        resp.send({msg:"Result not found"})
    }).catch(err => {
        resp.send(err)
    })
});

app.delete("/getlist/:id", async (req, resp) => {
    User.destroy({ where: { id: req.params.id } }).then(data => {
        resp.send(data)
    }).catch(err => {
        console.log(err)
    })
});


app.listen(5000)