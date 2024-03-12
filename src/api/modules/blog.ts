/*
 * @Author: panrunjun
 * @Date: 2023-12-16 16:46:51
 * @LastEditors: your name
 * @LastEditTime: 2024-03-12 17:04:00
 * @Description: const client = new HttpClient('https://api.example.com', 5000);

 * @FilePath: \blog-view\src\api\modules\blog.ts
 */
import {http} from '../httpClient';

/**
 * 博客创建接口
 * @param data:Object 
 * @returns Promise<any> 返回一个Promise对象，用于处理注册操作的结果
 */
export function createApi(data:Object) : Promise<any> {
    return http.post("blog/createBlog", data);
  }

//  
/**
 * @description: 获取全部博客
 * @return {*}
 */
export function getBlogListApi(data:Object) : Promise<any> {
    return http.get("blog/getBlogList",data);
  }




