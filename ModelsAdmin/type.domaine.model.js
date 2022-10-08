const mongoose=require ('mongoose'); 
const{Schema}=require('mongoose');

const typeSchema=new mongoose.Schema({
    nom:{type:String},
    domaines:[{type:Schema.Types.ObjectId,ref:'domaines'}]

});

const Types=new mongoose.model('types',typeSchema);

const domaineSchema=new mongoose.Schema({
    nom:{type:String}
});

const Domaines=new mongoose.model('domaines',domaineSchema);

module.exports.Types=Types
module.exports.Domaines=Domaines