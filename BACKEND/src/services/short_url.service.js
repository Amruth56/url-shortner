import { generateNanoId } from "../utils/helper.js";
import urlSchema from '../models/short_url.model.js';


export const createShortUrlService = async(url) => {
    const shortUrl = await generateNanoId(8)
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    })
    newUrl.save();
    return shortUrl;
}