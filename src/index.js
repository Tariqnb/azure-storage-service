require('dotenv').config()
const express = require("express");
const { getTheImage } = require("./file-storage");

const PORT = process.env.PORT;
const storageAccountName = process.env.STOARGE_ACCOUNT_NAME;
const storageAccessKey = process.env.STOARGE_ACCESS_KEY;
console.log(storageAccountName)
console.log(storageAccessKey)
const app = express();

app.get("/image", async (req,res) => {

    const imagePath = req.query.path;

    const [response, properties] = await getTheImage(storageAccountName,storageAccessKey,imagePath);
    
    res.writeHead(200,{
        "Content-Length": properties.contentLength,
        "Content-Type": "image/jpeg",
    });

    response.readableStreamBody.pipe(res);

});

app.listen(PORT,() => {
    console.log(`Azure storage service is up and listening to port ${PORT}`)
});