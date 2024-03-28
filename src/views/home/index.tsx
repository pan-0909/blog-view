/*
 * @Author: pan
 * @Date: 2023-08-24 21:14:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-28 20:46:56
 * @Description: 
 * @FilePath: \blog-view\src\views\home\index.tsx
 */
import { Button, Col, Input, Row } from "antd";
// import { Component, useState } from "react";
import './index.scss'
import NavigateCompont from '../../component/Menu/List'
// import  Router  from "../../router/index.tsx";
// import BlogDetail from '../blogDetail/index.tsx'
import CardComponent from "@/component/Card/index";
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useStore'
import { Blog, fetchBlogList, setBlogList } from "@/store/modules/blog/blogSlice";
const Home = () => {

    useEffect(() => {
        dispatch(fetchBlogList());
      }, []);
    const dispatch = useAppDispatch()
    const blogList = useAppSelector(setBlogList)
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
                <Button type="primary"><a href="https://github.com/pan-0909/blog-view">Get Star ⭐</a></Button>
            </div>
        </div>
        <div className='blogBox'>
            {/* <Router /> */}
            {/* <h1>文章列表</h1> */}
            <Row gutter={10}  >
                {blogList.map((item: Blog) => (
                    <Col span={6} key={item._id} >
                        <CardComponent title={item.title} content={item.content} _id={item._id} likes={item.likes} commentNum={item.commentNum} />
                    </Col>
                ))}
            </Row>
        </div>
    </>)
}

export default Home