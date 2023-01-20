const config = require('config')
const mongoose = require('mongoose');
const db = config.get('mongoURI')

mongoose.set("strictQuery",false)


const connectDB = async ()=>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully')

    } catch(err){
        console.log(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;