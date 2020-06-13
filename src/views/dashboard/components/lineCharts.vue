<template>
  <div class="chart" style="width:100%;height:450px" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/resize'
export default {
  mixins: [resize],
  props: {
    lineChartsData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  // 组件销毁 清空图表提高性能
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
        this.setOptions(this.lineChartsData)
      }, 500)
    },
    // 配置项
    //  expectedData: [100, 120, 161, 134, 105, 160, 165],
    //   actualData: [120, 82, 91, 154, 162, 140, 145]
    setOptions(lineChartsData) {
      this.chart.setOption({
        // x轴
        xAxis: {
          data: lineChartsData.courseArray,
          // 不显示标尺
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        // 网格分布
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        // 提示信息
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        // 点击可切换折线图显示的选项
        legend: {
          data: ['平均分', '实际得分']
        },
        // 数据配置
        series: [{
          name: '平均分', itemStyle: {
            // 拐点颜色和线颜色
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: lineChartsData.averageScoreArray,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '实际得分',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: lineChartsData.acturalScoreArray,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
