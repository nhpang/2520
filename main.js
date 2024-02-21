const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: Feb 19
 * Author: Nathan Pang
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

async() => {
    try {
        await IOhandler.unzip(zipPath, unzipPath)
        console.log("unzip successful")

        const png = await IOhandler.readDir(unzipPath)
        
        await IOhandler.grayScale(unzipPath, grayPath)
        console.log("grayscale success")
    }
    catch (error) {
        console.log("error")
    }
}