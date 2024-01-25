// testing db connection
import dotenv from 'dotenv';

import mongoose, { connect } from 'mongoose';
import UserModel from './models/user.model.example';
// import { User } from './models/user.model.example';

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
    // useFindAndModify: false,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    autoIndex: false,
    // poolSize: 10,
    // bufferMaxEntries: 0,
    user: MONGODB_USER,
    pass: MONGODB_PASSWORD,
};


main().catch(err => console.log(err));

async function main() {
    
    // await connect(`mongodb://localhost:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}?authSource=admin`, options);
    await connect(`mongodb://localhost:${MONGODB_LOCAL_PORT}/test?authSource=admin`, options);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongodb Connection Error:'));
    db.once('open', () => {
        // we're connected !
        console.log('Mongodb Connection Successful');
    });
    console.log("Connected succesfully");

    const user = new UserModel({
        name: 'Bill',
        email: 'bill@initech.com',
        avatar: 'https://i.imgur.com/dM7Thhn.png'
    });
    await user.save();

    console.log("created dumb test user");
    console.log("querying")
    
    const users = await UserModel.find({})
    console.log("users found", users);
}


