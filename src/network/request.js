//第三方框架不要直接引入每个文件使用，单独用个文件保存，当有天它不再维护时，方便替换 
import axios from 'axios'

export function request(config){
    //方案一：包装一个promise函数
    // return new Promise((resolve,reject) =>{
    //      创建axios实例
    //     const instance = axios.create({
    //         baseURL: 'http://123.207.32.32:8000',
    //         timeout: 5000
    //     })

        //发送真正的网络请求
        // instance(config)
        // .then(res => {
        //     resolve(res)
        // })
        // .catch(err => {
        //     reject(err)
        // })
    // })


    //方案二：不用包装，instance本身就返回promise函数
    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    
    //2.axios的拦截器 发送拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        return err
    })
    //2.axios的拦截器 响应拦截
    instance.interceptors.response.use(res => {
        return res.data   //一般返回data
    },err => {
        return err
    })


      //3.发送真正的网络请求
    return instance(config)//return instance就是return promise函数
   
}

