const Koa = require("koa");
const fs = require("fs");
const app = new Koa();
/**
 * 用promise封装异步读取文件名称
 * @param {string} page html 名称
 * @return {promise}
 */
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`;
    fs.readFile(viewUrl, "binary", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
/**
 * 根据url获取html内容
 * @param {string} url koa2上下文url,ctx.url
 * @return {string} 获取html文件内容
 */
async function route(url) {
  let view = "404.html";
  switch (url) {
    case "/":
    case "/index":
      view = "index.html";
      break;
    case "/todo":
      view = "todo.html";
      break;
    case "/404":
      view = "404.html";
      break;
    default:
      break;
  }
  let html = await render(view);
  return html;
}
app.use(async (ctx) => {
  let url = ctx.url;
  // 从上下文的request对象中获取
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;

  // 从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;
  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
  };
  //   console.log(JSON.stringify(ctx), ">>>>>>>>>>>>>ctx<<<<<<<<<<");
  //   ctx.body = "hello,koa2";
  //   let html = await route(url);
  //   ctx.body = html;
});

app.listen(3000);
console.log("[koa demo] start-quick is starting at port 3000");
