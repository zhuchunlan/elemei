<template>
    <div class="bsae-info">
        <div class="info-title">{{goodData.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goodData.newPrice}}</span>
            <span class="o-price">{{goodData.oldPrice}}</span>
            <span class="discount">{{goodData.discount}}</span>
        </div>
        <div class="info-other" v-if="goodData.columns">
            <span>{{goodData.columns[0]}}</span>
            <span>{{goodData.columns[1]}}</span>
            <span>{{goodData.columns[goodData.columns.length-1]}}</span>
        </div>
        <div class="info-service" >
            <span class="info-service-item" v-for="(item,index) in goodData.services" :key="index">
                <img v-if="item.icon" :src="item.icon" alt="">
                <span>{{item.name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailBaseInfo',
    props:{
        goods:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    data(){
        return{
            goodData:{}
        }
    },
    watch:{//监听数据的变化，也就是说开始的时候goods是空的，异步请求数据完成之后，goods才有数据
    //我们需要监听数据的变化
       goods(val){//val参数就是我们监听的goods数据,函数名也要和数据名称对应
           this.goodData={...val}
       } 
    }
 

}
</script>

<style scoped>
.base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
}
.info-title{
    color: #222;
}
.info-price{
    margin-top: 10px;
}
.info-price .n-price{
    font-size: 24px;
    color: tomato;
}
.info-price .o-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
}
.info-price .discount{
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: #ff5777;
    border-radius: 8px;
    margin-left: 5px;
    position: relative;
    top: -8px;
}
.info-other{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
}
.info-service{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
}
.info-service-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
}
.info-service-item span{
    font-size: 13px;
    color: #333;
}
</style>