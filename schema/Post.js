const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:"",
    },
    description:{
        type:String,
        required : true,
        default:"",
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('Posts',PostSchema);