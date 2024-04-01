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
    commentNum:number
}