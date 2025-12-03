import express from "express";
import dotenv from "dotenv";
import connectDB from './src/config/mongo.config.js';
import short_url from "./src/routes/short_url.route.js";

dotenv.config("./.env")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/create', short_url)

// app.get('/:id', async(req, res) => {
//     const {id} = req.params;
//     const url = await urlSchema.findOne({short_url: id});

//     if(url){
//         res.redirect(url.full_url);
//     } else{
//         res.status(404).send("URL not found");
//     }
// })

app.listen(3000, () => {
    connectDB()
console.log('Server is running on port 3000'); 
})
