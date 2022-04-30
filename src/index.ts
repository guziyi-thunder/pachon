import express, {Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser' 
import cookieSession from 'cookie-session'
import './controller/LoginController'
import './controller/CrowllerController'
import router from './router'

//问题1：express库的类型定义文件 .d.ts 文件类型描述不准确
//答：看router.ts 的interface RequestWidthBody 写一个接口继承.d.ts里的接口，然后用自己写的接口
//问题2： 当我使用中间件的时候(bodyParser 是express的中间件),对req或res做了修改，实际上类型并不能改变
//答：使用类型融合，自己定义的.d.ts文件会和node——modules下定义的接口会组合在一起，看src下的custom.d.ts文件和app.use，给req新加了一个teacherName的属性
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req: Request, res: Response, next: NextFunction) => {
    req.teacherName = 'dell'
    next()
})
app.use(cookieSession({
    name: 'session',
    keys: ['teacher dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
app.use(router)

app.listen(7001, () => {
    console.log('serve is running');
})