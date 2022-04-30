
//ts => .d.ts(类型定义文件,翻译文件) => js
import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
//使用组合设计模式优化代码
// import LeeAnalyzer from './leeAnalyzer'
/**
 * 可以新建不同的Analyzer.ts文件来达到爬取不同的页面，不变的是crowller
 */
/**
 * 把dellAnalyzer类改写成单例模式的类，需要把constructor写成private
 */
export interface Analyzer {
    analyze: (html: string, filePath: string) => string
}
class Crowller {
    private filePath = path.resolve(__dirname, '../../data/course.json')
    private async getRawHtml(){
        const result = await superagent.get(this.url)
        return result.text
    }
    private writeFile(content: string){
        fs.writeFileSync(this.filePath,content)
    }
    private async initSpiderProcess(){
        const html = await this.getRawHtml()
        const fileContent = this.analyzer.analyze(html, this.filePath)
        this.writeFile(fileContent)
    }
    constructor(private url: string, private analyzer: Analyzer){
        this.initSpiderProcess()
    }
}
export default Crowller

// const secret = 'x3b174jsx'
// const  url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
// // const  url = `https://www.baidu.com/`
// //把DellAnalyzer改写成单例模式的写法
// const dellAnalyzer = DellAnalyzer.getInstance()
// new Crowller(url, dellAnalyzer)
// // const dellAnalyzer = new DellAnalyzer()
// // const leeAnalyzer = new LeeAnalyzer()
