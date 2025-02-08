const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
        
    name:{
        type:String,
        required: true,

    },
    image:{
       type:String,
       required: true
    },
    role:{
        type: String,
        required:true,
    }

})

const team = new mongoose.model("teams", teamSchema);
module.exports = team;