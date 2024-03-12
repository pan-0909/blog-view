/*
 * @Author: xx
 * @Date: 2023-08-24 21:14:59
 * @LastEditors: your name
 * @LastEditTime: 2024-03-12 14:06:29
 * @Description: 
 * @FilePath: \blog-view\src\views\home\index.tsx
 */
import { Button, Col, Input, Row } from "antd";
import React from "react";
// import { Component, useState } from "react";
import './index.scss'
import NavigateCompont from '../../component/Menu/List.tsx'
// import  Router  from "../../router/index.tsx";
// import BlogDetail from '../blogDetail/index.tsx'
import CardComponent from "../../component/Card/index.tsx";
import { blogApi } from "@/api/httpApi.ts";
// import { blogApi } from "../../api/httpApi.ts";
const Home = () => {
    const blog = [
        {
            id: 1,
            title: '标题',
            content: '内容',
            time: "2022-8-12",
            author: 'pan',
            label: 'react'
        },
    ];
    blogApi.getBlogListApi().then((res) => {
        console.log(res);
    });

    return (<>
        <div className="header">
            <div className="navBox">
                <Input className="Search" placeholder="输入回车搜索" />
                <div className="nav">
                    <NavigateCompont></NavigateCompont>
                </div>
            </div>
            <div className="titleBox">
                <div className="title">项目地址</div>
                <Button type="primary">Get Star ⭐</Button>
            </div>
        </div>
        <div className='blogBox'>
            {/* <Router /> */}
            {/* <h1>文章列表</h1> */}
            <Row gutter={10}  >
            {blog.map((item, index) => (
                <Col span={6}  key={item.id} >
                <CardComponent title={item.title} content={item.content} />
                </Col>
            ))}
            </Row>
        </div>
    </>)
}

export default Home