import React, { useState } from 'react';
import { Card, Input } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import axios from 'axios';
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
const Editor = ({ handelEditorTitle, handleEditorContent }: { handelEditorTitle: (title: string) => void, handleEditorContent: (content: string) => void }) => {
    // 配置quill编辑器
    const quillOption = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ['link', 'image'],
                ['clean']
            ]
        }
    }


    // 标题
    const [title, setTitle] = useState('');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        handelEditorTitle(e.target.value);
    };

    // 富文本框的值
    const [editorState, setEditorState] = useState('');
        handleEditorContent(editorState)

    // 上传图片
    const handleImageUpload = (param: any) => {
        console.log(param);
        const formData = new FormData();
        formData.append('file', param.file);

        axios.post('/api/upload', formData)
            .then((response) => {
                const imageUrl = response.data.imageUrl;
                param.success({
                    url: imageUrl
                });
            })
            .catch((error) => {
                param.error({
                    msg: '上传失败'
                });
            });
    };

    return (
        <>
            <div>
                <Card title={
                    <Input value={title} onChange={handleTitleChange} bordered={false} placeholder="在此输入你的标题" style={{ width: '100%' }} />}
                    style={{ margin: 10 }}>
                    <ReactQuill
                        theme='snow'
                        value={editorState}
                        onChange={setEditorState}
                        modules={quillOption}
                        className='ql-editor'
                    />
                </Card>
            </div>
        </>
    )
}

export default Editor;