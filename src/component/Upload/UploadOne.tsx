/*
 * @Author: xx
 * @Date: 2024-03-30 11:49:52
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-01 18:47:57
 * @Description: 
 * @FilePath: \blog-view\src\component\Upload\UploadOne.tsx
 */
import { uploadApi } from '@/api/modules/upload';
import { useMessage } from '@/hooks/useMessage';
import { Upload } from 'antd';
import React, { useRef, useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';



const UploadOne = ({ onImgUrlChange,initailImg }: { onImgUrlChange: Function,initailImg:string }) => {
    const [imageUrl, setImageUrl] = useState(initailImg); // 用于存储上传成功后的图片地址
    onImgUrlChange(imageUrl)
    const [loading, setLoading] = useState(false);  // 用户上传图片的加载

    const { showSuccess, showError } = useMessage();
    // 处理文件上传成功后的响应
    const handleuploadChange = (info: any) => {
        setLoading(true);
        return;
    }
    const uploadImg = (info: any) => {
        uploadApi(info.file).then(res => {
            if (res.status === 200) {
                setImageUrl(res.data);
                onImgUrlChange(res.data)
                showSuccess("上传图片成功！")
            } else {
                showError("上传图片失败，请重新上传！")
            }
            setLoading(false);
        })
    }

    // 上传之前限制图片
    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            showError("你只能上传 JPG/PNG 文件！")
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            showError("图片大小必须小于 2MB！")
        }
        return isJpgOrPng && isLt2M;
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传头像</div>
        </button>
    );

    return (
        <>
            <Upload
                listType="picture-card"
                showUploadList={false}
                customRequest={uploadImg}
                beforeUpload={beforeUpload}
                onChange={handleuploadChange}
                maxCount={1}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </>
    )
}




export default UploadOne;