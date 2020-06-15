<template>
  <div class="content" style="padding:25px;">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" align="center" width="100" />
      <el-table-column label="课程序号" prop="sno" align="center" min-width="100px">
        <template slot-scope="scope">
          <span style="color:#409EFF;font-size:16px;font-weight:500">{{ scope.row.cno }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名" prop="sno" align="center" min-width="120px">
        <template slot-scope="scope">
          <span style="color:#606266;font-size:16px;font-weight:500">{{ scope.row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学时" prop="sno" align="center" min-width="120px">
        <template slot-scope="scope">
          <span style="color:#606266;font-size:16px;font-weight:500">{{ scope.row.period }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程详情" prop="sno" align="center" min-width="120px">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="40px" height="40px" alt="">
        </template>
      </el-table-column>
      <el-table-column label="上课时间" prop="sno" align="center" min-width="120px">
        <template slot-scope="scope">
          <span style="color:#606266;font-size:16px;font-weight:500">{{ scope.row.term }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学分" prop="sno" align="center" min-width="120px">
        <template slot-scope="scope">
          <span style="color:#409EFF;font-size:16px;font-weight:500">{{ scope.row.credit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年级平均分" prop="sno" align="center" min-width="120px">
        <template slot-scope="scope">
          <span style="color:#E6A23C;font-size:16px;font-weight:500">{{ scope.row.courseAvg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="得分" prop="sno" align="center" min-width="120px">
        <template slot-scope="scope">
          <span style="color:#F56C6C;font-size:16px;font-weight:500">{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" @click="confirmEdit(row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="OndeleteOne(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请输入修改的成绩" width="40%" :visible.sync="dialogFormVisible" :show-close="true">
      <el-input v-model="scores" placeholder="成绩" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyInfo">确 定</el-button>
      </div>
    </el-dialog>
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
      list: [],
      dialogFormVisible: false,
      scores: 0,
      options: {},
      listLoading: true
    }
  },

  computed: {},

  watch: {},
  created() {},

  beforeMount() {},

  mounted() {
    this.initScore()
  },

  methods: {
    async initScore() {
      this.listLoading = true
      const sno = this.$route.query.sno
      const res = await Student.getScoreDistribute(sno)
      if (res.code === 200) {
        this.list = res.data.scoreData
        this.listLoading = false
      } else {
        this.$message.error(res.msg)
        this.listLoading = false
      }
    },
    OndeleteOne(row) {
      this.$confirm('确定要删除这们成绩吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await Student.deleteScore(row.scoreId)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 然后刷新数据
        this.initScore()
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消删除'
        })
      })
    },
    // 修改
    confirmEdit(row) {
      this.dialogFormVisible = true
      this.scores = row.score
      this.options = {
        sno: Number(this.$route.query.sno),
        cno: row.cno
      }
    },
    async modifyInfo() {
      this.options['score'] = this.scores
      const res = await Student.modifyScore(this.options)
      if (res.code === 200) {
        this.dialogFormVisible = false
        this.$message.success('修改成功')
        this.initScore()
      } else {
        this.$message.error(res.msg)
      }
    }
  }

}

</script>
<style lang='scss' scoped>

</style>
