import { Router, Request, Response } from "express";
import { ILink, LinkModel } from "../models/Links.model";
import { IShortenLink, ShortenLinkModel } from "../models/ShortenLinks.model";
// import { Schema } from "mongoose";

const shortenerRouter = Router();

shortenerRouter.post("/shortener", async (req: Request, res: Response) => {
    const ilink = req.body as ILink;


    const newLink = new LinkModel(ilink);
    const error = newLink.validateSync();

    if (error) {
        return res.status(422).send({ error })
    }

    return newLink.save()
        .then(() => {
            const data: IShortenLink = {
                title: "",
                link: newLink,
                shortenLink: `http://${req.get("host")}/s/${newLink._id.toString()}`
            };
            // const shorten = new ShortenLinkModel(data);
            // shorten.save();

            res.status(201).json(data);
        });

});

shortenerRouter.get("/s/:id", (req: Request, res: Response) => {
    const linkId = req.params.id;
    LinkModel.findById(linkId)
        .then((linkDoc) => {
            if (linkDoc)
                res.status(200).json({ link: linkDoc.link });
        })
        .catch((err) => {
            res.status(422).json({ error: err });
        })
});

shortenerRouter.get("/", (req: Request, res: Response) => {
    return LinkModel.find({})
        .limit(100)
        .then(links => res.json(links));
});

export default shortenerRouter;
