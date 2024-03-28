/*
 * @Author: panrunjun
 * @Date: 2023-08-24 21:14:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-28 20:26:00
 * @Description: 
 * @FilePath: \blog-view\src\views\blogDetail\index.tsx
 */
import { json, useLocation } from 'react-router-dom';
import { Avatar, Card, Divider, Input } from 'antd';
import './index.scss'
import { blogApi } from '@/api/httpApi';
import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { getcommentListByBlogIdApi } from '@/api/modules/blog';
import { useMessage } from '@/hooks/useMessage';
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
        commentNum: 0,
        commentList: []
    });
    const getDetail = async () => {
        const res = await blogApi.getBlogByIdApi(_id);
        console.log(res);
        setBlogDetail(res.data)
    }
    useEffect(() => {
        getDetail()
    }, [])

    interface Comment {
        username:string
        faceImg:string,
        createTime:string,
        content:string
    }
    const [inputValue, setInputValue] = useState('')
    const userId = localStorage.getItem('userId')
    const userInfo = localStorage.getItem('userInfo')
    const { username, faceImg, email } = JSON.parse(userInfo as string);
    console.log(username);
    const { showSuccess, showError } = useMessage();
    const sendInput = () => {
        console.log(inputValue);
        getcommentListByBlogIdApi({ blogId: _id, content: inputValue, userId, username, faceImg, email }).then(res => {
            console.log(res);
            if (res.status === 200) {
                showSuccess(res.data.msg)
                setInputValue('')
                getDetail()
            } else {
                showError(res.data.msg)
            }

        })

    }
    const inputChange = (e: any) => {
        setInputValue(e.target.value);
    };
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
        <div>{blogDetail.createTime}</div>
        <div style={{ margin: '20px' }}>评论区</div>
        {/* 评论区 */}
        <div className='commentList'>
            {
                blogDetail.commentList.map((item: Comment) => (
                    <div style={{margin:'10px'}}>
                        <div className='userInfo'>
                            <Avatar size={40} icon={<UserOutlined />} />
                            <div>{item.username}</div>  
                            <div className='createTime'>{item.createTime}</div>
                        </div>
                        <div style={{ marginLeft: '50px', fontSize: '19px' }}>
                            {item.content}
                        </div>
                        <Divider />
                    </div>
                ))
            }
            <Input placeholder="回车发送" allowClear size='large' onPressEnter={sendInput} value={inputValue} onChange={inputChange} />
        </div>
    </>)
}

export default BlogDetail