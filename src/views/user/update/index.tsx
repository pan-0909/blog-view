import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  SelectProps,
  Upload,
} from 'antd';
import {  useNavigate  } from 'react-router-dom';
import PModel from '@/component/PModel';
import {typePModel} from '@/model/PModel';
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
interface ChildRef extends typePModel{
    showModal():void;
}
const UpdateForm: React.FC = () => {
const navigate = useNavigate();
const childRef = useRef<ChildRef>();
function showModel(){
    if (childRef.current) {
      childRef.current.showModal();
  }
}

function logout() {
  console.log('logout');
  localStorage.removeItem('token');
  navigate('/login');
}

 

  return (
    <>
    
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ width: 800 }}
      >
        <Form.Item label="username">
          <Input />
        </Form.Item>
        <Form.Item label="github">
          <Input />
        </Form.Item>
        <Form.Item label="email">
          <Input />
        </Form.Item>
        <Form.Item label="标签">
          <Select
            mode="multiple"
            options={options}>
          </Select>
        </Form.Item>
        <Form.Item label="个人介绍">
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item label="头像" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传头像</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item >
          <Button type='link'>确 定</Button>
          <Button type='link' danger onClick={showModel}>退出登录</Button>
        </Form.Item>
      </Form>
      <PModel title={'确定要退出登录吗？'} ref={childRef} onParentOk={logout} ></PModel>
    </>
  );
};



export default () => <UpdateForm />;