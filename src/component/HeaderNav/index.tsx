/*
 * @Author: pan
 * @Date: 2024-03-12 20:52:35
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-01 19:13:02
 * @Description: 论坛中心
 * @FilePath: \blog-view\src\component\HeaderNav\index.tsx
 */
import './index.scss'
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
          label: '创作中心',
          key: '/write',
        },
        {
          label: localStorage.getItem("token")&&localStorage.getItem("userInfo")?'个人中心':'登录注册',
          key: localStorage.getItem("token")&&localStorage.getItem("userInfo")?'/user':'/login',
        },
      ];

    return (<>
        <div>
            <>
                <div className="navBigBox">
                    {
                        menuList.map((value) => (
                            <div onClick={() => {console.log(1111);}}>
                                <Link to={value.key}>{value.label}</Link>
                            </div>
                        ))
                    }
                </div>
            </>
        </div>
    </>)
}

export default HeaderNav;