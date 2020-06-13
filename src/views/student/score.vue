<template>
  <div class="container">
    <div class="filerter-container">
      <el-button class="filter-item" type="primary" :loading="downLoading" icon="el-icon-download" @click="handleDownload">
        导出成绩单
      </el-button>
    </div>
    <div class="content">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="序号" type="index" align="center" width="100" />
        <el-table-column label="课程编号" prop="cno" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#409EFF;font-size:17px;font-weight:500">{{ scope.row.cno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程名" prop="course_detail[0].name" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.course_detail[0].name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学分" prop="course_detail[0].credit" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#E6A23C;font-size:17px;font-weight:500">{{ scope.row.course_detail[0].credit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学期" prop="course_detail[0].term" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.course_detail[0].term }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学时" prop="course_detail[0].period" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#67C23A;font-size:17px;font-weight:500">{{ scope.row.course_detail[0].period }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面图" prop="course_detail[0].img" align="center" width="199">
          <template slot-scope="scope">
            <img width="80px" height="80px" :src="scope.row.course_detail[0].img" alt="">
          </template>
        </el-table-column>
        <el-table-column label="成绩" prop="score" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#F56C6C;font-size:17px;font-weight:500">{{ scope.row.score }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="290" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button disabled type="primary" size="mini" @click="confirmEdit(row)">
              编辑
            </el-button>
            <el-button disabled size="small" type="success">
              添加
            </el-button>
            <el-button disabled size="small" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination">
      <el-pagination
         current-page="1"
        :background="true"
        :page-sizes="[15,20,30,40]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>-->

  </div>
</template>

<script>
import { Student } from '@/model/student'
import { mapGetters } from 'vuex'

export default {
  name: '',

  components: {},
  props: {},
  data() {
    return {
      list: [],
      listLoading: true,
      downLoading: false
    }
  },

  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },

  watch: {},
  created() {},

  beforeMount() {},

  mounted() {
    this.initData()
  },

  methods: {
    handleDownload() {
      this.downLoading = true
  import('@/vendor/export2Excel').then(excel => {
    // 表头
    const tHeader = ['课程编号', '课程名', '学分', '学期', '学时', '成绩']
    const filterVal = ['cno', 'name', 'credit', 'term', 'period', 'score']
    const data = this.formatJson(filterVal, this.list)
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename: '成绩单'
    })
    this.downLoading = false
  })
    },
    async initData() {
      this.listLoading = true
      const res = await Student.getScoreList(this.userInfo.sno)
      if (res.code === 200) {
        this.list = res.data.course_list
        this.listLoading = false
      }
    },
    formatJson(filterval, data) {
      // 遍历json数据
      return data.map(v => filterval.map(item => {
        if (item === 'cno' || item === 'score') {
          return v[item]
        } else {
          const course_detail = v.course_detail[0]
          return course_detail[item]
        }
      }))
    }
  }

}

</script>
<style lang='scss' scoped>
.container{
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .filter-container{
    padding-bottom: 10px;
  }
  .content{
    margin-top: 20px;
    width: 100%;
  }
}
</style>
