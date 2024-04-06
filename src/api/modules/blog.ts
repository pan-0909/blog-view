/*
 * @Author: panrunjun
 * @Date: 2023-12-16 16:46:51
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-02 16:34:15
 * @Description: const client = new HttpClient('https://api.example.com', 5000);

 * @FilePath: \blog-view\src\api\modules\blog.ts
 */
import { http } from "../httpClient";

/**
 * 博客创建接口
 * @param data:Object
 * @returns Promise<any> 返回一个Promise对象，用于处理注册操作的结果
 */
export function createApi(data: Object): Promise<any> {
  return http.post("blog/createBlog", data);
}

//
/**
 * @description: 获取全部博客
 * @return {*}
 */
export function getBlogListApi(): Promise<any> {
  return http.get("blog/getBlogList");
}

/**
 * @description: 获取单个博客
 * @param {string} _id
 * @return {*}
 */
export function getBlogByIdApi(_id: string): Promise<any> {
  console.log(_id);
  return http.get(`blog/getBlogById/${_id}`);
}

// 点赞or取消 lickBlog
export function lickBlogApi(data: Object): Promise<any> {
  console.log(data);
  return http.post(`blog/lickBlog`,data);
}

// 根据博客id插入评论
export function getcommentListByBlogIdApi(data: Object): Promise<any> {
  console.log(data);
  return http.post(`blog/getcommentListByBlogId`,data); 
}

// 根据userId获取个人博客
export function getBlogByUserIdApi(data: Object): Promise<any> {
  console.log(data);
  return http.post(`blog/getBlogByUserId`,data); 
}

/**
 * @description: 删除某个
 * @param {string} _id
 */
 export function deleteBlogByIdApi(_id: string): Promise<any> {
  console.log(_id);
  return http.delete(`blog/deleteBlog/${_id}`);
}
