let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose')
    const { v4: uuidv4 } = require('uuid');
     

    router = express.Router();
    
/*const DIR = './public';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});*/

const fs = require('fs');
const path = require('path');
var storage = multer.diskStorage({
  destination: function(req , file , cb){
      cb(null , './public/')
  },
   filename:function(req,file,cb){
      cb(null,Date.now()+ '-' + file.originalname) ;
  }
})
const upload = multer({
  storage: storage,
});



let MemberOne = require('../models/memberOne');

// inscrit membre one 

/*
router.post("/register", upload.single('profileImg'), async (req, res) => {

    
    try {
     
        const url = req.protocol + '://' + req.get('host')
        const memberOne = new MemberOne({
            _id: new mongoose.Types.ObjectId(),
            nom: req.body.nom,
            email:req.body.email,
            numeroTel:req.body.numeroTel,
            domaine:req.body.domaine,
            type_Entreprise:req.body.type_Entreprise,
            password:req.body.password,
            retapper_mdp:req.body.retapper_mdp,
    
            profileImg: url + '/public/' + req.file.filename
      });
      var emailsearch=req.body.email;
      const searchUser = await MemberOne.findOne({
        email:emailsearch
      })
      if (searchUser&&(emailsearch===searchUser.email)) {
        return res.status(500).send({
          msg: "compte déja existe"
        });
      }
  
  
          
      var mdp=req.body.password;
      var r_mdp=req.body.retapper_mdp;
console.log("mot de passe",mdp);
console.log("r_mdp",r_mdp);
    
    if (mdp===r_mdp){
  
      let result = await memberOne.save();
  
      res.status(200).send({
        one: result,
        msg: "enregistrer avec succes"
      });
    }
    else{ res.status(500).json({
        message: "mot de passe et rettape mot de passe n'est pas égaux",
    });}
    } catch (error) {
      console.log(error)
      res.status(400).send("vous pouvez pas enregistrer utilisteur");
    }
  })
*/




router.post('/register', async (req, res, next) => {
    
    const memberOne = new MemberOne({
        _id: new mongoose.Types.ObjectId(),
        nom: req.body.nom,
        email:req.body.email,
        numeroTel:req.body.numeroTel,
        domaine:req.body.domaine,
        type_Entreprise:req.body.type_Entreprise,
        password:req.body.password,
        retapper_mdp:req.body.retapper_mdp,
        Adresse:req.body.Adresse,
        profileImg: req.body.profileImg,
        remise:req.body.remise
    });
    var emailsearch=req.body.email;
    console.log(''+emailsearch)
 MemberOne.findOne({
        email:emailsearch
        
      }, function (err, one) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (one && (emailsearch===one.email)) {
           
     
            res.send({err:"compte déja existe",message:one.email});
        } else {
          
            var mdp=req.body.password;
            var r_mdp=req.body.retapper_mdp;
      console.log("mot de passe",mdp);
      console.log("r_mdp",r_mdp);
    if (mdp===r_mdp){
    memberOne.save().then(
                        result => {
                        res.status(201).json({
                            message: "memberOne registered successfully!",
                            memberOneCreated: {
                                
                                _id: result._id,
                            nom: req.body.nom,
                        email:req.body.email,
                        numeroTel:req.body.numeroTel,
                        domaine:req.body.domaine,
                        type_Entreprise:req.body.type_Entreprise,
                        mot_de_Passe:req.body.mot_de_Passe,

                        retapper_mdp:req.body.retapper_mdp,
                        Adresse:req.body.Adresse,
                        profileImg: result.profileImg,
                        remise:req.body.remise

            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
}else{
   // console.log(err),
    res.status(500).json({
        message: "mot de passe et rettape mot de passe n'est pas égaux",
    });
}
        }
    });
    
    


      
})

//get all membre

router.get('/getAll', async (req,res)=>{
    try {
       const memberOne = await MemberOne.find()({
        
   
       }) 
       if (memberOne.length>0){
       res.status(200).send(memberOne);}

    } catch (error) {
        console.log(error);
        res.status(401).send(error)
    }
   })



router.get("/one", (req, res, next) => {
    MemberOne.find().then(data => {
        if (data.length>0){
            res.status(200).json({
                message: "memberOne list retrieved successfully!",
                membersOne: data
            });

        }
        else {
            res.status(202).json({
                message: "memberOne list is impty",
               
            });

        }
     
    });
});






//nomrbre enregistre
router.get("/numberOne",async (req, res, next) => {
    try {
   const memberOne=await MemberOne.find().then(data => {
   
            res.status(200).json({
                message: "nombres des membres enregistres",
                membersOne: data.length
            });
    
     
    });
}catch (error) {
    console.log(error);
    res.status(401).send(error)
}
});

//get membre by id 
router.get('/findById/:OneId',  function(req, res) {
    var idOne= req.params.OneId
    MemberOne.findById({_id:idOne}, function(err, one) {
        if (err) 

            {
        res.status(401).json({
            message: "not found",
            membersOne: one
        });
    }
    else{
        res.status(201).json({
            message: "data found",
            membersOne: one
        });
    }
    
  });
 });

//get membre by id 
router.get('/findByEmail/:email',  function(req, res) {
    var email= req.params.email;
    try{
    MemberOne.findOne({email:email}, function(err, one) {
        if (err) 

            {
        res.status(401).json({
            message: "not found",
            _id: res._id,
            membersOne: one
        });
    }
    else
    {
        res.status(201).json({
            message: "data found",
            membersOne: one
        });
    }
    
  });
}catch(e){
    console.log(e);
}
 });

 router.get("/one/:OneId", async(req, res, next) => {
    var idOne= req.params.OneId
   await MemberOne.findById({_id:idOne}).then(data => {
        if (data){
           
            res.status(200).json({
                
                message: "memberOne list retrieved successfully!",
                membersOne: data
            });
            console.log("data recieve succuful")

        }
        else {
            res.status(202).json({
                message: "memberOne list is impty",
               
            });

        }
     
    });
});

// Authentification 

router.post('/one/authenticate', (req, res) => {
    // var deferred = Q.defer();
  var email_log=req.body.email
   
 
     var mdp=req.body.password;
     //console.log(email_log+' '+mdp);
      MemberOne.findOne({
        email: email_log

     }, function (err, one) {
         if (err) deferred.reject(err.name + ': ' + err.message);
      
         if (one && (mdp===one.password)) {
             // authentication successful
             //res.send({err:"Login Succeed",message:one.nom});
        
           res.status(200).json({
              
                data: {

                    status: true, 
                    message: "login successfuly",
                one:{
                    _id:one._id,
                    nom:one.nom,
                    email:one.email,
                    numeroTel:one.numeroTel,
                    domaine:one.domaine,
                    type_Entreprise:one.type_Entreprise,
                    profileImg:one.profileImg,
                    statut:one.statut=true,
                    password:one.password,
                    score:one.score,
                    adresse:one.adresse,
                    remise:one.remise,
                    nbTransaction:one.nbTransaction,
                    rating:one.rating

                }
                }
          
                 })
          
         } else {
             // authentication failed
     
             res.send({err:"Login Failed",message:'Autenticated Failed Try again',data:{status:false}});
         }
     });
 
   //  return deferred.promise;
 });



 router.post('/users/authenticate', (req, res) => {
    // var deferred = Q.defer();
    var email_log=req.body.email
   
 
    var password=req.body.password;
     //console.log(user_name,'  ',password);
     MemberOne.findOne({
         email: email_log
     }, function (err, one) {
         if (err) deferred.reject(err.name + ': ' + err.message);
 
         if (one && (password===one.password)) {
             // authentication successful
      
             res.send({err:"Login Succeed",message:one});
         } else {
             // authentication failed
     
             res.send({err:"Login Failed",message:'Autenticated Failed Try again'});
         }
     });
 
   //  return deferred.promise;
 });

 //modifier profile
 router.put("/upd/:id", async (req, res) => {
    try {
     
        const data = await MemberOne.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        )
        res.status(201).json(data);
      }
     catch (error) {
      console.log(error.message);
    }})


 router.put('/updateOne/:OnebyId', (req, res) => {
    var OnebyId = req.params.OnebyId;
    var one = req.body;
   
   // console.log("one"+one);
    MemberOne.findOneAndUpdate({
        _id: req.params.OnebyId,
      
    },  req.body, function (err, one) {
        if (err) {
            res.send({ err: err });
        }
        else{
        res.status(200).json({
         
            data: {

                
                message: "update successfuly",
                one:req.body
                
            }
        });
    }
    });

})




//modifier score 


router.put('/updateScroe/:OnebyId', (req, res) => {
    var OnebyId = req.params.OnebyId;
    var one = req.body;
    var score=req.body.score;
    var nbTransaction=req.body.nbTransaction
   // console.log("one"+one);
    MemberOne.findOneAndUpdate({
        _id: req.params.OnebyId
      
    },  req.body, function (err, one) {
        if (err) {
            res.send({ err: err });
        }
        else{
            console.log("Transaction",nbTransaction)
            console.log("socre",score)
        res.status(200).json({
         
            data: {

                
                message: "update successfuly",
                one:req.body
                
            }
        });
    }
    });

})

//modif

router.put('/update/:id',(req,res,next)=>{

	console.log(req.params.id);
	console.log(req.body);

	MemberOne.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {new:true}, (error, data)=>{
		if(error){
			return next(error);
		}else{
			res.json(data);
		}
	})

})

//modifier mot de passe 


router.put('/updateMdp/:OnebyEmail', (req, res) => {
    var OnebyEmail = req.params.OnebyEmail;
    var one = req.body;
    var password=req.body.password
    var retapper_mdp=req.body.retapper_mdp

    if (password===retapper_mdp){
        MemberOne.findOneAndUpdate({
            email: req.params.OnebyEmail
          
        },  req.body, function (err, one) {
            if (err) {
                res.send({ err: err });
            }
            else{
                if(one){
                  
                        console.log("password",password)
                        res.status(200).json({
                         
                            data: {
                
                                
                                message: "password update successfuly",
                                one:req.body
                                
                            }
                        });
                    }
                  
    
                
                
            
         
        }
        });
    }
    else{
        res.send({err:" mdp et retaper mot de passe ne pas egaux"});
    }
    





/*
    MemberOne.findOne({email:  req.params.OnebyEmail}, function(err, one){
        if(err)return handleErr(err);

        if (one){
            if ((pass==='')||(passretap==='')){
                res.status(200).json({
                     
                    data: {
        
                        
                        message: "saisie mot de passe svp ",
                     
                        
                    }
                });
                
            }
            else{
                if (pass===passretap){
                    
            one.password = pass;
            one.retapper_mdp=passretap;
            one.save(function(err){
               if(err)return handleErr(err);
               //user has been updated
               else{
                res.status(200).json({
                     
                    data: {
        
                        
                        message: "password update successfuly",
                        one:req.body
                        
                    }
                });
               }
             });

                }else{
                    res.status(200).json({
                     
                        data: {
            
                            
                            message: "mot de passe et rettape mot de passe n'est sont pas egaux",
                         
                            
                        }
                    });
                }
          
        }
        }
        
        
       });*/


})



router.get('/getByVille/:OnebyVille', async (req,res)=>{
    try {
       const memberOne = await MemberOne.find({Adresse: req.params.OnebyVille
        
   
       }) 
       .then(data => {
   
        res.status(200).json({
            message: "nombres des membres enregistres",
            membersOne: data.length
        });

 
});
}catch (error) {
console.log(error);
res.status(401).send(error)
}
   })



   
router.get('/getByType/:OnebyTyep', async (req,res)=>{
    try {
       const memberOne = await MemberOne.find({type_Entreprise: req.params.OnebyTyep
        
   
       }) 
       .then(data => {
   
        res.status(200).json({
            message: "nombres des membres enregistres",
            membersOne: data.length
        });

 
});
}catch (error) {
console.log(error);
res.status(401).send(error)
}
   })

   router.post('/addrating', async (req, res) => {

    var idUser=req.body._id
    let somme=0;
    let review=0;
    await MemberOne.findById({_id:idUser}).then(data => {
     
        if (data){
           
            res.status(200).json({
                
                message: "memberOne list retrieved successfully!",
                membersOne: data.rating,
                

            });
            
            for(let i = 0; i<=data.rating.length-1; i++){
                somme=somme+data.rating[i];
                review=somme/data.rating.length;
            }
            console.log("somme ",somme)
            console.log("review ",review)
            console.log(data.rating)

        }
        else {
            res.status(202).json({
                message: "memberOne list is impty",
               
            });

        }
     
    });

 

   })



module.exports = router;
