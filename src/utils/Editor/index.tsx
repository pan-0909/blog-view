import React, { useState } from 'react';
import { Card, Input } from 'antd';
import 'braft-editor/dist/index.css';
import axios from 'axios';
import ReactQuill from 'react-quill'
import 'quill/dist/quill.snow.css'
import './index.css'
const Editor = ({ handelEditorTitle, handleEditorContent }: { handelEditorTitle: (title: string) => void, handleEditorContent: (content: string) => void }) => {
    // 配置quill编辑器
    const quillOption = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],//几级标题
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }], //列表
                [{ script: 'sub' }, { script: 'super' }], // 上下标
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                // 工具栏配置项
                ['link', 'image', 'code-block', 'blockquote', 'formula', 'video'],
                ['emoji'], //emj图案
                ['clean']
            ]
        }
    }

    


    // const options = {
    //     minHeight: "200px",
    //     debug: 'warn',
    //     modules: {
    //         'emoji-toolbar': true,  //是否在工具栏展示出来
    //         "emoji-textarea": true, //我不需要emoji展示在文本框所以设置为false
    //         "emoji-shortname": true,
    //         toolbar: {
    //             container,
    //             handlers: {
    //                 // 'image':this.selectImage.bind(this)
    //                 'image': () => {
    //                     // this.refs.uploadRef.click()
    //                 }
    //             }
    //         },
    //         imageDrop: true,//这里的imageDrop名字要和上面的'modules/imageDrop'一样

    //     },
    //     placeholder: '请输入文本...',
    //     readOnly: false,
    //     theme: 'snow',

    // }






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
                        placeholder="输入正文..."
                        // className='ql-editor'
                        // style={{minHeight:'200px'}}
                    />
                </Card>

            </div>
        </>
    )
    
}

export default Editor;