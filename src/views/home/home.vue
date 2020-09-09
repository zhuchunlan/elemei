<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabclick"
                    ref="tabControl1" 
                    class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type='3' 
            @scroll='contentScroll' 
            :pull-up-load='true'
            @pullingUp='loadmore'>
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabclick"
                    ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "../../network/home"; //用default导出才不用{}
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      //data用于存储res的结果 只保存我想要的banners recommends
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop:0,
      isTabFixed: false
    };
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted(){
    //3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad', ()=>{
      this.$refs.scroll.scroll.refresh()  //this.$refs不能放在created里面
          // 用bsscroll时图片卡顿问题，是因为在图片加载完之前bsscroll就已经把要滚动的区域计算出来了，
          // 等到图片加载之后，实际滚动的区域远远大于之前计算好的区域，所以就拉不动了。
          // 所以要监听每张图片的加载完成然后重新计算滚动区域
    })
  },
  methods: {
    // 事件监听相关方法
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },
    backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,300)
    },
    contentScroll(position){
      //1.判断BackTop是否显示
       this.isShowBackTop = (-position.y) > 1000

       //2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadmore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
       //获取tabControl中的offsetTop
       //所有组件都有一个属性$el：用于获取组件中的元素
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* position: relative; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control{
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>