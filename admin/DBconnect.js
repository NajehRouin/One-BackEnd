const mongoose=require ('mongoose'); 
mongoose.connect('mongodb://localhost:27017/db-one', (err) =>

{
    if (!err)
    console.log('MongoDb connection succeeded!!!'); 
    else
    console.log('Error in db :' + JSON.stringify(err, undefined ,2)) ; 
}); 

module.exports = mongoose ;