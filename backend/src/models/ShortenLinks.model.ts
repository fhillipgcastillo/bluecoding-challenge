import { Schema, model } from "mongoose";
import { ILink } from "./Links.model";

export interface IShortenLink {
    title?: string;
    link: ILink;
    shortenLink: string;
}

export const ShortenLinkSchema = new Schema<IShortenLink>({
    title: {
        type: String,
        require: false
    },
    link: {
        type: Schema.Types.ObjectId,
        ref: "Link",
    },
    shortenLink: {
        type: String,
        require: true,
    }
});

export const ShortenLinkModel = model<IShortenLink>("Link", ShortenLinkSchema);


