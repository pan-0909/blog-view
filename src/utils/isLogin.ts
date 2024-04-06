/*
 * @Author: panrunjun
 * @Date: 2024-04-02 17:08:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-02 17:13:32
 * @Description: 判断用户是否登录
 * @FilePath: \blog-view\src\utils\isLogin.ts
 */
/**
 * @description: 判断用户是否登录
 * @return {Boolean} true:已经登录 false:未登录
 * @author: panrunjun
 */
const isLogin = () => {
    console.log(localStorage.getItem('userInfo'));
    if(localStorage.getItem('token') === null && localStorage.getItem('useInfo') === null){
        return false
    }else{
        return true
    }
}

export default isLogin