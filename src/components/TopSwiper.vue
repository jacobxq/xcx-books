<template>
  <div class="swiper">
    <swiper 
      :indicator-dots='true'
      indicator-color='#EA5A49'
      :autoplay='true'
      :interval='6000'
      :duration='1000'
      :circular='true'
    >
      <div v-for="(item, imgindex) in books" :key="imgindex">
        <swiper-item>
          <img class="slide-image" :src="book.image" v-for="book in item" :key="book.id">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped lang="scss">
  .swiper{
    margin-top:5px;
    .slide-image {
      width:33%;
      height:250rpx;
      padding: 20rpx;
      box-sizing: border-box;
    }
  }
</style>
