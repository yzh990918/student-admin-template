<template>
  <div class="mixin-components-container">
    <el-card>
      <div slot="header" class="header">
        快捷导航
      </div>
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="6" class="text-center">
            <router-link style="min-height:46px" class="pan-btn blue-btn" to="/teacher/student/info">
              学生信息管理
            </router-link>
          </el-col>
          <el-col :span="6" class="text-center">
            <router-link style="min-height:46px" class="pan-btn green-btn" to="/admin/teacher/list">
              教师信息管理
            </router-link>
          </el-col>
          <el-col :span="6" class="text-center">
            <router-link style="min-height:46px" class="pan-btn red-btn" to="/teacher/student/score">
              学生成绩管理
            </router-link>
          </el-col>
          <el-col :span="6" class="text-center">
            <router-link style="min-height:46px" class="pan-btn yellow-btn" to="/admin/course/list">
              课程信息管理
            </router-link>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:20px">
          <el-col :span="6" class="text-center">
            <router-link style="min-height:46px" class="pan-btn light-blue-btn" to="/teacher/student/info/add">
              添加学生
            </router-link>
          </el-col>
          <el-col :span="6" class="text-center">
            <router-link style="min-height:46px" class="pan-btn tiffany-btn" to="/admin/teacher/add">
              添加教师
            </router-link>
          </el-col>
          <el-col :span="6" class="text-center">
            <router-link style="min-height:46px" class="pan-btn pink-btn" to="/teacher/student/score/add">
              学生成绩录入
            </router-link>
          </el-col>
          <el-col :span="6" class="text-center">
            <router-link style="min-height:46px" class="pan-btn blue-btn" to="/admin/course/add">
              添加课程
            </router-link>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: '',

  components: {},
  props: {},
  data() {
    return {

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
.mixin-components-container {
  margin-left: 20px;
  background-color: #f0f2f5;
  width: 100%;
}
.header{
  padding: 10px 0 0 10px;
}
.content{
  padding: 10px;
}
</style>
