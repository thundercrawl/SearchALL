//引入axios
import Vue from 'vue';
import axios from 'axios';
import Config from './config';
import Tools from './tools';
import { Message } from 'element-ui';
import router from './router';

let cancel, promiseArr = {};
let CancelToken = axios.CancelToken;

// download url
const downloadUrl = url => {
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function() {
        document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
}


axios.defaults.baseURL = Config.serviceUrl;
//携带cookie
// axios.defaults.withCredentials=true;
//设置默认请求头
axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8'
};
axios.defaults.timeout = 10000;
//请求拦截器
axios.interceptors.request.use(config => {
    // 若是有做鉴权token , 就给头部带上token
    if ((config.url.indexOf('/login') > 0)) {
        config.headers['accessToken'] = localStorage.accessToken;
        console.log("handle login url token:" + config.url + "  accessToken:" + config.headers.accessToken)
    } else {
        config.headers['accessToken'] = localStorage.accessToken;
        config.headers.Authorization = localStorage.Authorization;
        config.headers.JSESSIONID = localStorage.token;

    }

    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消');
        promiseArr[config.url] = cancel;
    } else {
        promiseArr[config.url] = cancel;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    if (!Tools.isEmpty(response.data)) {
        localStorage.token = response.data.token;
    }

    // 处理excel文件

    //if (response.headers && (response.headers['content-type'] === 'application/x-msdownload' || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    //   console.log("find excel respond")
    //   downloadUrl(response.request.responseURL)

    //    response.data = '';
    //   response.headers['content-type'] = 'text/json'
    //   return response;
    // }
    return response;
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求';
                break;
            case 401:
                error.message = '未授权，请重新登录';
                break;
            case 403:
                error.message = '拒绝访问';
                break;
            case 404:
                error.message = '请求错误,未找到该资源';
                break;
            case 405:
                error.message = '请求方法未允许';
                break;
            case 408:
                error.message = '请求超时';
                break;
            case 500:
                error.message = '服务器端出错';
                break;
            case 501:
                error.message = '网络未实现';
                break;
            case 502:
                error.message = '网络错误';
                break;
            case 503:
                error.message = '服务不可用';
                break;
            case 504:
                error.message = '网络超时';
                break;
            case 505:
                error.message = 'http版本不支持该请求';
                break;
            default:
                error.message = '连接错误';
        }
    } else {
        error.message = "连接到服务器失败";
    }
    Message.error(error.message);
    return Promise.resolve(error.response);
});

function handlerFail(response, failFun) {
    let resCode = response.code;
    if ('200001' === resCode || '200002' === resCode ||
        '200003' === resCode || '200004' === resCode) {
        // 登录失败 验证失败等处理
        router.push('/login');
    } else {

        failFun(response);
    }
}


export default {
    //get请求
    get(url, param, successFun, failFun) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c;
                })
            }).then(res => {
                if (res.data.success) {
                    successFun(res.data);
                } else {
                    if (res.message != undefined)
                        Message.error("操作失败:" + res.message)
                    if (res.success != undefined && success === false)
                        Message.error("操作失败:" + res.message)
                    handlerFail(res.data, failFun);
                }
            });
        });
    },
    //post请求
    post(url, param, successFun, failFun) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param,
                cancelToken: new CancelToken(c => {
                    cancel = c;
                })
            }).then(res => {
                if (res.data.success) {
                    successFun(res.data);
                } else {

                    if (res.data.message != undefined)
                        Message.error("操作失败:" + res.data.message)

                    handlerFail(res.data, failFun);
                }
            });
        });
    }
}