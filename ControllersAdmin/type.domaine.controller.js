const express = require('express');
const router = express.Router();
const {Domaines,Types}=require('../ModelsAdmin/type.domaine.model')


router.post('/type/new', async (req, res) => {
    try {
        const type = req.body
        const search = await Types.findOne({
            nom: type.nom
        })
        if (search) return res.status(400).send({
            msg: "this type is already exist"
        })
        const typeAdd = new Types(type)
        const typeAdded = await typeAdd.save()

        return res.status(200).send({
            msg: "type added",
            types: typeAdded
        })

    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})

router.get('/type/all', async (req, res) => {
    try {

        const search = await Types.find().populate('domaines')
        return res.status(200).send({
            types: search
        })
    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.put('/type/update/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const type =req.body
        const updateType=await Types.findByIdAndUpdate(id,type).populate('domaines')
        return res.status(200).send({msg:"type updated",types:updateType})

   } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.delete('/type/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const deleteType= await Types.findByIdAndDelete(id)
        return res.status(200).send({msg:"type deleted",types:deleteType})

   } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})





router.post('/domaine/new', async (req, res) => {
    try {
        const domaine = req.body
        
        const searchDomaine = await Domaines.findOne({
            nom: domaine.nom
        })
        if (searchDomaine) return res.status(400).send({
            msg: "this domaine is already exist"
        })
        const domaineAdd = new Domaines(domaine)
        
        const domaineAdded = await domaineAdd.save()

        return res.status(200).send({
            msg: "domaine added",
            domaines: domaineAdded
        })

    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})

router.get('/domaine/all', async (req, res) => {
    try {

        const searchDomaines = await Domaines.find()
        return res.status(200).send({
            domaines: searchDomaines
        })
    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.put('/domaine/update/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const domaine =req.body
        const updateDomaine=await Domaines.findByIdAndUpdate(id,domaine)
        return res.status(200).send({msg:"domaine updated",domaines:updateDomaine})

   } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.delete('/domaine/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const deleteDomaine=await Domaines.findByIdAndDelete(id)
        return res.status(200).send({msg:"domaine deleted",domaines:deleteDomaine})

   } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})

module.exports=router