/*
 * @Author: xx
 * @Date: 2023-10-11 22:22:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-12-16 17:16:56
 * @Description: 
 * @FilePath: \demo\src\router\index.tsx
 */
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../views/home/index'
import User from '../views/user/index.tsx'
import BlogDetail from '../views/blogDetail/index.tsx'
import Write from '../views/write/index.tsx'
import Login from '../views/login/index.tsx';
// // const Home = lazy(()=>import('../views/home'))
function Router() {
    return (
        <Routes>
            {/*实现路由的重定向 */}
            <Route path="*" element={<Home />}></Route>
            {/* 默认路由，实现路由的重定向 */}
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/blogDetail" element={<BlogDetail />} />
            <Route path="/write" element={<Write />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Router