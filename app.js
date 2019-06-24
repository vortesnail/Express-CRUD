/* 
 * app.js 入口模块
 * 职责：
 *      创建服务
 *      做一些服务相关配置
 *          模板引擎
 *          body-parser 解析表单 post 请求体
 *          提供静态资源服务
 *      挂载路由
 *      监听端口启动服务
 * 
 */

var express = require('express');
var fs = require('fs');
var router = require('./router.js')
var bodyParser = require('body-parser');

var app = express();

app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));

app.engine('html', require('express-art-template'));
// 配置模版引擎和 body-parser 一定要在 app.use(router) 挂在路由之前
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router(app);

// 把路由容器挂载到app服务中
app.use(router);

app.listen(3000, function () {
    console.log('The crud-express app is running...');
})