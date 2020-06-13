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
}
export {
  Student
}
