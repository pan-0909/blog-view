import { message } from "antd";

type Res = {
    status: number; // 状态码
    data: any; // 响应数据
}

export function judgeErr(res: Res) {
    const showMessage = (type: 'success' | 'error'|'warning', content: string) => {
        message[type](content);
    };

    if (res.status === 200) {
        return showMessage('success', res.data.msg);
    } else {
        return showMessage('error', res.data.msg);
    }
}