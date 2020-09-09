import {request} from './request'

export function getHomeMultidata(){
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page){//传参和域名后缀？？？？？？？？
    return request({
        url:'/home/data',
        params: {
            type,
            page//和上面两个参数对应？？？？？？？？
        }
    })
}