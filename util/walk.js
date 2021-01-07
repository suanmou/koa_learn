const fs = require("fs");
const file = require("./file");
const mines = require("./mines");

function walk(reqPath) {
  let files = fs.readdirSync(reqPath);
  let dirList = [],
    fileList = [];
  for (let i = 0, len = files.length; i < len; i++) {
    let item = files[i];
    let itemArr = item.split(".");
    let itemMine =
      itemArr.length > 1 ? itemArr[itemArr.length - 1] : "undefined";
    if (typeof mines[itemMine] === undefined) {
      dirList.push(files[i]);
    } else {
      fileList.push(files[i]);
    }
  }
  let result = dirList.concat(fileList);
  return result;
}
module.exports = walk;
