import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Tabs, TabsProps, Divider, Tag, Carousel } from 'antd';
import { PieChartOutlined, MailOutlined, PaperClipOutlined, WechatOutlined, ReadOutlined, GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import './index.css'
import CardComponent from "../../component/Card/index";
import { userApi } from "@/api/httpApi";
import UpdateFrom from "./update/index"
const User = () => {
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
                        <img style={{height:300,width:'100%'}} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt=""  />
                    </div>
                    <div>
                        <img style={{height:300,width:'100%'}} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt=""  />
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
                                <CardComponent title={item.title} content={item.content} _id={item._id}/>
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
                       <UpdateFrom></UpdateFrom>
                    </Row>
                </div>
            </>),
        },
    ];
    interface UserInfo {
        username:string,
        createTime:string,
        email:string,
        github:string,
        introduction:string,
        label:Array<string>,
        faceImg:string,
    }
    const [userInfo,setUserInfo] = useState<UserInfo>({
        username:'',
        createTime:'',
        email:'',
        github:'',
        faceImg:'',
        introduction:'',
        label:[]

    })
    useEffect(()=>{
        userApi.getUserInfoApi().then((res)=>{
            console.log(res);
            setUserInfo(res.data)
        })
    },[])

    return (<>
        <div>
            <Row gutter={20}>
                <Col span={8}>
                    <Card style={{ margin: 20, marginTop: 80 }}>
                        <div style={{ display: 'flex', position: 'absolute', top: -60 }}>
                            <img style={{ height: 150, width: 150, borderRadius: '50%' }} src={userInfo.faceImg} alt="加载失败" />
                            <div >
                                <div style={{display: 'flex',marginTop: 28,justifyContent:"space-between"}}>
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
                        <Tag color="#55acee">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg  className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5351" width="20" height="20"><path d="M512 511.8m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z" fill="#61DAFB" p-id="5352"></path><path d="M960.5 511.8c0-62.8-73.8-117.2-188.5-150.1 28.9-115.8 18.7-206.9-35.7-238.3-54.5-31.4-138.5 5.3-224.3 88.2-85.8-82.9-169.8-119.6-224.3-88.2-54.4 31.4-64.6 122.6-35.7 238.3C137.3 394.6 63.5 449 63.5 511.8S137.3 629 252 661.9c-28.9 115.7-18.7 206.9 35.7 238.3 13.4 7.8 28.6 11.6 45.2 11.6 39.7 0 87.8-21.8 140-64.2 13-10.6 26.1-22.6 39.1-35.2 13 12.6 26.1 24.6 39.1 35.2 52.2 42.4 100.2 64.2 140 64.2 16.6 0 31.8-3.8 45.2-11.6 54.4-31.4 64.6-122.5 35.7-238.3 114.7-32.9 188.5-87.3 188.5-150.1zM716.8 157.2c35.3 20.4 42.7 94.3 17.6 194.8-36.7-8.4-76.7-14.7-119.3-18.6-24.7-34.9-50.2-66.4-75.8-94 59.2-57.3 114.2-88.4 152-88.4 9.6-0.1 18.2 2 25.5 6.2zM637 584c-13.8 24-28.4 47-43.3 69-26.1 2-53.3 3.1-81.7 3.1-28.3 0-55.5-1.1-81.6-3.1-15-22-29.5-45.1-43.3-69-14.1-24.5-26.7-48.6-38.1-72.2 11.4-23.6 24-47.7 38.1-72.2 14.1-24.5 28.7-47.4 43.4-69.1 26.1-2 53.3-3.1 81.6-3.1 28.3 0 55.5 1.1 81.6 3.1 14.7 21.6 29.3 44.6 43.4 69 14.1 24.5 26.7 48.6 38.1 72.2-11.5 23.7-24.1 47.8-38.2 72.3z m58.8-26.4c11.2 26.6 20.4 52.1 28 76.5-24.9 5.6-51.7 10.4-80.3 14 9.3-14.5 18.4-29.3 27.3-44.6 8.8-15.4 17.1-30.7 25-45.9zM512 756.5c-17.7-19.2-35.1-40.1-52.2-62.6 17.1 0.8 34.5 1.3 52.2 1.3 17.7 0 35.1-0.5 52.2-1.3-17.1 22.5-34.5 43.4-52.2 62.6zM380.5 648.1c-28.6-3.6-55.3-8.4-80.3-14 7.6-24.4 16.8-49.9 28-76.5 7.9 15.2 16.1 30.5 25 45.9 8.9 15.2 18 30 27.3 44.6zM328.2 466c-11.2-26.6-20.4-52.1-28-76.5 24.9-5.6 51.6-10.4 80.2-14-9.2 14.4-18.4 29.2-27.2 44.6-8.8 15.4-17.1 30.7-25 45.9zM512 267.1c17.3 18.7 34.8 39.8 52.1 62.7-17.1-0.8-34.4-1.3-52.1-1.3-17.7 0-35 0.5-52.1 1.3 17.3-22.9 34.8-44 52.1-62.7z m158.7 153c-8.9-15.3-18-30.1-27.2-44.6 28.6 3.6 55.3 8.4 80.2 14-7.6 24.4-16.8 49.9-28 76.5-7.8-15.2-16.1-30.5-25-45.9zM307.2 157.2c7.2-4.2 15.8-6.2 25.6-6.2 37.8 0 92.7 31.1 151.9 88.4-25.6 27.6-51.1 59.2-75.8 94-42.5 3.9-82.6 10.2-119.3 18.6-25.1-100.6-17.6-174.5 17.6-194.8zM102.5 511.8c0-40.8 60.3-84.2 160-112.6 11.1 36 25.6 73.8 43.5 112.6-17.8 38.8-32.4 76.6-43.5 112.6-99.7-28.4-160-71.9-160-112.6z m345.8 305.5c-59.7 48.5-111.1 66.4-141.1 49.2-35.3-20.4-42.7-94.3-17.6-194.8 36.7 8.4 76.7 14.7 119.3 18.6 24.4 34.5 49.9 66.1 75.8 94.2-12.1 11.7-24.2 22.9-36.4 32.8z m268.5 49.2c-29.9 17.3-81.4-0.6-141.1-49.2-12.1-9.9-24.3-21.1-36.5-32.8 26-28.1 51.4-59.7 75.8-94.2 42.5-3.9 82.6-10.2 119.3-18.7 25.2 100.6 17.7 174.5-17.5 194.9z m44.8-242.1c-11.1-36-25.6-73.8-43.5-112.6 17.8-38.8 32.4-76.6 43.5-112.6 99.7 28.5 160 71.9 160 112.6-0.1 40.7-60.4 84.2-160 112.6z" fill="#61DAFB" p-id="5353"></path></svg>
                                <span>React.js</span>
                            </div>
                        </Tag>
                        <Tag color="#60a95f">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg  className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4359" width="20" height="20"><path d="M615.6 123.6h165.5L512 589.7 242.9 123.6H63.5L512 900.4l448.5-776.9z" fill="#41B883" p-id="4360"></path><path d="M781.1 123.6H615.6L512 303 408.4 123.6H242.9L512 589.7z" fill="#34495E" p-id="4361"></path></svg>
                                <span>Vue.js</span>
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