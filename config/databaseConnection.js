import mongoose from "mongoose";

const databaseConnect = async () => {
    try {
        const db_uri = process.env.DB_URI;
        const connection = await mongoose.connect(db_uri);
        console.log(`Successfully connected to DB.`);
    } catch (error) {
        console.log(`Error while connecting to DB - ${error}`);
    }
}

export default databaseConnect;
