
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import {Analyzer} from './crowller'
interface Course {
    title: string, 
    count: number
}
interface CourseResult {
    time: number,
    data: Course[]
}
interface Content {
    [propName: number]: Course[]
}
export default class DellAnalyzer implements Analyzer{
    private static instance: DellAnalyzer
    static getInstance(){
        if(!DellAnalyzer.instance){
            DellAnalyzer.instance = new DellAnalyzer()
        }
        return DellAnalyzer.instance
    }
    private getCourseInfo(html: string){
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos: Course[] = []
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc')
            const title = descs.eq(0).text()
            const count = parseInt(descs.eq(1).text().split('：')[1],10) 
            courseInfos.push({
                title, count
            })
        })
        return {
            time: new Date().getTime(),
            data: courseInfos
        }
    }
    //把爬取到的数据存储到一个json文件里
    generateJsonContent(course: CourseResult, filePath: string){
        let fileContent: Content = {}
        if(fs.existsSync(filePath)){
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        fileContent[course.time] = course.data
        return fileContent
    }
    public analyze(html: string, filePath: string){
        const courseResult = this.getCourseInfo(html)
        const fileContent = this.generateJsonContent(courseResult, filePath)
        return JSON.stringify(fileContent)
    }
    private constructor(){}

}

//单例模式的写法，首先把constructor定义成私有的(private),然后再定义一个静态的属性并且私有(private)instance: Dell,这个属性的类型是属于这个类的，再定义一个静态的方法供外部使用，在方法里面写单例模式的逻辑；具体代码如下
//单例模式是不能被new出来的，只能调用静态方法
class DanLie {
    private static instance: DanLie
    static getInstance(){
        if(!DanLie.instance){
            DanLie.instance = new DanLie()
        }
        return DanLie.instance
    }
    private constructor(){}
}
// const danLie = new DanLie()
const danLie = DanLie.getInstance()