const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const execute = (filePath, filePath2, language) => {
  if (language === "py") {
    return new Promise((resolve, reject) => {
      exec(`python "${filePath}" < "${filePath2}"`, (error, stdout, stderr) => {
        if (error) {
          // console.log(error);
          reject({ error, stderr });
          return;
        }
        if (stderr) {
          // console.log(stderr)
          reject({ stderr });
          return;
        }
        resolve(stdout.trim());
      });
    });
  } else if (language == "java") {
    return new Promise((resolve, reject) => {
      console.log(filePath);
      exec(`javac "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
          // console.log(error);
          reject({ error, stderr });
          return;
        }
        if (stderr) {
          // console.log(stderr)
          reject({ stderr });
          return;
        }
        resolve(stdout.trim());
      });
    });
  } else {
    const jobID = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobID}.exe`);
    // const fil1=`"${filePath}"`;
    return new Promise((resolve, reject) => {
      exec(
        `g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" && ./${jobID}.exe <"${filePath2}"`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(error);
            reject({ error, stderr });
            return;
          }
          if (stderr) {
            console.log(stderr);
            reject({ stderr });
            return;
          }
          resolve(stdout.trim());
        }
      );
    });
  }
};

module.exports = { execute };
