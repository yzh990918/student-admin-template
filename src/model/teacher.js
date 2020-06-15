import axios from '@/utils/request'

class Teacher {
  // 注册
  static async register(userInfo) {
    return axios.post('/teacher/register', {
      ...userInfo
    })
  }
  // 查询课程详情
  static async getCourseDetail(cno) {
    return await axios.get(`/student/getCourse?cnos=${cno}`)
  }
}

export {
  Teacher
}
