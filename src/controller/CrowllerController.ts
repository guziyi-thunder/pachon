import path from 'path'
import fs from 'fs'
import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { controller, use, get } from '../decorator'
import { getResponseData } from "../utils/util";
import Crowller from "../utils/crowller";
import Analyzer from "../utils/analyzer";
interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  function isLoginFn(req: BodyRequest): boolean{
    return !!(req.session ? req.session.login : undefined);
  }
  const isLogin = isLoginFn(req)
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "请先登录"));
  }
};


@controller('/')
export class CrowllerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: Request, res: Response): void {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const dellAnalyzer = Analyzer.getInstance();
    new Crowller(url, dellAnalyzer);
    res.json(getResponseData(true));
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: Request, res: Response): void {
    try {
          const position = path.resolve(__dirname, "../../data/course.json");
          const data = fs.readFileSync(position, "utf-8");
          res.json(getResponseData(JSON.parse(data)));
        } catch (err) {
          res.json(getResponseData(false, "尚未爬取到内容"));
        }
  }
}
