/*
 * @Author: pan
 * @Date: 2023-08-24 21:14:59
 * @LastEditors: your name
 * @LastEditTime: 2024-03-13 10:14:27
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
import { blogApi } from "@/api/httpApi";
import  { useState, useEffect } from 'react';
const Home = () => {
    
    interface Blog {
        id: string,
        title:string,
        label:Array<string>,
        content:string,
        createTime: string,
        author: string,
        userId: number,
        likes: { type: number, default: 0 },
        likedBy: object,
        collects: number,
        collectedBy: object
    }
    const [blogList, setBlogList] = useState<Blog[]>([]);
  useEffect(() => {
    blogApi.getBlogListApi({}).then((res:any) => {
      setBlogList(res.data as Blog[]);
    });
    
  }, []);

  console.log(blogList);
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
                {blogList.map((item:Blog) => (
                    <Col span={6} key={item.id} >
                        <CardComponent title={item.title} content={item.content} />
                    </Col>
                ))}
            </Row>
        </div>
    </>)
}

export default Home