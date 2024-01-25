import { model, Schema, Model, Document, Types } from 'mongoose';
// Document interface
// No need to define TS interface any more.
// interface User {
//   name: string;
//   email: string;
//   avatar?: string;
// }


// 1. Create an interface representing a document in MongoDB.
interface IUser {
    name: string;
    email: string;
    // Use `Types.ObjectId` in document interface...
    organization: Types.ObjectId;
  }

// Schema
// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // And `Schema.Types.ObjectId` in the schema definition.
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' }
});

// 3. Create a Model.
const UserModel = model<IUser>('User', userSchema);

export { 
    IUser,
    userSchema
};

export default UserModel;
