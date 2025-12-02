import express from "express";
const app = express();
import {nanoid} from "nanoid";

app.get('/', (req, res) => {
    res.  send("hello world")
})

app.get('/api/create', (req, res) => {
    
})

app.listen(3000, () => {
console.log('Server is running on port 3000'); 
})