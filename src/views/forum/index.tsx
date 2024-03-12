/*
 * @Author: pan
 * @Date: 2024-03-12 20:52:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-12 21:03:28
 * @Description: 论坛中心
 * @FilePath: \blog-view\src\views\forum\index.tsx
 */

import { Col, Row } from "antd";
import HeaderNav from "@/component/HeaderNav"
const Forum = () => {



    return (<>
        <div>
            <>
            <HeaderNav></HeaderNav>
                <Row>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                    <Col span={6}>col-6</Col>
                </Row>
            </>
        </div>
    </>)
}

export default Forum;