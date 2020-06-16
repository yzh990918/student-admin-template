<template>
  <div class="container">
    <el-form
      ref="form"
      label-position="left"
      :rules="rules"
      :model="courseInfo"
      style="margin-left:30px;"
      label-width="80px"
    >
      <el-form-item label="课程编号" prop="cno">
        <el-input v-model="courseInfo.cno" style="width:430px;height:40px" placeholder="课程编号" />
      </el-form-item>
      <el-form-item label="课程名" prop="name">
        <el-input v-model="courseInfo.name" style="width:430px;height:40px" placeholder="课程名" />
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-input v-model="courseInfo.credit" style="width:430px;height:40px" placeholder="学分" />
      </el-form-item>
      <el-form-item label="学时" prop="period">
        <el-input v-model="courseInfo.period" style="width:430px;height:40px" placeholder="学时" />
      </el-form-item>
      <el-form-item label="封面图">
        <el-image v-if="img!==''" :preview-src-list="srcList" :src="courseInfo.img" class="avatar" @click="handlePreview" />
        <el-upload
          class="avatar-uploader"
          action="https://imgkr.com/api/files/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button slot="trigger" style="width:278px;margin-top:10px;" size="medium" type="primary">上传图片图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="学期" prop="term">
        <el-select v-model="courseInfo.term" placeholder="请选择上课学期">
          <el-option v-for="(item,index) of termOptions" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button style="width:400px" type="primary" @click="submit">确认添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Admin } from '@/model/admin'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      courseInfo: {
      },
      img: '',
      srcList: [],
      termOptions: [
        {
          label: '第一学期',
          value: '第一学期'
        },
        {
          label: '第二学期',
          value: '第二学期'
        }
      ],
      rules: {
        cno: { required: true, message: '课程编号必须填入', trigger: 'blur' },
        name: { required: true, min: 0, message: '课程名不规范', trigger: 'blur' },
        credit: { required: true, message: '学分不规范', trigger: 'blur' },
        period: { required: true, message: '学时不规范', trigger: 'blur' }
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
          const res = await Admin.addCourse(this.courseInfo)
          if (res.code === 200) {
            this.$message.success('添加成功')
            this.courseInfo = {}
            this.img = ''
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 用户头像处理
    handleAvatarSuccess(res, file) {
      this.courseInfo.img = res.data
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
      this.srcList = [this.courseInfo.img]
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
