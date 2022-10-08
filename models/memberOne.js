const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberOneSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom:{
            type:String,
           
           
    },
    email:{
        type:String,
        required:true
       
},
numeroTel:{
    type:String,
 
   
},
domaine:{
    type:String,
    
   
},
type_Entreprise:{
    type:String,
 
   
},
adresse:{type:String},
password:{
    type:String,
  
   
},
retapper_mdp:{
    type:String,
 
   
},

    profileImg: {
        type: String,
       
    },
    score:{
        type:Number,
        default:0
    },
    remise:{
        type:Number
    },
    nbTransaction:{
        type:Number,
        default:0
    },

    rating:
        { type : Array , default : [] },
    

    statut :{ type:Boolean,
        default :false,
        },

},


{
    collection: 'members'
})

module.exports = mongoose.model('memberOne', memberOneSchema)