let path = require("path");
let fs = require("fs");
let output = fs.createWriteStream(path.join(__dirname, "text.txt"));
let { stdout, stdin } = require("process");
let { exit } = require("process");

stdout.write("Enter the text:");

stdin.on("data", (data) => {
  output.write(data);
  if (data.toString().trim() === "exit") {
    exitFunc();
  }
});

function exitFunc() {
  stdout.write("Goodbye!");
  exit();
}

process.on("SIGINT", exitFunc);
