<template>
  <div class="container">
    <el-form
      ref="form"
      label-position="left"
      :rules="rules"
      :model="teacherInfo"
      style="margin-left:30px;"
      label-width="80px"
    >
      <el-form-item label="教师编号" prop="tno">
        <el-input v-model="teacherInfo.tno" style="width:430px;height:40px" placeholder="教师编号" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="teacherInfo.name" style="width:430px;height:40px" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="teacherInfo.password" show-password style="width:430px;height:40px" placeholder="密码" />
      </el-form-item>
      <el-form-item label="头像">
        <el-image
          v-if="img!==''"
          :preview-src-list="srcList"
          :src="teacherInfo.avatar"
          class="avatar"
          @click="handlePreview"
        />
        <el-upload
          class="avatar-uploader"
          action="https://imgkr.com/api/files/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button slot="trigger" style="width:258px;margin-top:10px;" size="medium" type="primary">上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="teacherInfo.gender" placeholder="请选择性别">
          <el-option v-for="(item,index) of genderOptions" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="职教课程">
        <el-select v-model="teacherInfo.cno" prop="cno" style="width:430px;height:40px" placeholder="选择课程">
          <el-option
            v-for="item in courseOptions"
            :key="item.name"
            :label="item.name"
            :value="item.cno"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="teacherInfo.college" prop="cno" style="width:430px;height:40px" placeholder="选择课程">
          <el-option
            v-for="item in collegeOptions"
            :key="item.name"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" style="width:400px" @click="submit">确认添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Admin } from '@/model/admin'
import { Teacher } from '@/model/teacher'
import { collegeOptions } from '@/config/enum'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      teacherInfo: {
      },
      collegeOptions: collegeOptions,
      img: '',
      srcList: [],
      courseOptions: [],
      showImagePreview: false,
      genderOptions: [{
        label: '男',
        value: 0
      }, {
        label: '女',
        value: 1
      }],
      rules: {
        id: { required: true },
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            pattern: /^(?!_)(?!.*?_$)(?!\d)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
            message: '昵称不符合规范',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: '密码应该包含数字和字母',
            trigger: 'blur'
          }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'email', message: '请输入邮箱格式的用户名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            message: '请输入合法的电话号码',
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入家庭住址', trigger: 'blur' },
          {
            pattern: /^(?!_)(?!.*?_$)(?!\d)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
            message: '家庭住址不符合规范',
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
    this.initCourseData()
  },

  methods: {
    async initCourseData() {
      const courseData = await Admin.getCourseList(0, 100)
      if (courseData.code === 200) {
        this.courseOptions = courseData.data.items
      } else {
        this.$message.error(courseData.msg)
      }
    },

    submit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const jobData = await Teacher.getCourseDetail(this.teacherInfo.cno)
          this.teacherInfo['job'] = jobData.data[0].name
          const res = await Teacher.register(this.teacherInfo)
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.teacherInfo = {}
            this.img = ''
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 用户头像处理
    handleAvatarSuccess(res, file) {
      this.teacherInfo.avatar = res.data
      this.img = res.data
    },
    beforeAvatarUpload(file) {
      const formatType = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!formatType) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return formatType && isLt2M
    },
    handlePreview() {
      this.srcList = [this.teacherInfo.avatar]
    }

  }

}

</script>
<style lang='scss' scoped>
.container{
  display: flex;
  justify-content: flex-start;
  padding: 32px;
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
