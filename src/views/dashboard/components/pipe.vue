<template>
  <div class="chart" style="width:100%;height:550px" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/resize'
export default {
  name: '',
  components: {},
  mixins: [resize],
  props: {
    pipeData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },

  computed: {},

  watch: {},
  created() {},

  beforeMount() {},

  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    // 初始化图表
    initChart() {
      setTimeout(() => {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions()
      }, 500)
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: '学生课程分数情况图',
          subtext: '仅供参考',
          left: 'center'
        },
        // 配置提示
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 选项卡配置
        legend: {
          // horizontal为横轴
          orient: 'veritcal',
          // 图例组件离容器左侧的距离
          left: 70,
          top: 40,
          data: ['60-70分课程数', '70-80分课程数', '80-90分课程数', '90-100分课程数', '不及格课程数']
        },
        series: [
          {
            name: '课程分布情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: this.pipeData[1], name: '60-70分课程数' },
              { value: this.pipeData[2], name: '70-80分课程数' },
              { value: this.pipeData[3], name: '80-90分课程数' },
              { value: this.pipeData[4], name: '90-100分课程数' },
              { value: this.pipeData[0], name: '不及格课程数' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }

}

</script>
<style lang='scss' scoped>

</style>
