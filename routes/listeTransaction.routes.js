let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose')

     

    router = express.Router();
let ListeTransaction = require('../models/transactionsOne');


router.post('/listeTransaction', async (req, res)=> 

{
const list=new ListeTransaction({

    currentUser: req.body.currentUser,
    User: req.body.User,
    remise:req.body.remise
})
   /* var items = {
       
     
        currentUser: req.body.currentUser,
        User: req.body.User
    };*/
    list.save().then(
        result=>{
            res.status(201).json({
                message: "Transaction creé!",
                list:{
                    _id:result._id,
                    currentUser: req.body.currentUser,
                    User: req.body.User,
                    remise:req.body.remise

                }

            })
        }
    )
   /* ListeTransaction.collection.insertOne(items, async (err, done)=> {
        if (err) {
            res.send({ err: err });
        }
        res.send("1 List successufully inserted ");
    });*/
});
/*
router.get('/listeTransaction', function (req, res) {
    ListeTransaction.find(function (err, liste) {
        if (err) res.send(err);
        res.send(liste);

    });
    
});*/

router.get('/listeTransaction',  (req, res)=> {
 
    

     ListeTransaction.find().then(data => {
        if (data.length>0){
            //console.log("data",data)
         
            res.status(200).json({
                
                message: "liset transaction  trouvez",
                data: data
            });
            console.log("trouver")

        }
        else {
            res.status(202).json({
                message: "liste transaction  est vide",
               
            });

        }
     
    });
});
    



module.exports = router;