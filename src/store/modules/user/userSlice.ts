
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '@/store'
import { getUserInfoApi } from '@/api/modules/user'

export interface UserInfo {
    username: string,
    createTime: string,
    email: string,
    github: string,
    introduction: string,
    label: Array<string>,
    faceImg: string,
}

export interface userState {
    userInfo: UserInfo
}

const initialState: userState = {
    userInfo: {
        username: '',
        createTime: '',
        email: '',
        github: '',
        introduction: '',
        label: [],
        faceImg: '',
    }
}

/**
 * @description: 异步获取用户数据
 * @return {*} userInfo
 * @author: pan
 */
export const fetchUserInfo = createAsyncThunk('user/userInfo', async () => {
    const response = await getUserInfoApi();
    return response.data;
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 当 fetchBlogList 的异步操作成功完成时，执行使用新的userinfo数据替换现有的状态
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                console.log(action.payload, 111);
                state.userInfo = action.payload; // 使用新的userinfo数据替换现有的状态
                console.log({ ...state.userInfo }); //解析出Proxy对象

            });
    },
})

// 设置userinfo的数据（结合hook函数useAppSelector使用）
export const setUserInfo = (state: RootState) => state.user.userInfo
export default userSlice.reducer
