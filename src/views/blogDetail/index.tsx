/*
 * @Author: xx
 * @Date: 2023-08-24 21:14:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-30 21:54:12
 * @Description: 
 * @FilePath: \demo\src\views\blogDetail\index.tsx
 */
import React from "react";
import { Card, Space } from 'antd';
import './index.css'
const BlogDetail = () => {
    return (<>
        <Card style={{ margin: '20px' }}>
            <h1>1.文本识别算法理论</h1>
           <span>#<span className="label">Card content</span></span>
        </Card>
    </>)
}

export default BlogDetail