import axios from '@/utils/request'
class Student {
  // 获取成绩清单
  static async getScoreList(sno) {
    if (!sno) {
      return
    }
    return await axios.get(`/student/detail/${sno}`)
  }

  // 获取学生成绩分布数据
  static async getScoreDistribute(sno) {
    if (!sno) {
      return
    }
    return await axios.get(`/student/getState/${sno}`)
  }

  // 学生注册
  static async register(userInfo) {
    return await axios.post('/student/register', { ...userInfo })
  }

  // 返回学生列表
  static async getList(page, size) {
    return await axios.get(`/student/getAll?page=${page}&size=${size}`)
  }

  // 修改学生信息 教师不允许修改密码
  static async modifyInfo(userInfo) {
    return await axios.post('/student/modify', {
      ...userInfo
    })
  }
  // 删除一名学生信息
  static async deleteInfo(sno) {
    return await axios.post(`/student/delete?sno=${sno}`)
  }

  // 录入或者修改成绩
  static async modifyScore(options) {
    return await axios.post('/student/score/addOrModify', {
      ...options
    })
  }

  // 搜索学生列表
  static async searchKeyword(keywrod, page, size) {
    return await axios.get(`/student/search?keyword=${keywrod}&page=${page}&size=${size}`)
  }
}
export {
  Student
}
