<template>
  <div class="container">
    <el-alert style="margin-top:-20px;margin-bottom:10px;" type="error" title="删除课程操作需要慎重,因为删除课程后,学生选修成绩可能会出现异常情况" />
    <div class="content">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 90%;"
      >
        <el-table-column label="序号" prop="id" align="center" width="100" />
        <el-table-column label="课程编号" prop="cno" align="center" width="90">
          <template slot-scope="scope">
            <span style="color:#409EFF;font-size:16px;font-weight:500">{{ scope.row.cno }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="课程名" prop="name" width="150">
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="学期"
          prop="term"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.term }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学分" prop="credit" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#409EFF;font-size:16px;font-weight:500">{{ scope.row.credit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学时" align="center" prop="period" width="80">
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.period }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" prop="img" align="center" width="190">
          <template slot-scope="scope">
            <img width="50px" height="50px" :src="scope.row.img" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="260" class-name="small-padding fixed-width">
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
    <el-dialog title="修改课程信息" width="40%" :visible.sync="dialogFormVisible" :show-close="true">
      <el-form
        ref="form"
        label-position="left"
        :rules="rules"
        :model="courseInfo"
        style="margin-left:30px;"
        label-width="80px"
      >
        <el-form-item label="课程id" prop="id">
          <el-input v-model="courseInfo.id" style="width:330px;height:40px" :disabled="true" placeholder="id" />
        </el-form-item>
        <el-form-item label="课程编号" prop="cno">
          <el-input v-model="courseInfo.cno" style="width:330px;height:40px" placeholder="课程编号" />
        </el-form-item>
        <el-form-item label="课程名" prop="name">
          <el-input v-model="courseInfo.name" style="width:330px;height:40px" placeholder="课程名" />
        </el-form-item>
        <el-form-item label="学分" prop="credit">
          <el-input v-model="courseInfo.credit" style="width:330px;height:40px" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="学时" prop="period">
          <el-input v-model="courseInfo.period" style="width:330px;height:40px" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="封面图">
          <el-image :preview-src-list="srcList" :src="courseInfo.img" class="avatar" @click="handlePreview" />
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
        <el-form-item label="学期" prop="term">
          <el-select v-model="courseInfo.term" placeholder="请选择学期">
            <el-option v-for="(item,index) of termOptions" :key="index" :label="item.label" :value="item.value" />
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
      courseInfo: {},
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
  mounted() {
    this.initData()
  },

  methods: {
    // 初始化分页数据
    async initData() {
      this.listLoading = true
      const res = await Admin.getCourseList(this.page, this.pageSize)
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
      this.courseInfo = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    // 修改
    async modifyInfo() {
      this.$refs.form.validate(async(valid) => {
        const res = await Admin.modifycourse(this.courseInfo)
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.dialogFormVisible = false
          this.courseInfo = {}
          this.initData()
        } else {
          this.$message.error(res.msg)
          this.courseInfo = {}
          this.dialogFormVisible = false
        }
      })
    },

    // 删除
    async OndeleteOne(row) {
      const cno = row.cno
      this.$confirm('确定要删除这门课程信息吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await Admin.deleteCouse(cno)
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
      this.courseInfo.img = res.data
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
