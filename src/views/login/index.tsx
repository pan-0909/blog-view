/*
 * @Author: xx
 * @Date: 2023-10-12 23:20:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-30 22:35:03
 * @Description: 
 * @FilePath: \blog-view\src\views\login\index.tsx
 */
import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import './index.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import RegisterForm from "./register/index"
import { loginApi } from "../../api/modules/user";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchUserInfo } from "@/store/modules/user/userSlice";
const Login = () => {
    const [loginORRigister, setLoginORRigister] = useState(true)
    

    return (<>
        <div className="body">
            <div className="box">

                <div>
                    <img src="https://img.tukuppt.com/ad_preview/00/10/77/5d79f2925bcd7.jpg!/fw/780" style={{ height: '500px', width: '400px', }} alt="" />
                </div>
                <div className="rightBox">
                    {loginORRigister ? <LoginForm changeLogin={setLoginORRigister}></LoginForm> : <RegisterForm changeLogin={setLoginORRigister}></RegisterForm>}
                </div>
            </div>

        </div>
    </>)
}

// 登录模块
function LoginForm(props: { changeLogin: (arg0: boolean) => void; }) {
    const { showSuccess, showError } = useMessage();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    // 跳转首页
    function goHome() {
        navigate('/home');
    }

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        loginApi(values).then(res => {
            if (res.status === 200) {
                console.log(res);
                showSuccess(res.data.msg)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.userId)
                // 设置userinfo数据
                dispatch(fetchUserInfo());
                localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                setTimeout(() => {
                    goHome()
                }, 1000)
            } else {
                showError(res.data.msg)
            }
        })
    };

    const changeLogin = () => {
        props.changeLogin(false)
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input
                    type=""
                    placeholder="email"
                    prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>


            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Log in
                </Button>
                Or  <Button type="link" onClick={changeLogin}>
                    去注册 {">>"}
                </Button>
            </Form.Item>
        </Form>
    );
}



export default Login


