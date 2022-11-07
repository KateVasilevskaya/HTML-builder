let path = require("path");
let fs = require("fs");
let styles = path.join(__dirname, "styles");
let project = path.join(__dirname, "project-dist");
let copyAssets = path.join(project, "assets");
let components = path.join(__dirname, "components");
let assets = path.join(__dirname, "assets");

fs.readdir(styles, { withFileTypes: true }, async (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach((file, index) => {
      let filePath = path.join(styles, file.name);
      if (file.isFile() && file.name.split(".")[1] === "css") {
        fs.readFile(filePath, "utf8", (error, data) => {
          if (error) {
            console.log(error);
          } else if (index === 0) {
            fs.writeFile(path.join(project, "style.css"), data, (error) => {
              if (error) console.log(error);
            });
          } else {
            fs.appendFile(path.join(project, "style.css"), data, (error) => {
              if (error) console.log(error);
            });
          }
        });
      }
    });
  }
});

function recurceCopy(dir, exit) {
  fs.readdir(dir, { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    files.forEach((file) => {
      if (!file.isFile()) {
        fs.stat(path.join(exit, file.name), (error) => {
          if (error) {
            fs.mkdir(path.join(exit, file.name), (error) => {
              if (error) {
                return console.erroror(error);
              }
            });
            recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
          } else {
            recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
          }
        });
      } else {
        fs.copyFile(
          `${dir}\\${file.name}`,
          `${exit}\\${file.name}`,
          (error) => {
            if (error) throw error;
          }
        );
      }
    });
  });
}
fs.stat(project, (error) => {
  if (error) {
    fs.mkdir(project, (error) => {
      if (error) {
        return console.erroror(error);
      }
    });
    createTemplate();
  } else {
    fs.readdir(project, (error) => {
      if (error) console.log(error);
      else {
        createTemplate();
      }
    });
  }
});

fs.stat(copyAssets, (error) => {
  if (error) {
    fs.mkdir(copyAssets, (error) => {
      if (error) {
        return console.erroror(error);
      }
    });
    recurceCopy(assets, copyAssets);
  } else {
    recurceCopy(assets, copyAssets);
  }
});

function createTemplate() {
  fs.copyFile(
    `${__dirname}\\template.html`,
    `${project}\\index.html`,
    (error) => {
      if (error) throw error;
      fs.readFile(`${project}\\index.html`, "utf8", (error, data) => {
        if (error) throw error;
        fs.readdir(components, { withFileTypes: true }, (error, files) => {
          if (error) throw error;

          files.forEach((file) => {
            fs.readFile(
              `${components}\\${file.name}`,
              "utf8",
              (error, dataFile) => {
                if (error) throw error;
                let tagName = `{{${file.name.split(".")[0]}}}`;
                data = data.replace(tagName, dataFile);
                fs.writeFile(`${project}\\index.html`, data, (error) => {
                  if (error) console.log(error);
                });
              }
            );
          });
        });
      });
    }
  );
}
