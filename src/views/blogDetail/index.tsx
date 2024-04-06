/*
 * @Author: panrunjun
 * @Date: 2023-08-24 21:14:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-02 17:19:08
 * @Description: 
 * @FilePath: \blog-view\src\views\blogDetail\index.tsx
 */
import { json, useLocation } from 'react-router-dom';
import { Avatar, Button, Card, Divider, Input } from 'antd';
import './index.scss'
import { blogApi } from '@/api/httpApi';
import { useEffect, useRef, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { deleteBlogByIdApi, getcommentListByBlogIdApi } from '@/api/modules/blog';
import { useMessage } from '@/hooks/useMessage';
import PModel from '@/component/PModel';
import { typePModel } from '@/types/PModel';
import isLogin from '@/utils/isLogin';
const BlogDetail = () => {
    // 获取路由参数
    const location = useLocation();
    const _id = location.state._id as string;
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
        username: string
        faceImg: string,
        createTime: string,
        content: string
    }
    const [inputValue, setInputValue] = useState('')

    const { showSuccess, showError } = useMessage();
    const sendInput = () => {
        console.log(inputValue);
        if (!isLogin()) {
            return showError("请先登录后评论!")
        }
        const userId = localStorage.getItem('userId')
        const userInfo = localStorage.getItem('userInfo')
        const { username, faceImg, email } = JSON.parse(userInfo as string) || null;
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

    interface ChildRef extends typePModel {
        showModal(): void;
    }
    const childRef = useRef<ChildRef>();
    function showModel() {
        if (childRef.current) {
            childRef.current.showModal();
        }
    }

    const deleteBlog = () => {
        console.log(_id);
        deleteBlogByIdApi(_id).then(res => {
            console.log(res);
            if (res.status === 200) {
                showSuccess(res.data.msg)
                window.history.back(); // 返回上一页
            } else {
                showError(res.data.msg)
            }

        })
    }
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

        {/* 时间和删除 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{blogDetail.createTime}</div>
            <Button type="link" danger onClick={showModel}>
                删除
            </Button>
        </div>

        <PModel title='确定删除此博客吗?' ref={childRef} onParentOk={deleteBlog}></PModel>

        <div style={{ margin: '20px' }}>评论区</div>
        {/* 评论区 */}
        <div className='commentList'>
            {
                blogDetail.commentList.map((item: Comment) => (
                    <div style={{ margin: '10px' }}>
                        <div className='userInfo'>
                            {
                                item.faceImg ? <img src={item.faceImg} alt="头像" style={{ height: '40px', borderRadius: '50%' }} /> : <Avatar size={40} icon={<UserOutlined />} />
                            }
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