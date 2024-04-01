import { useAppSelector } from "@/hooks/useStore";
import { store } from "@/store";
import { setUserInfo } from "@/store/modules/user/userSlice";

/*
 * @Author: panrunjun
 * @Date: 2024-03-30 22:49:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-04-01 15:56:27
 * @Description: 监听页面刷新之后处理store丢失问题(弃用此方法)
 * @FilePath: \blog-view\src\utils\listenRefresh.ts
 */
const setStoreAfterRefresh = () => {
    let userInfo;
    const setStore = () => {
        console.log(111);
  const state = store.getState();
        userInfo = useAppSelector(setUserInfo)
    }
    console.log(userInfo);
    window.addEventListener('beforeunload', setStore);

    // 返回一个清除事件监听器的函数，以便需要时取消监听
    return () => {
        window.removeEventListener('beforeunload', setStore);
    };

}

export default setStoreAfterRefresh;