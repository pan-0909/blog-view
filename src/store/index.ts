/*
 * @Author: panrunjun
 * @Date: 2024-03-28 13:02:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-30 22:32:48
 * @Description: 
 * @FilePath: \blog-view\src\store\index.ts
 */
import { blogApi } from '@/api/httpApi'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './modules/counter/counterSlice'
import blogReducer from './modules/blog/blogSlice'
import userReducer from './modules/user/userSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bloger:blogReducer,
    user:userReducer
  }
})

// AppDispatch: 这个类型别名定义了 store.dispatch 函数的类型
export type AppDispatch = typeof store.dispatch

// RootState: 这个类型别名定义了应用的根状态的类型
export type RootState = ReturnType<typeof store.getState>

// AppThunk: 这个类型别名定义了 Redux 中异步 action creator 的类型
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
