/*
 * @Author: xx
 * @Date: 2023-08-24 22:41:56
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-28 20:47:15
 * @Description: card卡片
 * @FilePath: \blog-view\src\component\Card\index.tsx
 */
import React, { useState } from 'react';
import { Card, Avatar, Popover, Button } from 'antd';
import { EllipsisOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { blogApi } from '@/api/httpApi';
import { useMessage } from "@/hooks/useMessage";
import { decreLike, increLike } from '@/store/modules/blog/blogSlice';
import { useAppDispatch } from '@/hooks/useStore';

const CardComponent = ({ title, content, _id, likes ,commentNum}: { title: string, content: string, _id: string, likes: number,commentNum:number }) => {
  const navigate = useNavigate()
  // 使用redux
  const dispatch = useAppDispatch()
  const { showSuccess, showError } = useMessage();
  const { Meta } = Card;

  /**
   * @description: 获取详情携带id
   * @param {*} _id string
   */
  const getDetail = (_id: string) => {
    navigate('/BlogDetail', { state: { _id: _id } })
  }

  // 点赞方法
  const likeClick = (event: any, id: string) => {
    // 阻止冒泡事件
    event.stopPropagation();
    blogApi.lickBlogApi({ blogId: id }).then(res => {
      console.log(res);
      if (res.status === 200) {
        // setNewLikes(likes++)
        showSuccess(res.data.msg)
        console.log(res.data.msg);
        
        if (res.data.msg == "点赞成功！") {
          dispatch(increLike({ id }))
        } else if (res.data.msg == "取消点赞成功！") {
          dispatch(decreLike({ id }))
        } else {
          showError(res.data.msg)
        }
        // 调用父组件传递的回调函数，更新父组件的 likes 属性
      } else {
        showError(res.data.msg)
      }
    })

  }

  /**
   * @description: 卡片气泡内容
   */
  const PopoverContent = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <>
      <Card
        onClick={getDetail.bind(null, _id)}
        hoverable
        style={{ margin: '5px 0px' }}
        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" style={{ height: '170px' }} />}
        actions={[
          <div onClick={(event: any) => { likeClick(event, _id) }}>
            <LikeOutlined />
            <span style={{ marginLeft: '7px', fontSize: '10px' }}>{likes}</span>
          </div>,
          <div>
            <CommentOutlined />
            <span style={{ marginLeft: '7px', fontSize: '10px' }}>{commentNum}</span>
          </div>,
          <Popover content={PopoverContent} title="操作" trigger="hover">
            <EllipsisOutlined key="ellipsis" />
          </Popover>
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={title} description={<div dangerouslySetInnerHTML={{ __html: content }}></div>}
        />
      </Card>
    </>
  )

}

export default CardComponent;