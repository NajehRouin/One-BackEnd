let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose')
    const { v4: uuidv4 } = require('uuid');
     

    router = express.Router();
    
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




let Image = require('../models/image');



router.post("/upload-image", upload.single("profileImg"), async(req, res) => {
  const imgsend="http://localhost:4000/public/"+ req.file.filename
  res.send(imgsend);
  console.log("image save ",imgsend);
  const img= new Image({
    _id: new mongoose.Types.ObjectId(),
    profileImg: req.file.filename,
   nom: req.body.nom,
    
});
let result = await img.save();

if(result){console.log("kkkkkk")}
else{console.log("euuuueeueue")}
})

router.post('/insertimage', async (req, res, next) => {

  const img= new Image({
    _id: new mongoose.Types.ObjectId(),
      profileImg: req.body.profileImg,
      nom: req.body.nom,
      
  });
 
  let result = await img.save();
if(result){
  console.log("hdcdcldskdsl")
}
else{
    console.log("moiiiiiiiiiiiiiii")
}
});
  
  

function saveFile(file) {
  const oldpath = file.filepath;
  const ext = file.originalFilename.slice(file.originalFilename.lastIndexOf('.') + 1);
  const unique_name = `${file.newFilename}.${ext}`;
  const newpath = `/uploads/${unique_name}`;
  fs.renameSync(oldpath, path.join(path.resolve(), newpath));
  return unique_name;
}
    

    /*multer.memoryStorage({
        destination: function(req, file, callback) {
         callback(null, "");
        },
       })

       router.post('/upload', multer({storage: multer.memoryStorage()}).single("file"), async (req, res, next) => {
        if (req.file) {
          var originalname = req.file.originalname.split(' ');
          const fileName = originalname.join('_');
          try {
            await minioClient.putObject('test-bucket', fileName, req.file.buffer);
      
            // get url
            const url = await minioClient.presignedGetObject('test-bucket', fileName);
      
            var id = uuid();
            // link valid for 3 minutes (180 seconds)
            // save link to redis
            redisClient.setex(id, 180, url, (err, reply) => {
              if (err) {
                return res.json({'success': false, 'message': err});
              }
              return res.json({'success': true, 'message': id});
            });
          } catch(err) {
            return res.json({'success': false, 'message': err});
          }
        }
      });

      router.post('/', (req, res) => {
        const storage = multer.memoryStorage()
        const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
        upload.single('track')(req, res, (err) => {
         if (err) {
          return res.status(400).json({ message: "Upload Request Validation Failed" });
         } else if(!req.body.name) {
          return res.status(400).json({ message: "No track name in request body" });
         }
         
         let trackName = req.body.name;
         
         // Covert buffer to Readable Stream
         const readableTrackStream = new Readable();
         readableTrackStream.push(req.file.buffer);
         readableTrackStream.push(null);
       
         let bucket = new mongodb.GridFSBucket(db, {
          bucketName: 'tracks'
         });
       
         let uploadStream = bucket.openUploadStream(trackName);
         let id = uploadStream.id;
         readableTrackStream.pipe(uploadStream);
       
         uploadStream.on('error', () => {
          return res.status(500).json({ message: "Error uploading file" });
         });
       
         uploadStream.on('finish', () => {
          return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
         });
        });
       });*/

    module.exports = router;