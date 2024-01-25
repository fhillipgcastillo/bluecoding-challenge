import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';

dotenv.config();

// mongodb environment variables
const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_LOCAL_PORT,

} = process.env;

// mongoose options
const options = {
    useNewUrlParser: true,
    autoIndex: false,
    user: MONGODB_USER,
    pass: MONGODB_PASSWORD,
};

connect(`mongodb://localhost:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}?authSource=admin`, options);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:'));
db.once('open', () => {
    console.log('Mongodb Connection Successful');
});

export default db;
