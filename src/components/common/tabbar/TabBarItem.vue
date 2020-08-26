<template>
    <div id="tab-bar-item" @click="itemClick">
        <div class="item-icon" v-if='!isActive'><slot name="icon"></slot></div>
        <div class="item-active-icon" v-else><slot name="active-icon"></slot></div>
        <div class="item-text" :class="{active: isActive}"><slot name="text"></slot></div>
    </div>
</template>

<script>
export default {
    name: "TabBarItem",
    props:{
        path: String
    },
    computed:{
        isActive() {
            return this.$route.path.indexOf(this.path) !== -1
        }
    },
    methods: {
        itemClick(){
            this.$router.replace(this.path)
        }
    }
}
</script>

<style scoped>
    #tab-bar-item{
        flex: 1;
        text-align: center;
        height: 49px;
    }
    .item-icon img, .item-active-icon img{
        width: 24px;
        height: 24px;
        margin-top: 5px;
        vertical-align: middle;
    }
    .item-text{
        font-size: 12px;
        margin-top: 3px;
        color: #333;
    }
    .active{
        color:red;
    }
</style>