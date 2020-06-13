<template>
  <div class="banner">
    <el-carousel :interval="6000" arrow="always" height="477px">
      <el-carousel-item v-for="(item,index) in imglist" :key="index">
        <img width="1094px" height="477px" :src="item" alt="">
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
        'https://images3.alphacoders.com/980/980845.jpg'
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
  margin-left: 30px;
  width: 100%;
}
</style>
