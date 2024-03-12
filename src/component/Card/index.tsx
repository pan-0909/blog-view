/*
 * @Author: xx
 * @Date: 2023-08-24 22:41:56
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-12-16 18:33:15
 * @Description: card卡片
 * @FilePath: \demo\src\component\Card\index.tsx
 */
import React from 'react';
import { Card, Avatar, Popover, Button } from 'antd';
import { EllipsisOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const CardComponent = ({ title, content }:{title: string, content: string}) => {
  const navigate = useNavigate()
  const { Meta } = Card;

  /**
   * @description: 获取详情
   * @param {*} e
   */
  const getDetail = (e: any) => {
    console.log(e);
    navigate('/BlogDetail')
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

        onClick={getDetail.bind(null, title)}
        hoverable
        style={{ margin: '5px 0px' }}
        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" style={{ height: '170px' }} />}
        actions={[
          <div>
            <LikeOutlined />
            <span style={{ marginLeft: '7px', fontSize: '10px' }}>2</span>
          </div>,
          <div>
            <CommentOutlined />
            <span style={{ marginLeft: '7px', fontSize: '10px' }}>2</span>
          </div>,
          <Popover content={PopoverContent} title="操作"  trigger="hover">
            <EllipsisOutlined key="ellipsis" />
          </Popover>
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={title} description={content}
        />
      </Card>
    </>
  )

}

export default CardComponent;