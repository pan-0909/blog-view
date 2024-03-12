import React, { useState } from 'react';
import { Card, Input } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import axios from 'axios';
const Editor = ({ handelEditorTitle, handleEditorContent }: { handelEditorTitle: (title: string) => void, handleEditorContent: (content: string) => void }) => {

    // 标题
    const [title, setTitle] = useState('');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setTitle(e.target.value);
        handelEditorTitle(e.target.value);
    };

    // 富文本框的值
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
    const handleEditorChange = (newEditorState: any) => {
        setEditorState(newEditorState);
        const content = editorState.toHTML();  //获取富文本的内容
        handleEditorContent(content)
    };


    // 上传图片
    const handleImageUpload = (param:any) => {
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
                    {/* <Editor onValueChange={handleValueChange}></Editor> */}
                    <BraftEditor
                        value={editorState}
                        onChange={handleEditorChange}
                        media={{ uploadFn: handleImageUpload }}
                        placeholder="请输入正文..."
                    />
                </Card>
            </div>
        </>
    )
}

export default Editor;