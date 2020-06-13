<template>
  <div class="container">
    <el-card class="info-panel">
      <div slot="header" class="header">
        <img class="header-img" src="https://image.yangxiansheng.top/img/9679ffb0-9e0b-4451-9916-e21992218054.jpg?imagelist" alt="">
      </div>
      <div class="title">
        <panthumb :image="userInfo.avatar" class="avatar" />
        <mallki class-name="mallki-text" :text="userInfo.name" />
      </div>
      <div class="subtitle">
        <div class="college">
          <i class="el-icon-school" />
          <span style="color:#606266;font-weight:600;font-size:17px;">学院:</span><span>{{ userInfo.college }}</span>
        </div>
        <div class="subject">
          <i class="el-icon-date" />
          <span style="color:#606266;font-weight:600;font-size:17px;">专业:</span><span>{{ userInfo.subject }}</span>
        </div>
        <div class="mobile">
          <i class="el-icon-phone-outline" />
          <span style="color:#606266;font-weight:600;font-size:17px;">电话号码:</span><span>{{ userInfo.mobile }}</span>
        </div>
        <div class="address">
          <i class="el-icon-location-outline" />
          <span style="color:#606266;font-weight:600;font-size:17px;">家庭住址:</span><span>{{ userInfo.address }}</span>
        </div>
      </div>
    </el-card>
    <div class="course-info">
      <el-table
        :data="userInfo.course_list"
        fit
        highlight-current-row
        style="box-sizing:border-box;width: 100%;padding-top:15px;margin-left:40px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);"
      >
        <el-table-column label="序号" type="index" align="center" width="90" />
        <el-table-column label="课程编号" prop="cno" align="center" width="90">
          <template slot-scope="scope">
            <span style="color:#409EFF;font-size:17px;font-weight:500">{{ scope.row.cno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程名" prop="cno" align="center" min-width="200">
          <template slot-scope="scope">
            <span style="color:#606266;font-size:16px;line-height:23px;font-weight:500">{{ scope.row.course_detail[0].name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学分" prop="cno" align="center" width="90">
          <template slot-scope="scope">
            <span style="color:#409EFF;font-size:17px;font-weight:500">{{ scope.row.course_detail[0].credit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学时" prop="cno" align="center" width="90">
          <template slot-scope="scope">
            <span style="color:#909399;font-size:17px;font-weight:500">{{ scope.row.course_detail[0].period }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学期" align="center" width="200">
          <template slot-scope="{row}">
            <el-tag v-if="row.course_detail[0].term !== '第二学期'" type="danger">{{ row.course_detail[0].term }}</el-tag>
            <el-tag v-if=" row.course_detail[0].term=== '第二学期'" type="success">{{ row.course_detail[0].term }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import panthumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'
import { mapGetters } from 'vuex'
export default {
  name: '',

  components: {
    panthumb,
    Mallki
  },
  props: {},
  data() {
    return {

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

  mounted() {},

  methods: {}

}

</script>
<style lang='scss' scoped>
.container{
  display: flex;
  background-color: rgb(240, 242, 245);
  position: relative;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .info-panel{
    display: flex;
    background: #ffffff;
    width:350px;
    max-height: 600px;
    flex-direction: column;
    .header{
      width: 100%;
      height: 260px;
      .header-img{
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover{
          transform: scale(1.1,1.1);
          // 加过爆滤镜
          filter: contrast(130%);
        }
      }
    }
    .title{
      margin-top: 8px;
      display: flex;
      box-sizing: border-box;
      position: relative;
      .avatar{
        z-index: 100;
        height: 70px!important;
        width: 70px!important;
        background-color: #fff;
        box-shadow: none!important;
        /deep/ .pan-info {
          box-shadow: none!important;
        }
      }
      .mallki-text{
        position: absolute;
        left: 75px;
        top: 20px;
        font-size: 22px;
        font-weight: bold;
      }
    }
    .subtitle{
      margin-top: 30px;
      box-sizing: border-box;
      .college,.subject,.mobile,.address{
        padding-bottom: 10px;
        border-bottom: 1px solid #EBEEF5;
        i{
          font-size: 22px;
          vertical-align: bottom;
          color:#606266;
        }
        span:last-child{
          font-size: 15px;
          color: #909399;
          font-weight: 500;
          margin-left: 9px;
        }
      }
      .college{
        margin-bottom: 13px;
      }
      .subject{
        margin-bottom: 13px;
      }
      .mobile{
        margin-bottom: 13px;
      }
      .address{
        border: none;
      }
    }
  }
  .course-info{
    max-width: 800px;
  }
}
</style>
<style lang="scss" >
  .el-card__header {
    padding: 0px!important;
}
.el-divider--horizontal{
  margin: 8px 0 !important;
}
</style>
