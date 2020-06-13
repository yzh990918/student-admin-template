<template>
  <div class="dashboard-container">
    <dataPanel :count-data="countData" />
    <div v-if="roles[0] === 'student'" class="line-chart-wrapper">
      <lineCharts :line-charts-data="LineChartsData" />
    </div>
    <div v-if="roles[0] === 'student'" class="pipe-wrapper">
      <pipeCharts :sum="courseCount" :pipe-data="pipeData" />
    </div>
    <div v-if="roles[0] === 'admin'" class="info-wrapper">
      <info role-text="系统超级管理员" />
      <div class="options">
        <banner />
        <optionsButtons />
      </div>

    </div>
    <div v-if="roles[0] === 'teacher'" class="info-wrapper">
      <TeacherInfo />
      <div class="options">
        <banner />
        <teacherOptionsButtons />
      </div>

    </div>
  </div>
</template>

<script>
import dataPanel from './components/data-panel'
import banner from './components/banner'
import info from './components/admin/info'
import lineCharts from './components/lineCharts'
import pipeCharts from './components/pipe'
import optionsButtons from './components/option-buttons'
import teacherOptionsButtons from './components/teacher/option-buttons'
import { Student } from '@/model/student'
import { Admin } from '@/model/admin'
import { mapGetters } from 'vuex'
import TeacherInfo from './components/teacher/info'

export default {
  name: 'Dashboard',
  components: {
    dataPanel,
    lineCharts,
    pipeCharts,
    teacherOptionsButtons,
    info,
    banner,
    optionsButtons,
    TeacherInfo
  },
  data() {
    return {
      countData: [],
      LineChartsData: {},
      pipeData: [],
      courseCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'roles'
    ])
  },
  mounted() {
    this.initData()
    this.initCountData()
  },
  methods: {
    async initData() {
      if (this.roles[0] === 'student') {
        const res = await Student.getScoreDistribute(this.userInfo.sno)
        if (res.code === 200) {
          this.pipeData = res.data.distribute
          const averageScoreArray = res.data.scoreData.map(item => item.courseAvg)
          const courseArray = res.data.scoreData.map(item => item.courseName)
          const acturalScoreArray = res.data.scoreData.map(item => item.score)
          this.LineChartsData = {
            'averageScoreArray': averageScoreArray,
            'courseArray': courseArray,
            'acturalScoreArray': acturalScoreArray
          }
        } else {
          this.$message.error(res.msg)
        }
      } else {
        return
      }
    },

    async initCountData() {
      const res = await Admin.getCountData()
      if (res.code === 200) {
        this.countData = res.data
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  padding: 32px;
  box-sizing: border-box;
  width: 100%;
  background-color: rgb(240, 242, 245);
  .line-chart-wrapper{
    background: #ffffff;
    padding: 16px 16px 0;
    margin-bottom: 12px;
    margin-top: 10px;
  }
  .pipe-wrapper{
    padding: 16px 16px 0 16px;
    background: #ffffff;
  }
  .info-wrapper{
    width: 100%;
    display: flex;
    .options{
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>
