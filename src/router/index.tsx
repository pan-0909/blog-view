/*
 * @Author: xx
 * @Date: 2023-10-11 22:22:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-12 20:52:13
 * @Description: 
 * @FilePath: \blog-view\src\router\index.tsx
 */
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../views/home/index'
import User from '../views/user/index.tsx'
import BlogDetail from '../views/blogDetail/index.tsx'
import Write from '../views/write/index.tsx'
import Login from '../views/login/index.tsx';
import Forum from '../views/forum/index';
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
            <Route path="/forum" element={<Forum />} />
        </Routes>
    );
}

export default Router