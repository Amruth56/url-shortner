import { saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";


export const createShortUrlWithoutUser = async(url) => {
    const shortUrl = await generateNanoId(7);
    if(!shortUrl) throw new Error ("Short URL not generated")
   await saveShortUrl(shortUrl, url);
    return shortUrl;
}
export const createShortUrlWithUser = async(url, userID) => {
    const shortUrl = await generateNanoId(7)
   await saveShortUrl( url,shortUrl, userID);
    return shortUrl;
}
