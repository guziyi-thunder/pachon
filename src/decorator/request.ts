
import {CrowllerController, LoginController} from '../controller'

export enum Methods {
  get = "get",
  post = "post",
}

//方法的装饰器:方法的装饰器多了会造成代码很臃肿（get, post, delete, put），所以新建一个工厂模式，直接复用工厂模式就可以了
function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (target: CrowllerController | LoginController, key: string) {
      //第一个参数是存入的键名 ，第二个参数是值， 第三个参数是要存到那里去， 第四个参数是给哪个方法名用的装饰器
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
 