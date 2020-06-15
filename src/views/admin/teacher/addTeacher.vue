<template>
  <div class="container">
    <el-form
      ref="form"
      label-position="left"
      :rules="rules"
      :model="userInfo"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userInfo.name" style="width:430px;height:40px" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username" style="width:430px;height:40px" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" style="width:430px;height:40px" placeholder="密码" />
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="userInfo.mobile" style="width:430px;height:40px" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
        <el-input v-model="userInfo.address" style="width:430px;height:40px" placeholder="家庭住址" />
      </el-form-item>
      <el-form-item label="性别" style="margin-top:20px;">
        <el-select v-model="userInfo.gender" style="width:430px;height:40px" placeholder="选择性别">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="userInfo.college" style="width:430px;height:40px" placeholder="选择学院">
          <el-option
            v-for="item in collegeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="userInfo.subject" style="width:430px;height:40px" placeholder="选择专业">
          <el-option
            v-for="item in subjectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-form-item style="margin-top:30px!important">
          <el-button style="width:430px;height:45px;" type="primary" plain @click="submit">确认添加</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { collegeOptions, subjectOptions, genderOptions } from '@/config/enum'
import { Student } from '@/model/student'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {
      },
      genderOptions: genderOptions,
      collegeOptions: collegeOptions,
      subjectOptions: subjectOptions,
      showImagePreview: false,
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

  mounted() {},

  methods: {

    submit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const res = await Student.register(this.userInfo)
          if (res.code === 200) {
            this.$message.success('添加成功')
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
