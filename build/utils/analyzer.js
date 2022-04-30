"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.getInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        var courseInfos = [];
        courseItems.map(function (index, element) {
            var descs = $(element).find('.course-desc');
            var title = descs.eq(0).text();
            var count = parseInt(descs.eq(1).text().split('：')[1], 10);
            courseInfos.push({
                title: title, count: count
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    };
    //把爬取到的数据存储到一个json文件里
    DellAnalyzer.prototype.generateJsonContent = function (course, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[course.time] = course.data;
        return fileContent;
    };
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        var courseResult = this.getCourseInfo(html);
        var fileContent = this.generateJsonContent(courseResult, filePath);
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
//单例模式的写法，首先把constructor定义成私有的(private),然后再定义一个静态的属性并且私有(private)instance: Dell,这个属性的类型是属于这个类的，再定义一个静态的方法供外部使用，在方法里面写单例模式的逻辑；具体代码如下
//单例模式是不能被new出来的，只能调用静态方法
var DanLie = /** @class */ (function () {
    function DanLie() {
    }
    DanLie.getInstance = function () {
        if (!DanLie.instance) {
            DanLie.instance = new DanLie();
        }
        return DanLie.instance;
    };
    return DanLie;
}());
// const danLie = new DanLie()
var danLie = DanLie.getInstance();
