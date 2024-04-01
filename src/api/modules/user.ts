/*
 * @Author: panrunjun
 * @Date: 2023-12-16 16:46:51
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-01 22:42:36
 * @Description: const client = new HttpClient('https://api.example.com', 5000);

 * @FilePath: \blog-view\src\api\modules\user.ts
 */
import {http} from '../httpClient';

/**
 * 注册用户接口
 * @param data:Object 包含用户注册信息的对象
 * @returns Promise<any> 返回一个Promise对象，用于处理注册操作的结果
 */
export function registerApi(data:Object) : Promise<any> {
    return http.post("user/register", data);
  }

//  登录
export function loginApi(data:Object) : Promise<any> {
    return http.post("user/login", data);
  }

// 查看用户数据getUserInfo
export function getUserInfoApi() : Promise<any> {
  return http.get("user/getUserInfo");
}

//  修改用户数据
export function updateUserInfoApi(data:Object) : Promise<any> {
  return http.post("user/updateUserInfo", data);
}

// 


