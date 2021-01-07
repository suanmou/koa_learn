const Koa = require('koa');
const path = require('path'); 
const static = require('koa-static');
const app = new Koa();
const staticPath = './static';

// 静态资源目录对于相对入口文件index.js的路径
app.use(static(path.join(__dirname,staticPath)));

app.use(async(ctx)=>{
    ctx.body = 'hello,world!'
})

app.listen(3000,()=>{
    console.log('[demo] static-middleware is starting at port 3000')
});


