const express = require('express');
const router = express.Router();
const {Bureaux}=require('../ModelsAdmin/bureaux.model')

router.post('/new', async (req, res) => {
    try {
        const bureau = req.body
        const search = await Bureaux.findOne({
            name: bureau.name
        })
        if (search) return res.status(400).send({
            msg: "this bureau is already exist"
        })
        const bureauAdd = new Bureaux(bureau)
        const bureauAdded = await bureauAdd.save()

        return res.status(200).send({
            msg: "bureau added",
            bureau: bureauAdded
        })

    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})

router.get('/all', async (req, res) => {
    try {

        const searchbureau = await Bureaux.find()
        return res.status(200).send({
            bureau: searchbureau
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
        const bureau =req.body
        const updatebureau=await Bureaux.findByIdAndUpdate(id,bureau)
        return res.status(200).send({msg:"bureau updated",bureaus:updatebureau})

   } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.delete('/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const deletebureau=await Bureaux.findByIdAndDelete(id)
        return res.status(200).send({msg:"bureau deleted",bureaus:deletebureau})

   } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})

module.exports=router