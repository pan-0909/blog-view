import { http } from "../httpClient";


/**
 * @description: 上传图片接口
 * @param {Object} file 二进制
 * @author: pan
 */
export function uploadApi(data: File): Promise<any> {
    return http.uploadFile("upload/upload", data);
}
