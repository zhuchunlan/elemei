<template>
    <div class="goods-item">
        <img :src="goodsItem.show.img" alt="" @load="imageLoad"> 
                                            <!-- @load监听图片加载完成 -->
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name :'GoodsListItem',
    props: {
        goodsItem: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        imageLoad(){
            this.$bus.$emit('itemImageLoad') 
             //this.$bus事件总线  
             //要把GoodsListItem.vue中的图片加载事件传到Home.vue中，不是父子组件之间的通信，所以用事件总线
           
        }
    }
}
</script>

<style scoped>
    .goods-item{
        /* padding: 40px; */
        position: relative;
        width: 50%;
        padding: 4px;
        padding-bottom: 40px;
    }
    .goods-item img{
        width: 100%;
    }
    .goods-info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .goods-info .price{
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .collect{
        position: relative;
    }
    .goods-info .collect::before{
        content: '';
        position: absolute;
        left: -15px;
        top: 0;
        width: 14px;
        height: 14px;
        background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
    }

</style>