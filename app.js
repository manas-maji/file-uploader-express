import  express from "express";
import fileUploader from "./fileUploader.js";

const app = express();

app.post('/upload', fileUploader);


const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server running on: http://localhost:${PORT}`);
});