<template>
  <div class="container">
    <div class="inner-conatiner" :style="{height: type === 1? '1120px':'820px'}">
      <div class="button-wrapper">
        <el-button
          class="button"
          type="primary"
          plain
          @click="ToLogin()"
        >登录</el-button>
        <el-button class="button" type="primary">注册</el-button>
      </div>
      <div class="title">
        创建一个账户
      </div>
      <div v-if="type===1" class="content">
        <el-form
          ref="form"
          label-position="top"
          :model="userInfo"
          :rules="rules"
        >
          <el-form-item class="item" label="用户名" prop="username">
            <el-input v-model="userInfo.username" placeholder="邮箱" />
          </el-form-item>
          <el-form-item class="item" label="姓名" prop="name">
            <el-input v-model="userInfo.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item class="item" label="密码" prop="password">
            <el-input
              v-model="userInfo.password"
              show-password
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item class="item" label="重复密码" prop="repassword">
            <el-input
              v-model="userInfo.repassword"
              placeholder="重复密码"
              show-password
            />
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userInfo.gender"
                style="margin-left:6px"
                placeholder="请选择性别"
                prop="gender"
              >
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="学院">
            <el-select v-model="userInfo.college" clearable style="margin-left:6px" placeholder="请选择学院">
              <el-option
                v-for="item in collegeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-select v-model="userInfo.subject" clearable style="margin-left:6px" placeholder="请选择专业">
              <el-option
                v-for="item in subjectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="item" label="电话" prop="mobile">
            <el-input
              v-model="userInfo.mobile"
              show-password
              placeholder="电话号码"
            />
          </el-form-item>
          <el-form-item class="item-b" label="住址" prop="address">
            <el-input
              v-model="userInfo.address"
              placeholder="住址"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              style="width:100%"
              type="primary"
              @click="onSubmit"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 教师注册 -->
      <div v-if="type===2" class="content">
        <el-form
          ref="form"
          label-position="top"
          :model="userInfo"
          :rules="rules"
        >
          <el-form-item class="item" label="用户名" prop="name">
            <el-input v-model="userInfo.name" placeholder="用户名" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              v-model="userInfo.gender"
              style="margin-left:6px"
              placeholder="请选择性别"
              prop="gender"
            >
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="item" label="密码" prop="password">
            <el-input
              v-model="userInfo.password"
              show-password
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item class="item" label="重复密码" prop="repassword">
            <el-input
              v-model="userInfo.repassword"
              placeholder="重复密码"
              show-password
            />
          </el-form-item>
          <el-form-item style="margin-bottom:20px!important" label="职教课程">
            <el-select v-model="userInfo.cno" prop="cno" style="width:430px;height:40px" placeholder="选择课程">
              <el-option
                v-for="item in courseOptions"
                :key="item.name"
                :label="item.name"
                :value="item.cno"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学院">
            <el-select v-model="userInfo.college" clearable style="margin-left:6px" placeholder="请选择学院">
              <el-option
                v-for="item in collegeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width:100%;"
              type="primary"
              @click="onSubmit"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { collegeOptions, subjectOptions, genderOptions } from '@/config/enum'
import { Admin } from '@/model/admin'
import { Student } from '@/model/student'
import { Teacher } from '@/model/teacher'
export default {
  name: '',
  components: {},
  data() {
    const passwordValidator = (rule, value, callback) => {
      if (this.userInfo.password === value) {
        callback()
      } else {
        callback(new Error('密码不符合规范'))
      }
    }
    return {
      genderOptions: genderOptions,
      collegeOptions: collegeOptions,
      subjectOptions: subjectOptions,
      courseOptions: [],
      code: '',
      type: 1,
      userInfo: {
      },
      rules: {
        username: [
          { required: true, message: '邮箱地址为必填项', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        gender: { required: true, message: '性别是必填参数', trigger: 'blur' },
        name: [
          {
            required: true,
            message: '姓名为必填项',
            trigger: 'blur'
          },
          {
            pattern: /^(?!_)(?!.*?_$)(?!\d)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
            message: '昵称不符合规范',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '电话号码为必填参数', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            message: '电话号码不合法',
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '地址为必填参数', trigger: 'blur' },
          {
            pattern: /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
            message: '地址不合法',
            trigger: 'blur'
          }

        ],
        cno: { required: true, message: '课程是必选参数', trigger: 'blur' },
        password: [
          {
            required: true,
            message: '密码为必填项',
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: '密码应包含数字和字母',
            trigger: 'blur'
          }
        ],
        repassword: [
          {
            validator: passwordValidator,
            message: '两次密码不相同哦',
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
    this.type = Number(this.$route.query.type)
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
    ToLogin() {
      this.$router.push('/login')
    },
    async onSubmit() {
      this.$refs.form.validate(async valid => {
        const jobData = await Teacher.getCourseDetail(this.userInfo.cno)
        this.userInfo['job'] = jobData.data[0].name
        if (this.type === 1 || this.type === 2) {
          let res
          if (this.type === 1) {
            res = await Student.register(this.userInfo)
          } else {
            res = await Teacher.register(this.userInfo)
          }
          if (res.code === 200) {
            this.$notify({
              title: '注册成功',
              message: '👽👽👽👽👽👽👽👽👽👽👽👽 ',
              type: 'success'
            })
            this.userInfo = {}
            this.$router.push('/login')
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .inner-conatiner {
    position: relative;
    width: 466px;
    top: 8px;
    height: 1120px;
    background: #ffffff;
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 26px;
    .button-wrapper {
      display: flex;
      justify-content: center;
      padding: 0 71px;
      box-sizing: border-box;
      .button {
        width: 103px;
        margin-left: 0px !important;
        border-radius: 2px;
        height: 38px;
      }
    }
    .title {
      display: flex;
      justify-content: center;
      font-size: 26px;
      color: #6c757d;
      font-weight: 700;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .content {
      .item {
        margin-bottom: 10px;
      }
      .item-b{
        margin-bottom: 30px;
      }
      .item:last-child {
        margin-bottom: 0px;
      }
      .link {
        margin-bottom: 10px;
        font-size: 24px;
      }
    }
  }
}
</style>
