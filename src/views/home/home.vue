<template>
    <div id="home">
        <nav-bar class='home-nav'><div slot='center'>购物街</div></nav-bar>
        <home-swiper :banners='banners'></home-swiper>
        <recommend-view :recommends='recommends'></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>


        <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li><li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li><li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li><li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
                 <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li><li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>     <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li><li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>     <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li><li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>     <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li><li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
        </ul>
    </div>
</template>

<script>
    import NavBar from '../../components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'
    import TabControl from '../../components/content/tabControl/TabControl'


    import {getHomeMultidata} from '../../network/home'     //用default导出才不用{}
    

    export default {
        name: 'Home',
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl
        },
        data(){
            return{
                //data用于存储res的结果 只保存我想要的banners recommends
                banners: [],
                recommends: []
            }
        },
        created(){
            //1.请求多个数据
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        }
    }
</script>

<style scoped>
#home{
    padding-top: 44px;
}
.home-nav{
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}
.tab-control{
    position: sticky;
    top: 44px;
}

</style>