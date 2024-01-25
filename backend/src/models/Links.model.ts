import { Schema, model } from "mongoose";

export interface ILink {
    link: string;
}

export const LinkSchema = new Schema<ILink>({
    link: {
        type: String,
        require: true
    }
});

export const LinkModel = model<ILink>("Link", LinkSchema);


