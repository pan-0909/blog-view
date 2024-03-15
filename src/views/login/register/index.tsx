import { registerApi } from "../../../api/modules/user";
import { Button, Form, Input } from "antd";
import React from "react";
import { useMessage } from "../../../hooks/useMessage";

// 注册模块
export default function RegisterForm(props: { changeLogin: (arg0: boolean) => void; }) {
    const { showSuccess, showError } = useMessage();
    // 提交表单
    const onFinish = (values: any) => {
        registerApi(values).then((res:any)=>{
            if(res.status===200){
                showSuccess(res.data.msg)
                setTimeout(()=>{
                    changeLogin()
                },1000)
            }else{
                showError(res.data.msg)
            }
        })
        
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const changeLogin = ()=>{
        props.changeLogin(true)
    }

    interface FieldType  {
        email?: string;
        username?: string;
        password?: string;
    }
    
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item<FieldType>
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="昵称"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="输入密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="确认密码"
                    name="password2"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} >
                        注册
                    </Button>
                    <Button type="link" htmlType="submit" style={{ marginLeft: '10px' }} onClick={changeLogin}>
                        去登录 {">>"}
                    </Button> 
                </Form.Item>
            </Form>
        </>
    )
}