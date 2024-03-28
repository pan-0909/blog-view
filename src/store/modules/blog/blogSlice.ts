/*
 * @Author: panrunjun
 * @Date: 2024-03-28 13:06:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-28 17:59:15
 * @Description: 博客的state
 * @FilePath: \blog-view\src\store\modules\blog\blogSlice.ts
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '@/store'
import { blogApi } from '@/api/httpApi'

export interface Blog {
    _id: string,
    title: string,
    label: Array<string>,
    content: string,
    createTime: string,
    author: string,
    userId: number,
    likes: number,
    likedBy: object,
    collects: number,
    collectedBy: object
}

export interface BlogState {
    blogList: Array<Blog>
}

const initialState: BlogState = {
    blogList: []
}


// 获取博客初始值
// 定义一个异步的 thunk action creator
export const fetchBlogList = createAsyncThunk('blogs/fetchBlogList', async () => {
    const response = await blogApi.getBlogListApi();
    return response.data;
});

export const blogSlice = createSlice({
    name: 'bloger',
    initialState,
    reducers: {
        increLike: (state, action) => {
            const { id } = action.payload;
            const updatedBlogs = state.blogList.map(blog => {
                if (blog._id === id) {
                    const updatedBlog = {
                        ...blog,
                        likes: blog.likes + 1 // 将点赞数加1
                    };
                    return updatedBlog;
                }
                return blog;
            });
            state.blogList = updatedBlogs;
        },
        decreLike: (state, action) => {
            const { id } = action.payload;
            const updatedBlogs = state.blogList.map(blog => {
                if (blog._id === id) {
                    console.log(blog.likes - 1,222);
                    const updatedBlog = {
                        ...blog,
                        likes: blog.likes - 1  // 将点赞数减1
                    };
                    return updatedBlog;
                }
                console.log({ ...blog }, 2221); // 输出不包含 Proxy 的新对象
                return blog;
            });
            state.blogList = updatedBlogs;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogList.fulfilled, (state, action) => {
                state.blogList = action.payload; // 使用新的博客数据替换现有的状态
            });
    },
})

export const { increLike, decreLike } = blogSlice.actions

export const setBlogList = (state: RootState) => state.bloger.blogList

export default blogSlice.reducer
