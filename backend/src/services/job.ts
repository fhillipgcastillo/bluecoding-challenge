import cron from 'node-cron';
import { ShortenLinkModel } from '../models/ShortenLinks.model';

const parseTitle = (body: string) => {
    const match = body.match(/<title>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
    if (!match || typeof match[1] !== 'string')
        throw new Error('Unable to parse the title tag for ' + body)
    return match[1]
}

// Define a function to execute every minute
function runEveryMinute() {
    // Print the current date and time
    // console.log(`Running at ${new Date().toLocaleString()}`);
    ShortenLinkModel.findOne({ title: "" })
        .populate("link")
        .then((data) => {
            data &&
                fetch(
                    data.link.url,
                    {
                        headers: {
                            "Content-Type": "text/html",
                        },
                    })
                    .then(res => res.text())
                    .then(body => parseTitle(body))
                    .then(title => {
                        if (title) {
                            data.title = title;
                            data.save()
                        }
                    })
                    .catch((e) => {
                        console.log("error fetching url", data.link)
                        console.log(e)
                    })
        })
        .catch(e => console.log(e))
}

// Schedule the function using node-cron
cron.schedule(" */10 * * * * * ", runEveryMinute);
