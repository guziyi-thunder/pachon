"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/CrowllerController");
var router_1 = __importDefault(require("./router"));
//问题1：express库的类型定义文件 .d.ts 文件类型描述不准确
//答：看router.ts 的interface RequestWidthBody 写一个接口继承.d.ts里的接口，然后用自己写的接口
//问题2： 当我使用中间件的时候(bodyParser 是express的中间件),对req或res做了修改，实际上类型并不能改变
//答：使用类型融合，自己定义的.d.ts文件会和node——modules下定义的接口会组合在一起，看src下的custom.d.ts文件和app.use，给req新加了一个teacherName的属性
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    req.teacherName = 'dell';
    next();
});
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['teacher dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router_1.default);
app.listen(7001, function () {
    console.log('serve is running');
});
