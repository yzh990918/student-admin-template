<template>
  <div class="container">
    <el-card v-if="!isShow" class="message-content">
      <p slot="header" style="padding:10px;max-height:2px!important;box-sizing:border-box;font-weight:800">在线聊天系统   在线人数:{{ num }}人</p>
      <el-alert
        center
        :title="time"
        type="info"
        :closable="false"
      />
      <div v-for="(item,index) of lists" ref="ms" :key="index" class="message">
        <el-alert
          v-if="item.message === '加入房间' && typeof(item.name) !== 'undefined'"
          center
          :title="item.name+item.message"
          style="margin-top:20px;"
          type="success"
          :closable="false"
        />
        <el-alert
          v-if="item.message === '加入房间'&& typeof(item.name) === 'undefined'"
          center
          :title="'超级管理员'+item.message"
          style="margin-top:20px;"
          type="error"
          :closable="false"
        />
        <div v-if="item.name !== userInfo.name && item.message!== '加入房间'" class="content-left">
          <img style="border-radius:6px" :src="item.avatar" alt="" width="40px" height="40px">
          <div class="info">
            <span class="name">{{ item.name }}</span>
            <span class="message-left" type="info">{{ item.message }}</span>
          </div>
        </div>
        <div v-if="item.name === userInfo.name && item.message !== '加入房间'" class="content-right">
          <div class="info">
            <!-- <span class="name">{{ item.name }}</span> -->
            <span class="message-right" type="primary">{{ item.message }}</span>
          </div>
          <img style="border-radius:6px" :src="item.avatar" alt="" width="40px" height="40px">
        </div>
      </div>
    </el-card>
    <div v-if="!isShow" class="message-input">
      <el-input
        v-model="message"
        type="textarea"
        :rows="6"
        placeholder="请输入内容"
      />
    </div>
    <div v-if="!isShow" class="send-wrapper">
      <el-button style="width:120px;border:none" @click="clear">取消</el-button>
      <el-button type="primary" style="width:120px; margin-left:15px" @click="send">发送</el-button>
    </div>
    <div class="enter-button">
      <el-button v-if="isShow" type="primary" @click="enter">进入聊天室</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      message: '',
      lists: [],
      ws: {},
      isShow: true,
      num: 0,
      roomid: 1,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss')
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
    this.isShow = true
    this.ws = new WebSocket('ws://127.0.0.1:3000')
    this.ws.onopen = this.onOpen
    this.ws.onmessage = this.onMessage
    this.ws.onclose = this.onClose
    this.ws.onerror = this.onError
  },

  methods: {
    // 监听开启
    onOpen() {
      console.log('webSocket is open' + this.ws.readyState)
    },

    // 监听进入房间
    enter() {
      this.isShow = false
      // 发送消息 广播进入房间
      this.ws.send(JSON.stringify({
        event: 'enter',
        name: this.userInfo.name,
        avatar: this.userInfo.avatar,
        rootmid: this.roomid
      }))
    },

    // 接收信息
    onMessage(event) {
      // 服务端传递过来的数据
      if (this.isShow) {
        return
      }
      const data = JSON.parse(event.data)
      // 如果是进入或者退出房间
      const messageInfo = {}
      messageInfo.avatar = data.avatar
      messageInfo.roomNum = data.num
      messageInfo.name = data.name
      if (data.event === 'enter') {
        messageInfo.message = '加入房间'
      } else if (data.event === 'close') {
        messageInfo.message = '退出了房间'
      } else {
        messageInfo.message = data.message
      }
      this.lists.push(messageInfo)
      this.num = data.num
      this.message = ''
    },

    // 发送消息
    send() {
      // this.lists.push()
      this.ws.send(JSON.stringify({
        event: 'message',
        message: this.message
      }))
    },
    clear() {
      this.message = ''
    },
    // 监听关闭和异常
    onClose: function() {
      // 当链接主动断开的时候触发close事件
      console.log('close:' + this.ws.readyState)
    },
    onError: function() {
      // 当连接失败的时候触发error事件
      console.log('error:' + this.ws.readyState)
    }
  }

}

</script>
<style lang='scss' scoped>
.container{
  display: flex;
  padding: 32px;
  box-sizing: border-box;
  background-color: rgb(240, 242, 245);
  width: 100%;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  .message-content{
    display: flex;
    flex-direction: column;
    width: 800px!important;
    height: 430px;
    overflow: scroll;
    &::-webkit-scrollbar{
      width: 0!important;
    }
    width: 100%;
    .message{
      display: flex;
      flex-direction: column;
      .content-left{
        margin-top: 25px;
        min-height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .info{
          display: flex;
          margin-left: 15px;
          flex-direction: column;
          justify-content: space-between;
          span{
            color: #666666;
            font-weight: 600;
            font-size: 13px;
            line-height: 15px;
          }
          .message-left{
            display: flex;
            background: #F0F2F5;
            flex-wrap: wrap;
            align-items: center;
            border-radius: 5px;
            padding: 8px;
            line-height: 18px;
            margin-top: 6px;
            min-height: 40px;
            max-width: 220px;;
          }
        }

      }
      .content-right{
        margin-top: 25px;
        min-height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        .info{
          display: flex;
          margin-right: 15px;
          flex-direction: column;
          justify-content: space-between;
          span{
            color: #666666;
            font-weight: 600;
            font-size: 13px;
            line-height: 15px;
          }
          .message-right{
            display: flex;
            background: #ECF5FF;
            flex-wrap: wrap;
            align-items: center;
            border-radius: 5px;
            padding: 8px;
            line-height: 18px;
            margin-top: 6px;
            min-height: 40px;
            max-width: 220px;;
          }
        }

    }
    }
  }
  .send-wrapper{
    width: 800px;
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
    height: 40px;
    align-items: center;
  }
  .message-input{
    width: 800px;
    display: flex;
    flex-direction: column;
  }
}
</style>
