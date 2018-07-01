<template>
  <div>
    <TopSwiper :books="topList"></TopSwiper>
  </div>
</template>

<script>
import ajax from '@/api/ajax'
import TopSwiper from '@/components/TopSwiper'
export default {
  data () {
    return {
      data: 'msg',
      topList: []
    }
  },
  components: {
    TopSwiper
  },
  methods: {
    async getTopList () {
      let res = await ajax({
        url: '/weapp/top'
      })
      this.topList = this._chunk(res.list, 3)
      console.log(this.topList)
    },
    _chunk (arr, size) {
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))
    }
  },
  beforeMount () {
    this.getTopList()
  }
}
</script>

<style scoped>
</style>
