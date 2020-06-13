<template>
  <div class="container">
    <div class="filter-container">
      <el-input ref="input" v-model="keyword" clearable placeholder="输入关键词" style="width: 200px;" />
      <el-select v-model="collegeValue" clearable style="margin-left:6px" placeholder="请选择学院" @change="OnselectCollege">
        <el-option
          v-for="item in collegeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="subjectValue" clearable style="margin-left:6px" placeholder="请选择专业" @change="OnselectSubject">
        <el-option
          v-for="item in subjectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button style="margin-left:6px; height:40px;" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button style="margin-left:6px; height:40px;" type="primary" icon="el-icon-refresh" @click="refresh()">
        重置
      </el-button>
    </div>

    <div class="content" style="margin-top:15px;">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="序号" prop="id" align="center" width="100" />
        <el-table-column label="学号" prop="sno" align="center" min-width="120px">
          <template slot-scope="scope">
            <span style="color:#409EFF;font-size:16px;font-weight:500">{{ scope.row.sno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" min-width="120px">
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="gender" align="center" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.gender === 0" type="primary">男</el-tag>
            <el-tag v-if="scope.row.gender === 1" type="danger">{{ scope.row.gender === 1?'女':'' }}</el-tag>
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
        <el-table-column label="专业" prop="subject" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#67C23A;font-size:16px;font-weight:500">{{ scope.row.subject }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" prop="avatar" align="center" width="90">
          <template slot-scope="scope">
            <img width="40px" height="40px" :src="scope.row.avatar" alt="">
          </template>
        </el-table-column>
        <el-table-column label="手机号码" prop="mobile" min-width="110">
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.mobile }}</span>
          </template>

        </el-table-column>
        <el-table-column
          label="家庭住址"
          prop="address"
          min-width="150px"
        >
          <template slot-scope="scope">
            <span style="color:#606266;line-height:23px;font-size:16px;font-weight:500">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="confirmEdit(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="OndeleteOne(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog title="修改学生信息" width="40%" :visible.sync="dialogFormVisible" :show-close="true">
      <el-form
        ref="form"
        label-position="left"
        :rules="rules"
        :model="userInfo"
        style="margin-left:50px;"
        label-width="80px"
      >
        <el-form-item label="默认序号" prop="id">
          <el-input v-model="userInfo.id" style="width:330px;height:40px" :disabled="true" placeholder="用户id" />
        </el-form-item>
        <el-form-item label="学号" prop="sno">
          <el-input v-model="userInfo.sno" style="width:330px;height:40px" placeholder="学号" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userInfo.name" style="width:330px;height:40px" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username" style="width:330px;height:40px" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="修改头像">
          <el-image :preview-src-list="srcList" :src="userInfo.avatar" class="avatar" @click="handlePreview" />
          <el-upload
            class="avatar-uploader"
            action="https://imgkr.com/api/files/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button slot="trigger" style="width:178px;margin-top:10px;" size="medium" type="primary">更换头像</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="userInfo.mobile" style="width:330px;height:40px" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
          <el-input v-model="userInfo.address" style="width:330px;height:40px" placeholder="家庭住址" />
        </el-form-item>
        <el-form-item label="性别" style="margin-top:20px;">
          <el-select v-model="userInfo.gender" style="width:330px;height:40px" placeholder="选择性别">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="userInfo.college" style="width:330px;height:40px" placeholder="选择学院">
            <el-option
              v-for="item in collegeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="userInfo.subject" style="width:330px;height:40px" placeholder="选择专业">
            <el-option
              v-for="item in subjectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
import { collegeOptions, subjectOptions, genderOptions } from '@/config/enum'
import { Student } from '@/model/student'

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
      keyword: '',
      collegeValue: '',
      subjectValue: '',
      genderOptions: genderOptions,
      collegeOptions: collegeOptions,
      subjectOptions: subjectOptions,
      userInfo: {},
      dialogImageUrl: '',
      showImagePreview: false,
      srcList: [],
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
        sno: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { type: 'number', message: '请输如合法的学号', trigger: 'blur' }
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
    this.initData()
  },

  methods: {
    // 初始化分页数据
    async initData() {
      this.listLoading = true
      const res = await Student.getList(this.page, this.pageSize)
      if (res.code === 200) {
        this.totalPage = res.data.total_page
        this.totalCount = res.data.total
        this.listLoading = false
        this.list = res.data.items
      } else {
        this.$message.error(res.msg)
      }
    },
    // 搜索关键字
    async searchData(keyword) {
      this.listLoading = true
      const res = await Student.searchKeyword(keyword, this.page, this.pageSize)
      if (res.code === 200) {
        this.totalPage = res.data.total_page
        this.totalCount = res.data.total
        this.listLoading = false
        this.list = res.data.items
      } else {
        this.$message.error(res.msg)
      }
    },
    // 选择框改变
    OnselectCollege(value) {
      this.searchData(value)
    },
    OnselectSubject(value) {
      this.searchData(value)
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
    // 搜索关键词
    handleFilter() {
      if (this.keyword === '') {
        return
      }
      this.searchData(this.keyword)
    },
    // 重置
    refresh() {
      this.page = 0
      this.pageSize = 10
      this.initData()
    },
    // 删除
    async OndeleteOne(row) {
      const sno = row.sno
      this.$confirm('确定要删除这名学生的信息吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await Student.deleteInfo(sno)
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
    confirmEdit(row) {
      const data = Object.assign({}, row)
      this.userInfo = data
      this.dialogFormVisible = true
    },
    // 修改
    modifyInfo() {
      // 确认校验
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          delete this.userInfo.course_list
          const res = await Student.modifyInfo(this.userInfo)
          if (res.code === 200) {
            this.initData()
            this.$message.success(res.msg)
            this.dialogFormVisible = false
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },

    // 用户头像处理
    handleAvatarSuccess(res, file) {
      this.userInfo.avatar = res.data
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
      this.srcList = [this.userInfo.avatar]
    }

  }
}

</script>
<style lang='scss' scoped>
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
