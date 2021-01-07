const Koa = require('koa')
const app = new Koa();

app.use((ctx)=>{
    if(ctx.url ==='/index') {

        ctx.cookies.set('cid','hello world',{
            domain: 'localhost',// 写cookie所在的域名
            path: '/index', // 写cookie所在的路径

            maxAge: 10*60*1000,// cookie有效时长
            expire: new Date('2021-01-09'), // cookie失效时间
            httpOnly: true,// 是否只用于http请求中获取
            overwrite: false, // 是否允许重写

        })
        ctx.body = 'cookie is ok';

    } else {
        ctx.body = 'hello world';
    }
})

app.listen(3000,()=>{
    console.log('[demo] cookie is starting at port 3000')
})