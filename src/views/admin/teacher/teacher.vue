<template>
  <div class="container">
    <div class="content">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="序号" prop="id" align="center" width="100" />
        <el-table-column label="教师编号" prop="tno" align="center" min-width="120px">
          <template slot-scope="scope">
            <span style="color:#409EFF;font-size:16px;font-weight:500">{{ scope.row.tno }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名" prop="name" min-width="120px">
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="学院"
          prop="college"
          align="center"
          min-width="120px"
        >
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.college }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任教课程" prop="subject" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#409EFF;font-size:16px;font-weight:500">{{ scope.row.job }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任教课程编号" align="center" prop="mobile" min-width="100">
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.cno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="gender" align="center" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.gender === 0" type="primary">男</el-tag>
            <el-tag v-if="scope.row.gender === 1" type="danger">{{ scope.row.gender === 1?'女':'' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="头像" prop="avatar" align="center" width="90">
          <template slot-scope="scope">
            <img width="40px" height="40px" :src="scope.row.avatar" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="270" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" @click="confirmEdit(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="OndeleteOne(row)">
              删除
            </el-button>
          </template>
        </el-table-column></el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :background="true"
        :page-sizes="[10,15,20,25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 编辑框 -->
    <el-dialog title="修改教师身份信息" width="40%" :visible.sync="dialogFormVisible" :show-close="true">
      <el-form
        ref="form"
        label-position="left"
        :rules="rules"
        :model="teacherInfo"
        style="margin-left:30px;"
        label-width="80px"
      >
        <el-form-item label="默认id" prop="id">
          <el-input v-model="teacherInfo.id" style="width:330px;height:40px" :disabled="true" placeholder="id" />
        </el-form-item>
        <el-form-item label="教师编号" prop="tno">
          <el-input v-model="teacherInfo.tno" style="width:330px;height:40px" placeholder="教师编号" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="teacherInfo.name" style="width:330px;height:40px" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="teacherInfo.password" show-password style="width:330px;height:40px" placeholder="密码" />
        </el-form-item>
        <el-form-item label="头像">
          <el-image :preview-src-list="srcList" :src="teacherInfo.avatar" class="avatar" @click="handlePreview" />
          <el-upload
            class="avatar-uploader"
            action="https://imgkr.com/api/files/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button slot="trigger" style="width:178px;margin-top:10px;" size="medium" type="primary">更换图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="teacherInfo.gender" placeholder="请选择性别">
            <el-option v-for="(item,index) of genderOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="职教课程">
          <el-select v-model="teacherInfo.cno" prop="cno" style="width:330px;height:40px" placeholder="选择课程">
            <el-option
              v-for="item in courseOptions"
              :key="item.name"
              :label="item.name"
              :value="item.cno"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Admin } from '@/model/admin'
import { Teacher } from '@/model/teacher'
export default {
  name: '',

  components: {},
  props: {},
  data() {
    return {
      listLoading: false,
      totalPage: 0,
      dialogFormVisible: false,
      totalCount: 0,
      page: 0,
      pageSize: 10,
      list: [],
      srcList: [],
      teacherInfo: {},
      courseOptions: [],
      genderOptions: [{
        label: '男',
        value: 0
      }, {
        label: '女',
        value: 1
      }],
      rules: {
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
        ]
      }
    }
  },
  mounted() {
    this.initData()
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
    // 初始化分页数据
    async initData() {
      this.listLoading = true
      const res = await Admin.getTeacherList(this.page, this.pageSize)
      if (res.code === 200) {
        this.totalPage = res.data.total_page
        this.totalCount = res.data.total
        this.listLoading = false
        this.list = res.data.items
      } else {
        this.$message.error(res.msg)
      }
    },
    // 监听分页器分页大小
    handleSizeChange(value) {
      this.pageSize = value
      this.initData()
    },
    // 监听当前页改变
    handleCurrentChange(value) {
      this.page = value - 1
      this.initData()
    },
    async confirmEdit(row) {
      this.initCourseData()
      const teacherPaswordData = await Admin.getPassword(row.name)
      this.teacherInfo = Object.assign({}, row)
      this.teacherInfo['password'] = teacherPaswordData.data
      this.dialogFormVisible = true
    },
    // 修改
    async modifyInfo() {
      const jobData = await Teacher.getCourseDetail(this.teacherInfo.cno)
      this.teacherInfo['job'] = jobData.data[0].name
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const res = await Admin.modifyTeacher(this.teacherInfo)
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.dialogFormVisible = false
            this.teacherInfo = {}
            this.initData()
          } else {
            this.$message.error(res.msg)
            this.teacherInfo = {}
            this.dialogFormVisible = false
          }
        }
      })
    },
    // 删除
    async OndeleteOne(row) {
      const id = row.id
      this.$confirm('确定要删除这位教师信息吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await Admin.deleteTeacher(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 然后刷新数据
        this.initData()
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消删除'
        })
      })
    },
    // 用户头像处理
    handleAvatarSuccess(res, file) {
      this.teacherInfo.avatar = res.data
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
  padding: 32px;
}
.pagination{
  margin-top: 20px;
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
