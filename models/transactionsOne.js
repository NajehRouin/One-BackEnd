const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema= new Schema({
    
    currentUser:
     {

        id: { type: String, required: true },
        nom: { type: String, required: true },
        email: { type: String, required: true }
    },
    User:{
        id: { type: String, required: true },
        nom: { type: String, required: true },
        email: { type: String, required: true },
        profileImg:{type:String,required:true},
        remise:{type:Number}
    },
    remise:{type:Number}

})
module.exports = mongoose.model('listeTransaction', TransactionSchema);