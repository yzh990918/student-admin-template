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
        <el-table-column label="操作" align="center" width="270" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" @click="confirmEdit(row)">
              查看成绩
            </el-button>
            <el-button size="small" type="success" @click="OndeleteOne(row)">
              录入成绩
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
  </div>
</template>

<script>
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
      list: []
    }
  },
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
    confirmEdit(row) {
      const sno = row.sno
      this.$router.push(`/teacher/student/score/detail?sno=${sno}`)
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
