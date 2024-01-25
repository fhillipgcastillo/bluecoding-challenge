import { Schema, model } from "mongoose";

export interface ILink {
    url: string;
}

export const LinkSchema = new Schema<ILink>({
    url: {
        type: String,
        require: true
    }
});

export const LinkModel = model<ILink>("Link", LinkSchema);


