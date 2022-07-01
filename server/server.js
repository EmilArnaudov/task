// server.js
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/"});

const cors = require('./src/middlewares/cors');
const { handleFile } = require('./src/services/fileServices');
const { editFile } = require('./src/services/editFile');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/upload_files", upload.single("file"), handleFile);
app.post("/edit_file", upload.single("file"), editFile);



app.listen(5000, () => {
    console.log(`Server started...`);
});