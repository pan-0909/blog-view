/*
 * @Author: xx
 * @Date: 2024-03-18 22:21:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-01 19:36:47
 * @Description: 
 * @FilePath: \blog-view\src\views\user\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Tabs, TabsProps, Divider, Tag, Carousel } from 'antd';
import { PieChartOutlined, MailOutlined, PaperClipOutlined, WechatOutlined, ReadOutlined, GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import './index.css'
import CardComponent from "../../component/Card/index";
import { userApi } from "@/api/httpApi";
import UpdateForm from "./update/index"
import { UserInfo } from '@/types/user';
import reactPng from '@/assets/icons/react.png' 

const User = () => {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || '') as UserInfo);
    const updateUserInfo = () => {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo") as string))
    }
    const onChange = (key: string) => {
        console.log(key);
    };
    const blog = [
        {
            _id: '2',
            title: '标题',
            content: '内容',
            time: "2022-8-12",
            author: 'pan',
            label: 'react'
        },
        {
            _id: '1',
            title: '标题',
            content: '内容',
            time: "2022-8-12",
            author: 'pan',
            label: 'react'
        }, {
            _id: '4',
            title: '标题',
            content: '内容',
            time: "2022-8-12",
            author: 'pan',
            label: 'react'
        },
    ];
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <span>
                    <PieChartOutlined />
                    Count
                </span>
            ),
            children: (<>
                <Carousel autoplay >
                    <div>
                        <img style={{ height: 300, width: '100%' }} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" />
                    </div>
                    <div>
                        <img style={{ height: 300, width: '100%' }} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" />
                    </div>
                </Carousel>
            </>),
        },
        {
            key: '2',
            label: (
                <span>
                    <ReadOutlined />
                    Blog
                </span>
            ),
            children: (<>
                <div className='bodyBox'>
                    <Row gutter={10}  >
                        {blog.map((item) => (
                            <Col span={8} key={item._id} >
                                <CardComponent title={item.title} content={item.content} _id={item._id} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </>),
        },

        {
            key: '3',
            label: (
                <span>
                    <ReadOutlined />
                    update
                </span>
            ),
            children: (<>
                <div className='bodyBox'>
                    <Row gutter={10}  >
                        <UpdateForm handleUpdateUserInfo={updateUserInfo} userInfo={userInfo}></UpdateForm>
                    </Row>
                </div>
            </>),
        },
    ];

    useEffect(() => {
        // setUserInfo(JSON.parse(localStorage.getItem("userInfo") as string))
    }, [])

    return (<>
        <div>
            <Row gutter={20}>
                <Col span={8}>
                    <Card style={{ margin: 20, marginTop: 80 }}>
                        <div style={{ display: 'flex', position: 'absolute', top: -60 }}>
                            <img style={{ height: 150, width: 150, borderRadius: '50%' }} src={userInfo.faceImg} alt="加载失败" />
                            <div >
                                <div style={{ display: 'flex', marginTop: 28, justifyContent: "space-between" }}>
                                    <div style={{ marginLeft: 10, fontSize: 24, fontWeight: 800 }}>{userInfo.username}</div>
                                    {/* <a className='logout'>退出登录</a> */}
                                </div>
                                <div style={{ marginLeft: 10, height: 80 }}>{userInfo.introduction}</div>
                            </div>
                        </div>

                        <Button block style={{ marginTop: 80, backgroundColor: '#f5f5f5' }}>加关注 +</Button>
                        <div style={{ display: 'flex', marginTop: 10 }}>
                            <div >
                                <span >博客数：</span>
                                <span className='spanNumber'>12</span>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <span>粉丝数：</span>
                                <span className='spanNumber'>102</span>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <span>关注数：</span>
                                <span className='spanNumber'>12</span>
                            </div>
                        </div>
                        <Divider />
                        <div className='iconBox'>
                            <GithubOutlined />
                            <span className='iconSpan'>{userInfo.github}</span>
                        </div>
                        <div className='iconBox'>
                            <TwitterOutlined />
                            <span className='iconSpan'>@Pan233</span>
                        </div>
                        <div className='iconBox'>
                            <WechatOutlined />
                            <span className='iconSpan'>www.pan.com</span>
                        </div>
                        <div className='iconBox'>
                            <MailOutlined />
                            <span className='iconSpan'>{userInfo.email}</span>
                        </div>
                        <div className='iconBox'>
                            <PaperClipOutlined />
                            <span className='iconSpan'>www.pan.com</span>
                        </div>
                        <Divider />
                        <Tag color="#60a95f">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4359" width="20" height="20"><path d="M615.6 123.6h165.5L512 589.7 242.9 123.6H63.5L512 900.4l448.5-776.9z" fill="#41B883" p-id="4360"></path><path d="M781.1 123.6H615.6L512 303 408.4 123.6H242.9L512 589.7z" fill="#34495E" p-id="4361"></path></svg>
                                <span>Vue.js</span>
                            </div>
                        </Tag>
                        <Tag color="#55acee">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={reactPng} alt="react" style={{height:'20px'}}  />
                                <span>React.js</span>
                            </div>
                        </Tag>
                    </Card>
                </Col>
                <Col span={16}>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </Col>
            </Row>

        </div>
    </>)
}

export default User;