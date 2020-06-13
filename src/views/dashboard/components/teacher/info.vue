<template>
  <div class="container">
    <el-card class="info-panel">
      <div slot="header" class="header">
        <img class="header-img" src="https://image.yangxiansheng.top/img/bcce3734-0837-4b9f-9261-351ef384f75a.jpg?imagelist" alt="">
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
          <i class="el-icon-coordinate" />
          <span style="color:#606266;font-weight:600;font-size:17px;">任教:</span><span>{{ userInfo.job }}</span>
        </div>
      </div>
    </el-card>
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
  box-sizing: border-box;
  .info-panel{
    display: flex;
    background: #ffffff;
    width:290px;
    max-height: 500px;
    flex-direction: column;
    .header{
      width: 100%;
      height: 230px;
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
