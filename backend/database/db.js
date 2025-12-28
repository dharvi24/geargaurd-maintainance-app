import mongoose from 'mongoose'


async function connectMongoDB() {
    return await mongoose.connect(`${process.env.Mongo_URL}/GearGaurd`).then(()=>{
    console.log("mongoDB is connected");
    console.log(process.env.Mongo_URL);

   
}).catch((err)=>{
    console.log(err);
    console.log('====================================');
    console.log("url");
    console.log('====================================');

    
})
};

export default connectMongoDB;


