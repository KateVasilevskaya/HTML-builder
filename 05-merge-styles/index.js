let path = require("path");
let fs = require("fs");
let bundleStyles = path.join(__dirname, "project-dist", "bundle.css");
let styles = path.join(__dirname, "styles");

fs.readdir(styles, "utf-8", (error, files) => {
  if (!error) {
    files.forEach((file) => {
      if (path.parse(file).ext === ".css") {
        fs.createReadStream(path.join(styles, file), "utf8").on(
          "data",
          (data) => {
            fs.appendFile(bundleStyles, data, () => {});
          }
        );
      }
    });
  }
});
