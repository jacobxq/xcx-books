<script>
import ajax from './api/ajax'
export default {
  async created () {
    let res = await ajax({
      url: '/weapp/demo'
    })
    console.log('小程序启动了')
  }
}
</script>
