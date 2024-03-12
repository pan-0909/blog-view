/*
 * @Author: pan
 * @Date: 2024-03-12 20:28:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-12 20:42:25
 * @Description: 
 * @FilePath: \blog-view\src\views\write\index copy.tsx
 */
import { Button, Select, SelectProps, Space } from 'antd';
import React from 'react';
import Editor from '../../utils/Editor/index'
import 'braft-editor/dist/index.css';
import { blogApi } from "../../api/httpApi";
import '../../api/httpApi.ts'
function Write() {
    // 接收子组件返回来的值
    const EditorTitleValue = (value: string) => {
        console.log(value);
        title = value
    };
    let title = ''
    let content = ''
    let label:string[] =[]
    const EditorContentValue = (value: string) => {
        content = value
    }

    // 处理标签类型
    const handleTypeChange = (selectedLabel: string[]) => {
        console.log(selectedLabel,111); // 或其他处理逻辑
        label = selectedLabel
      };

    // 提交blog
    const submit = () => {
        console.log(content);
        console.log(title);
        const author = '1'
        const userId = '2'
        blogApi.createApi({ title, content,author,userId,label }).then(res => {
            console.log(res);
        })

    }
    return (
        <div>
            <Editor handelEditorTitle={EditorTitleValue} handleEditorContent={EditorContentValue} />
            <TypeSelect onTypeChange={handleTypeChange}></TypeSelect>
            <Button type="primary" style={{marginLeft: '10px'}} onClick={submit}>提 交</Button>
        </div>
    );
}
interface TypeSelectProps {
    onTypeChange: (selectedLabel: string[]) => void;
  }
// 下拉框
function TypeSelect({ onTypeChange } : TypeSelectProps) {
    const options: SelectProps['options'] = [];
    options.push({
        label: '前端',
        value: '前端',
    },
    {
        label: '后端',
        value: '后端',
    });
    // for (let i = 10; i < 36; i++) {
    //     options.push({
    //         label: i.toString(36) + i,
    //         value: i.toString(36) + i,
    //     });
    // }
    return (
        <>
            <Select
                mode="multiple"
                style={{ width: '400px' }}
                placeholder="Please select"
                // defaultValue={['a10', 'c12']}
                onChange={onTypeChange}
                options={options}
            />
        </>
    )
}

export default Write;
