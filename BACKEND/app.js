import express from "express";
import dotenv from "dotenv";
import connectDB from './src/config/mongo.config.js';
import short_url from "./src/routes/short_url.route.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";

dotenv.config("./.env")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/create', short_url)

//redirection
app.get('/:id',redirectFromShortUrl)

app.use(errorHandler)

app.listen(3000, () => {
    connectDB()
console.log('Server is running on port 3000'); 
})
