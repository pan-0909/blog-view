/*
 * @Author: panrunjun
 * @Date: 2024-03-18 22:21:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-02 14:17:20
 * @Description: 弹出模块 父组件需要绑定ref
 * @FilePath: \blog-view\src\component\PModel.tsx
 */
import { Modal } from "antd";
import React, { useImperativeHandle } from "react";
import { useState } from "react";
import {typePModel} from "@/types/PModel";
// 


  
  const PModel = React.forwardRef((props:typePModel,ref)=>{

    useImperativeHandle(
        ref,
        () => ({ showModal }) //父组件通过ref获取值，要在这里抛出
      );
      

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
      props.onParentOk()
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
         <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确定" cancelText="取消">
          <p>{props.content}</p>
        </Modal>
      </>
    )
  })

  export default PModel;