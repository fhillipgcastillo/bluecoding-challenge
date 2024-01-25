import mongoose, { Schema, InferSchemaType } from 'mongoose';

// Document interface
// No need to define TS interface any more.
// interface User {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// Schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});

type User = InferSchemaType<typeof userSchema>;


// InferSchemaType will determine the type as follows:
// type User = {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// `UserModel` will have `name: string`, etc.
const UserModel = mongoose.model('User', userSchema);

export { 
    userSchema,
    User
};

export default UserModel;
