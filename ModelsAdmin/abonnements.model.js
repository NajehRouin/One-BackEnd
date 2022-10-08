const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const methode=["espece","chèque"]
const schemaAbonnement=new mongoose.Schema({
    startPeriode:{type:String},
    endPeriode:{type:String},
    methode:{type:methode}
})


const Abonnements=new mongoose.model('abonnements',schemaAbonnement)

module.exports.Abonnements=Abonnements