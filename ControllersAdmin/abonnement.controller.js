const express = require('express');
const router = express.Router();
const {Abonnements}=require('../ModelsAdmin/abonnements.model')

router.post('/new', async (req, res) => {
    try {
        const abonnement = req.body
        const search = await Abonnements.findOne({
            name: abonnement.name
        })
        if (search) return res.status(400).send({
            msg: "this abonnement is already exist"
        })
        const abonnementAdd = new Abonnements (abonnement)
        const abonnementAdded = await abonnementAdd.save()

        return res.status(200).send({
            msg:  "abonnement added",
         abonnement: abonnementAdded
        })

    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})

router.get('/all', async (req, res) => {
    try {

        const searchabonnement = await Abonnements.find().populate('user')
        return res.status(200).send({
         abonnement: searchabonnement
        })
    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.put('/update/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const abonnement =req.body
        const updateAbonnement=await Abonnements.findByIdAndUpdate(id ,abonnement).populate('user')
        return res.status(200).send({msg:" abonnement updated", abonnement:updateAbonnement})

   } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.delete('/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const deleteAbonnement=await Abonnements.findByIdAndDelete(id)
        return res.status(200).send({msg: "abonnement deleted" ,abonnements:deleteAbonnement})

   } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})

module.exports=router