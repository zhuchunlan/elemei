<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content">
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info  :goods='goods'></detail-base-info>
            <detail-shop-info :shop='shop'></detail-shop-info>
            <detail-goods-info :detail-info='detailInfo'></detail-goods-info>
            <detail-param-info :param-info='paramInfo'></detail-param-info>
            <detail-comment-info :comment-info='commentInfo'></detail-comment-info>
            <goods-list :goods='recommends'></goods-list>
        </scroll>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from '../../components/common/scroll/Scroll'
import GoodsList from '../../components//content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'


export default {
    name: 'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        GoodsList 
    },
    data(){
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends:[]
        }
    },
    created(){
        // 1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            //获取顶部的图片轮播数据
            const data = res.result
            this.topImages = data.itemInfo.topImages
                
            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

           //创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            //保存商品的详情数据
            this.detailInfo = data.detailInfo

            //获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            //取出评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
        })
        //3.请求推荐数据
        getRecommend().then(res => {
            console.log(res)
            this.recommends = res.data.list
        })
    }

}
</script>

<style scoped>
    .detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 44px);
    }
</style>