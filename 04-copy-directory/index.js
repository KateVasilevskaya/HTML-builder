let path = require("path");
let fs = require("fs");
let files = path.join(__dirname, "files");
let copyFiles = path.join(__dirname, "copyFiles");

fs.promises
  .rm(copyFiles, {
    recursive: true,
    force: true,
  })
  .finally(() => {
    fs.promises.mkdir(copyFiles, {
      recursive: true,
    });
    fs.promises
      .readdir(files, {
        withFileTypes: true,
      })
      .then((data) => {
        data.forEach((item) => {
          if (item.isFile()) {
            let pathFiles = path.join(files, item.name);
            let pathCopyFiles = path.join(copyFiles, item.name);
            fs.promises.copyFile(pathFiles, pathCopyFiles);
            console.log(pathCopyFiles);
          }
        });
      });
  });
