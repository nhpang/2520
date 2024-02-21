/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut = "./unzipped") => {
  if (!fs.existsSync(pathOut)) {
    fs.mkdirSync(pathOut, { recursive: true });
  }

  fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .on('finish', () => {
        console.log('Extraction operation complete.');
    })
    .on('error', (err) => {
        console.error('Error extracting ZIP file:', err);
    });

}

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  try {
    const fileList = fs.readdirSync(dir);

    const pics = fileList.filter(file => {
        return path.extname(file) == '.png';
    });

    count = 0
    pics.forEach(i => {
      pics[count] = dir.concat("/", i)
      count = count + 1
    });
    console.log(pics);
} catch (error) {
    console.error('Error reading directory:', error);
    return [];
}
};

readDir("./unzipped")

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */


const grayScale = (pathIn, pathOut) => {
  fs.promises
  .mkdir(pathOut, { recursive: true })
  .then(() => fs.promises.readdir(pathIn))
  .then((files) => {

    files.forEach((file) => {
      if (file.endsWith(".png")) {
        const filePathIn = `${pathIn}/${file}`;
        const filePathOut = `${pathOut}/${file}`;

        fs.createReadStream(filePathIn)
          .pipe(new PNG({ filterType: 4 }))
          .on("parsed", function () {
            for (var y = 0; y < this.height; y++) {
              for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                var local_variable =
                  (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) /
                  3;
                this.data[idx] = local_variable;
                this.data[idx + 1] = local_variable;
                this.data[idx + 2] = local_variable;
              }
            }
            this.pack().pipe(fs.createWriteStream(filePathOut));
          })
          .on("error", (err) =>
            console.log(`Error processing file ${filePathIn}: ${err}`)
          );
      }
    });
  })
  .catch((err) => console.log(err));
}
grayScale("./unzipped/in.png", "./")

module.exports = {
  unzip,
  readDir,
  grayScale,
};
