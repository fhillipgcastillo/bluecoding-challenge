// testing db connection
import dotenv from 'dotenv';

import { connect } from 'mongoose';
// import { User } from './models/user.model.example';

dotenv.config();

// mongodb environment variables
const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_LOCAL_PORT,

} = process.env;

main().catch(err => console.log(err));

async function main() {
    await connect(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@localhost:${MONGODB_LOCAL_PORT}/`);
    console.log("Connected succesfully")
}
