const mongoose=require ('mongoose'); 

const schemaBureau=new mongoose.Schema({
    nom:{type:String},
    adresse:{type:String}
})

const Bureaux=new mongoose.model('bureaux',schemaBureau)

module.exports.Bureaux=Bureaux