/*
 * @Author: panrunjun
 * @Date: 2024-03-28 13:16:48
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-30 22:32:21
 * @Description: 
 * @FilePath: \blog-view\src\hooks\useStore.ts
 */
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'

// hook函数
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
