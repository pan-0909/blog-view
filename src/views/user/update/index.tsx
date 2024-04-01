/*
 * @Author: xx
 * @Date: 2024-03-18 22:21:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-01 18:39:30
 * @Description: 
 * @FilePath: \blog-view\src\views\user\update\index.tsx
 */
import React, { useRef, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  SelectProps,
  Upload,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import PModel from '@/component/PModel';
import { typePModel } from '@/types/PModel';
import { useMessage } from '@/hooks/useMessage';
import UploadOne from '@/component/Upload/UploadOne';
import { updateUserInfoApi } from '@/api/modules/user';
import { UserInfo } from '@/types/user';
const { TextArea } = Input;
const normFile = (e: { fileList: any; }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const options: SelectProps['options'] = [];
options.push(
  {
    label: '前端',
    value: '前端',
  },
  {
    label: '后端',
    value: '后端',
  }
);
// 继承类型
interface ChildRef extends typePModel {
  showModal(): void;
}
const UpdateForm = ({handleUpdateUserInfo,userInfo}:{handleUpdateUserInfo:Function,userInfo:UserInfo}) => {
  const { showSuccess, showError } = useMessage();
  
  const navigate = useNavigate();
  const childRef = useRef<ChildRef>();
  function showModel() {
    if (childRef.current) {
      childRef.current.showModal();
    }
  }

  function logout() {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userId');
    navigate('/login');
  }
  const [imageUrl, setImageUrl] = useState('');
  // 定义回调函数，用于接收子组件传递的头像url
  const handleImgUrlChange = (value: string) => {
    console.log(value);
    setImageUrl(value);
  };

  type FormType = {
    username: string;
    github: string;
    email: string;
    label: Array<string>;
    introduction: string;
    faceImg: string;
  };
  const onFinish = (values: FormType) => {
    console.log(values);
    values.faceImg = imageUrl
    updateUserInfoApi(values).then(res=>{
      console.log(res);
      if(res.status===200){
        localStorage.setItem("userInfo",JSON.stringify(values))
        handleUpdateUserInfo()
        showSuccess(res.data.msg)
      }else{
        showError(res.data.msg)
      }
    })
  }

  return (
    <>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        style={{ width: 800 }}

        // 设置初始值
        initialValues={{
          username:userInfo.username,
          github:userInfo.github,
          email:userInfo.email,
          label:userInfo.label,
          introduction:userInfo.introduction,
        }}
      >
        <Form.Item<FormType> label="username" name="username">
          <Input/>
        </Form.Item>
        <Form.Item<FormType> label="github" name="github">
          <Input />
        </Form.Item>
        <Form.Item<FormType> label="email" name="email">
          <Input />
        </Form.Item>
        <Form.Item<FormType> label="标签" name="label">
          <Select
            mode="multiple"
            options={options}>
          </Select>
        </Form.Item>
        <Form.Item<FormType> label="个人介绍" name="introduction">
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item<FormType> label="头像" valuePropName="fileList" getValueFromEvent={normFile} name="faceImg">
          <UploadOne onImgUrlChange={handleImgUrlChange} initailImg={userInfo.faceImg}/>
        </Form.Item>  
        <Form.Item>
          <Button type='link' htmlType="submit">确 定</Button>
          <Button type='link' danger onClick={showModel}>退出登录</Button>
        </Form.Item>
      </Form>
      <PModel title={'确定要退出登录吗？'} ref={childRef} onParentOk={logout} ></PModel>
    </>
  );
};



export default UpdateForm;