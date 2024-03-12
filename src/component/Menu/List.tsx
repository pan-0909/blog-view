/*
 * @Author: pan
 * @Date: 2023-08-24 22:02:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-12 20:54:01
 * @Description: menu列表组件
 * @FilePath: \blog-view\src\component\Menu\List.tsx
 */
import { Menu } from 'antd';
import React from 'react';
import './list.css'
// 高阶组件，包裹useNavigate()功能
import widthUseNavigate from './widthUseNavigate';
interface ListProps {
  to: (key: string) => void;
}

class List extends React.Component<ListProps> {
    constructor(props:ListProps) {
        super(props);
    }
     menuList = [
        {
          label: '首页',
          key: '/home',
        },
        {
          label: '论坛中心',
          key: '/forum',
        },
        {
          label: '个人中心',
          key: '/user',
        },
        {
          label: '创作中心',
          key: '/write',
        },
        {
          label: '登录注册',
          key: '/login',
        },
      ];
 
    onClick = (e:any) => {
        //注意this指向问题，采用箭头函数this就指向当前组件
        console.log(this,11212);
        
        this.props.to(e.key);
    }
 
    render() {
        return (
            <Menu
            items={this.menuList} mode="horizontal" className='menu' onClick={this.onClick}
            />
        )
    }
}
// 使用高阶组件包裹当前类组件
const NavigateCompont = widthUseNavigate(List);
// 导出包裹后的类组件
export default NavigateCompont;