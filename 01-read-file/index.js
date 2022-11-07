let fs = require("fs");
let path = require("path");
let stream = fs.createReadStream(path.join(__dirname, "text.txt"));

stream.on("data", (data) => process.stdout.write(data));
