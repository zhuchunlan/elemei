<template>
    <swiper class="clothes">
        <swiper-item v-for="item in topImages" :key="item.index">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper'

export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        topImages: {
            type: Array,
            default(){
                return []
            }
        }
    }

}
</script>

<style scoped>
.clothes{
    height: 300px;
    overflow: hidden;
}
</style>