import axios from 'axios'
import qs from 'qs'
import baseConfig from './base'
import router from '../router/index.js'
// import { Toast } from 'vant'

const instance = axios.create(baseConfig)

// 基础配置
// instance.defaults.baseURL = '';
console.log('instance.defaults.baseURL:', instance.defaults.baseURL);
instance.defaults.timeout = 10000; // 超时时间
instance.defaults.withCredentials = false; // 是否允许携带cookie

// json（默认）
instance.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
// 请求拦截
instance.interceptors.request.use(config => {
    console.log('请求拦截');
    //设置请求头
    if (localStorage.Token) {
        config.headers.Authorization = localStorage.Token
    }
    return config
},
    (error) => {
        console.log('请求拦截2');
        return Promise.reject(error)

    });


/* // form data -> post
import qs from 'qs'; // npm install --save qs
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截
instance.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
});
*/

// 响应拦截
instance.interceptors.response.use(response => {
    console.log('响应拦截',response);
    const { status } = response;
    if (status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    console.log('响应拦截2',error);
    if (error.response.status) {
        switch (error.response.status) {
            // 未登录
            case 401:
            // 登录失效
            case 403:
            // Not Found
            case 404:
                localStorage.removeItem('eToken')
                //跳转到登录页面
                router.push('/login')
                break;
            // 服务器错误
            case 500:
                break;
            default:
                break;
        }
        return Promise.reject(error.response);
    }
});

export default instance;
