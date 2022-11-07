let path = require("path");
let fs = require("fs");

let getFileInfo = function (file) {
  let fileData = "";

  if (file.isFile()) {
    fs.stat(
      path.resolve(__dirname, "secret-folder", file.name),
      (error, stats) => {
        if (error) {
          return console.log(error);
        }

        fileData = fileData + file.name.split(".").slice(0, -1).join(".") + "-";
        fileData = fileData + path.extname(file.name).slice(1) + "-";
        fileData = fileData + Math.round(stats.size / 1024) + "Kb";
        console.log(fileData);
      }
    );
  }
};

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (error, filesData) => {
    if (error) {
      return console.log(error);
    } else {
      filesData.forEach((item) => {
        getFileInfo(item);
      });
    }
  }
);
