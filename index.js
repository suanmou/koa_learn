// const Koa = require("koa");
// const fs = require("fs");
// const app = new Koa();
// /**
//  * 用promise封装异步读取文件名称
//  * @param {string} page html 名称
//  * @return {promise}
//  */
// function render(page) {
//   return new Promise((resolve, reject) => {
//     let viewUrl = `./view/${page}`;
//     fs.readFile(viewUrl, "binary", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }
// /**
//  * 根据url获取html内容
//  * @param {string} url koa2上下文url,ctx.url
//  * @return {string} 获取html文件内容
//  */
// async function route(url) {
//   let view = "404.html";
//   switch (url) {
//     case "/":
//     case "/index":
//       view = "index.html";
//       break;
//     case "/todo":
//       view = "todo.html";
//       break;
//     case "/404":
//       view = "404.html";
//       break;
//     default:
//       break;
//   }
//   let html = await render(view);
//   return html;
// }
// app.use(async (ctx) => {
//   let url = ctx.request.url;

//   //   console.log(JSON.stringify(ctx), ">>>>>>>>>>>>>ctx<<<<<<<<<<");
//   //   ctx.body = "hello,koa2";
//   let html = await route(url);
//   ctx.body = html;
// });

// app.listen(3000);

const Koa = require("koa");
const path = require("path");
const content = require("./util/content");
const mines = require("./util/mines");

const app = new Koa();
const staticPath = "./static";

// 解析资源类型

function parseMine(url) {
  let extName = path.extname(url);
  console.log(extName, extName);
  extName = extName ? extName.slice(1) : "unknown";
  return mines[extName];
}

app.use(async (ctx) => {
  // 静态资源目录在本地的绝对路径
  let fullStaticPath = path.join(__dirname, staticPath);
  // 获取静态资源内容，有可能是文件内容，目录，或404
  let _content = await content(ctx, fullStaticPath);
  // 解析请求内容的类型
  let _mine = parseMine(ctx.url);
  if (_mine) {
    ctx.type = _mine;
  }
  // 输出静态资源内容

  if (_mine && _mine.indexOf("image/") >= 0) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200);
    ctx.res.write(_content, "binary");
    ctx.res.end();
  } else {
    // 其他则输出文本
    ctx.body = _content;
  }
});

app.listen(3000);
console.log("[koa demo] start-quick is starting at port 3000");
