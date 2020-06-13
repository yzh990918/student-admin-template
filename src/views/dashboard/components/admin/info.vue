<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://image.yangxiansheng.top/img/50530061-851b-4ca5-9dc5-2fead928a939.jpg?imagelist">
    </div>
    <div style="position:relative;">
      <pan-thumb :image="avatar" class="panThumb" />
      <mallki class-name="mallki-text" :text="roleText" />
      <div style="padding-top:30px;" class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="80" status="success" />
      </div>
      <div class="progress-item">
        <span>JavaScript</span>
        <el-progress :percentage="60" />
      </div>
      <div class="progress-item">
        <span>小程序</span>
        <el-progress :percentage="100" status="success" />
      </div>
      <div class="progress-item">
        <span>node</span>
        <el-progress :percentage="80" status="success" />
      </div>
      <div class="progress-item">
        <span>vue-element-admin</span>
        <el-progress :percentage="30" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    roleText: {
      type: String,
      default: '系统超级管理员'

    }

  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  width: 370px;
  max-height: 497px;
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
