/*
 * @Author: pan
 * @Date: 2024-03-12 20:52:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-12 21:14:13
 * @Description: 论坛中心
 * @FilePath: \blog-view\src\component\HeaderNav\index.tsx
 */

import "./index.sass"
import { Link } from 'react-router-dom';
const HeaderNav = () => {
    const menuList = [
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

    return (<>
        <div>
            <>
                <div className="navBigBox">
                    {
                        menuList.map((value) => (
                            <div>
                                <Link to={value.key}></Link>
                                {value.label}
                            </div>
                        ))
                    }
                </div>
            </>
        </div>
    </>)
}

export default HeaderNav;