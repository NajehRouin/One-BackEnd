const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Abonnements } = require('../ModelsAdmin/abonnements.model');
const {
    Users
} = require('../ModelsAdmin/users.model')

const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  var upload = multer({
    storage: storage
  });
  
router.post('/login', async (req, res) => {
    try {
        var password = req.body.password;
        var loginB = req.body.email;
        var search = await Users.findOne({
            'login': loginB
        })
        console.log(search);
        if (!search) return res.status(400).send({
            status: false,
            message: "login introuvable"
        })
        if (search.password == password) {

            const user = {
                nom: search.nom,
                email: search.email,
                numeroTel: search.numeroTel,
                domaine: search.domaine,
                type_Entreprise: search.type_Entreprise,
                Adresse: search.Adresse,
                profileImg: search.profileImg,
                abonnement: search.abonnement
            }

            const token = jwt.sign({
                user: user
            }, process.env.keyCrypt);
            res.json({
                token: token
            });
            return res.status(200).send({
                status: true,
                message: "authentification avec succés",
                token: token
            })
        } else {
            return res.status(400).send({
                status: false,
                message: "password incorrect"
            })
        }
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: error
        })
    }
})



router.post('/new',upload.single('image'), async (req, res) => {
    try {


       console.log(req.body.user)
       let file=req.file
       console.log(file.originalname)
       let data=JSON.parse(req.body.user)
       
        const searchUser = await Users.findOne({
            email: data.email
        })
        if (searchUser) return res.status(400).send({
            msg: "this user is already exist"
        })

        
        
        const payement={
            startPeriode:data.startPeriode,
            endPeriode:data.endPeriode,
            methode:data.methode
        }
        const addPayement =new Abonnements(payement)
        const abonnement=await addPayement.save()
        const user = {
            nom: data.nom,
            email:data.email,
            numeroTel:data.numeroTel,
            domaine:data.domaine ,
            type_Entreprise:data.type_Entreprise,
            adresse: data.adresse,
            password:data.password,
            profileImg:"http://localhost:4000/public/"+file.originalname,
            score:data.score,
            remise:data.remise,
            nbTransaction:data.nbTransaction,
            statut:data.statut,
            rating:data.rating,
            role:data.role,
            abonnement:abonnement._id
        }
        const userAdd = new Users(user)
        const userAdded = await userAdd.save()

        return res.status(200).send({
            msg: "user added",
            users: userAdded
        })

    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.get('/all', async (req, res) => {
    try {

        const searchUsers = await Users.find().populate('abonnement')
        return res.status(200).send({
            users: searchUsers
        })
    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
       
        console.log(req.body.user)
       let file=req.file
       console.log(file.originalname)
       let data=JSON.parse(req.body.user)
       const profileImg=""
       const payement={
        startPeriode:data.startPeriode,
        endPeriode:data.endPeriode,
        methode:data.methode
    }
    if(file.originalname){
        profileImg="http://localhost:4000/public/"+file.originalname
    }else{
        profileImg=data.profileImg
    }
    
    const abonnement=await Abonnements.findByIdAndUpdate(data.Abonnements._id,payement)
    const user = {
        nom: data.nom,
        email:data.email,
        numeroTel:data.numeroTel,
        domaine:data.domaine ,
        type_Entreprise:data.type_Entreprise,
        adresse: data.adresse,
        password:data.password,
        profileImg:profileImg,
        score:data.score,
        remise:data.remise,
        nbTransaction:data.nbTransaction,
        statut:data.statut,
        rating:data.rating,
        role:data.role,
        abonnement:abonnement._id
    }
        const updateUser = await Users.findByIdAndUpdate(id, user).populate('domaine').populate('type_Entreprise').populate('abonnement')
        return res.status(200).send({
            msg: "user updated",
            users: updateUser
        })

    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})


router.delete('delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteUser = Users.findByIdAndDelete(id)
        return res.status(200).send({
            msg: "user deleted",
            users: deleteUser
        })

    } catch (error) {
        return res.status(400).send({
            erreur: error
        })
    }
})

module.exports = router