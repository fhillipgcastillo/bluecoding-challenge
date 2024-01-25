import { Router, Request, Response } from "express";
import { ILink, LinkModel } from "../models/Links.model";
import { IShortenLink, ShortenLinkModel } from "../models/ShortenLinks.model";

const shortenerRouter = Router();

shortenerRouter.post("/shortener", async (req: Request, res: Response) => {
    const linkData: ILink = {
        url: req.body.url
    }

    const newLink = new LinkModel(linkData);
    const error = newLink.validateSync();

    if (error) {
        return res.status(422).send({ error })
    }

    await newLink.save();

    const slData: IShortenLink = {
        title: "",
        link: newLink,
        shortenLink: `http://${req.get("host")}/s/${newLink._id.toString()}`
    };

    const shorten = new ShortenLinkModel(slData);
    await shorten.save();

    res.status(201).json({
        _id: shorten._id,
        shortLink: shorten.shortenLink,
    });

});

shortenerRouter.get("/s/:id", (req: Request, res: Response) => {
    const linkId = req.params.id;
    LinkModel.findById(linkId)
        .then((linkDoc) => {
            if (linkDoc) {
                // res.status(200).json({ url: linkDoc.url });
                res.status(300).redirect(linkDoc.url);
            }
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
shortenerRouter.get("/shorts", (req: Request, res: Response) => {
    return ShortenLinkModel.find({})
        .populate("link")
        .limit(100)
        .then(links => res.json(links));
});

export default shortenerRouter;
