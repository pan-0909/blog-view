/*
 * @Author: xx
 * @Date: 2023-08-24 21:14:59
 * @LastEditors: your name
 * @LastEditTime: 2024-03-13 14:52:26
 * @Description: 
 * @FilePath: \blog-view\src\views\blogDetail\index.tsx
 */
import { useLocation } from 'react-router-dom';
import { Card } from 'antd';
import './index.css'
import {blogApi} from '@/api/httpApi';
import { useEffect, useState } from 'react';
const BlogDetail = () => {
    // 获取路由参数
    const location = useLocation();
    const _id = location.state._id;
    const [blogDetail, setBlogDetail] = useState({
        title: '',
        content: '',
        label: [],
        author: '',
        createTime: '',
      });
    const getDetail = async () => {
        const res = await blogApi.getBlogByIdApi(_id);
        console.log(res);
        setBlogDetail(res.data)
    }
    useEffect(() => {
        getDetail()
    }, [])
    return (<>
        <Card style={{ margin: '20px' }}>
            <h1>{blogDetail.title}</h1>
            {
                blogDetail.label.map((item, index) => ((
                    <span>#<span className="label" key={index}>{item}</span></span>
                ))
                    
                )
            }
        </Card>
        <div dangerouslySetInnerHTML={{ __html: blogDetail.content }}></div>
        <div>{blogDetail.createTime }</div>
    </>)
}

export default BlogDetail