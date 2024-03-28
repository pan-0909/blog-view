/*
 * @Author: panrunjun
 * @Date: 2024-03-28 13:02:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-28 17:24:06
 * @Description: 
 * @FilePath: \blog-view\src\store\index.ts
 */
import { blogApi } from '@/api/httpApi'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './modules/counter/counterSlice'
import blogReducer from './modules/blog/blogSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bloger:blogReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
