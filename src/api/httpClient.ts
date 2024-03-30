import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
const baseURL = import.meta.env.VITE_USER_API_BASE_URL;

//接口地址
const service: AxiosInstance = axios.create({
  baseURL,
  //超时时间
  timeout: 5000,
})


//添加请求连拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {

  //在发送请求之前做些什么
  const token: string | null = localStorage.getItem("token") || null

  if (token) {
    config.headers['Authorization'] = token
  }

  return config
}, (error: AxiosError) => {
  //对请求错误做些什么
  console.log(error, 'request-error')
  return Promise.reject(error)
})


//添加响应拦截器
interface ResponseType {
  data: any,
  status: number,
  statusText: string
}
service.interceptors.response.use((response: ResponseType) => {
  //2xx 范围内的状态码都会触发该函数。
  //对响应数据做点什么
  console.log(response, 'response');
  const { data, status, statusText } = response;
  const res = {
    data,
    status,
    statusText
  }
  return res;
}, (error: AxiosError) => {
  //超出 2xx 范围的状态码都会触发该函数
  //对响应错误做点什么
  console.log(error, 'response-error')

  const { response } = error;
  // 处理 HTTP 网络错误
  let msg = '';

  // HTTP 状态码
  const status = response?.status;

  switch (status) {
    case 401:
      msg = 'token 失效，请重新登录';
      // 这里可以触发退出的 action
      break;
    case 403:
      msg = '拒绝访问';
      break;
    case 404:
      msg = '请求地址错误';
      break;
    case 500:
      msg = '服务器故障';
      break;
    default:
      msg = '网络连接故障';
  }

  console.log(msg, "response-error-msg")
  return response;

})


export const http = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },
  // 新增上传文件方法
  uploadFile<T>(url: string, file: File, config?: AxiosRequestConfig): Promise<T> {
    const formData = new FormData();
    formData.append("file", file); // 将文件添加到 FormData 中
    // 如果需要传递其他参数，也可以在这里添加到 formData 中
    // formData.append('key', value);
    return service.post(url, formData, config); // 发送 POST 请求，传递 FormData
  },
}

export default service;