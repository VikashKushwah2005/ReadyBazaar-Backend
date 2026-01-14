const {default:mongoose} = require('mongoose')

const url = process.env.MONGODB_URI;

const connectDB = async() =>{
    try{
        const conn  = await mongoose.connect(url)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB error: ${error}`);
        process.exit(1);                                                    
    }
}

module.exports = connectDB