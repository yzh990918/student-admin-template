const WebSocket = require('ws')
const http = require('http')
// const jwt = require('jsonwebtoken')

const wss = new WebSocket.Server({ noServer: true })
const server = http.createServer()

const group = {} // 记录每个房间号的人数

// roomid -> 对应相同的roomid进行广播消息
wss.on('connection', function connection(ws) {
  // ws代表当前收到消息的客户端
  // 接收客户端消息
  ws.on('message', function(msg) {
    const msgObj = JSON.parse(msg)
    if (msgObj.event === 'enter') {
      // 用户信息
      ws.name = msgObj.name
      ws.avatar = msgObj.avatar
      ws.roomid = msgObj.roomid
      // 首次进入房间判断 房间人数置为1
      if (typeof group[ws.roomid] === 'undefined') {
        group[ws.roomid] = 1
      } else {
        group[ws.roomid] += 1
      }
    }
    // 接收到信息后 发送广播消息(即获取所有的客户端)
    wss.clients.forEach(client => {
      // 补充：如何判断非自己的客户端：ws !== client
      if (client.readyState === WebSocket.OPEN && client.roomid === ws.roomid) {
        // 同一个房间 进行广播
        msgObj.name = ws.name
        msgObj.avatar = ws.avatar
        // 房间人数
        msgObj.num = group[ws.roomid]
        // 发送广播消息 附带消息
        client.send(JSON.stringify(msgObj))
      }
    })
  })

  // 当ws客户端断开链接的时候
  ws.on('close', function(msg) {
    if (ws.name) {
      group[ws.roomid] -= 1
    }

    const msgObj = {}
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && ws.roomid === client.roomid) {
        msgObj.name = ws.name
        msgObj.avatar = ws.avatar
        msgObj.num = group[ws.roomid] // 聊天室的人数
        msgObj.event = 'out'
        client.send(JSON.stringify(msgObj))
      }
    })
  })
})

server.on('upgrade', function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request)
  })
})

server.listen(3000)
