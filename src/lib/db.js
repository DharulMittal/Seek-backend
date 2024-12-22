import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const a = await mongoose.connect(process.env.MONGODB);
        console.log('MongoDB connected - '+ a.connection.host);
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
};
