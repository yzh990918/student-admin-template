<template>
  <div class="container">
    <el-alert type="warning" title="如果该学生这门课程有成绩,则本操作视为修改成绩！" />
    <el-form
      ref="form"
      label-position="left"
      :rules="rules"
      :model="userInfo"
      label-width="80px"
    >
      <el-form-item label="姓名" style="margin-top:20px;">
        <el-select v-model="userInfo.sno" style="width:430px;height:40px" placeholder="选择姓名">
          <el-option
            v-for="item in nameOptions"
            :key="item.sno"
            :label="item.name"
            :value="item.sno"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程名">
        <el-select v-model="userInfo.cno" style="width:430px;height:40px" placeholder="选择课程">
          <el-option
            v-for="item in courseOptions"
            :key="item.cno"
            :label="item.name"
            :value="item.cno"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="得分" prop="score">
        <el-input v-model="userInfo.score" style="width:430px;height:40px" />
      </el-form-item>
      <el-form-item label="">
        <el-button style="width:250px;height:40px" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Student } from '@/model/student'
import { Admin } from '@/model/admin'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      courseOptions: [],
      nameOptions: [],
      userInfo: {},
      rules: {
        score: [
          { required: true, message: '请输入分数', trigger: 'blur' },
          {
            min: 0,
            max: 100,
            message: '输入的分数不合法',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {},

  watch: {},
  created() {},

  beforeMount() {},

  mounted() {
    this.initData()
  },

  methods: {
    async initData() {
      const studentData = await Student.getList(0, 100)
      const courseData = await Admin.getCourseList(0, 100)
      if (studentData.code === 200 && courseData.code === 200) {
        this.courseOptions = courseData.data.items
        this.nameOptions = studentData.data.items
      } else {
        this.$message.error(studentData.msg)
      }
    },
    submit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const res = await Student.modifyScore(this.userInfo)
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.userInfo = {}
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    }

  }

}

</script>
<style lang='scss' scoped>
.container{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
