<template>
  <div class="banner">
    <el-carousel type="card" :interval="6000" arrow="always" height="227px">
      <el-carousel-item v-for="(item,index) in imglist" :key="index">
        <img class="img" :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

export default {
  name: '',

  components: {},
  props: {},
  data() {
    return {
      imglist: [
        'https://images4.alphacoders.com/970/970048.jpg',
        'https://images3.alphacoders.com/977/977081.jpg',
        'https://images5.alphacoders.com/929/929203.jpg',
        'https://images3.alphacoders.com/980/980845.jpg',
        'https://images6.alphacoders.com/496/496034.jpg',
        'https://images5.alphacoders.com/532/532651.jpg'
      ]

    }
  },

  computed: {},

  watch: {},
  created() {},

  beforeMount() {},

  mounted() {},

  methods: {}

}

</script>
<style lang='scss' scoped>
.banner{
  margin-left: 20px;
  width: 100%;
  .img{
    width: 100%;
    height: 100%;
  }
}
</style>
