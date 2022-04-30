"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods = exports.Methods || (exports.Methods = {}));
//方法的装饰器:方法的装饰器多了会造成代码很臃肿（get, post, delete, put），所以新建一个工厂模式，直接复用工厂模式就可以了
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            //第一个参数是存入的键名 ，第二个参数是值， 第三个参数是要存到那里去， 第四个参数是给哪个方法名用的装饰器
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);
