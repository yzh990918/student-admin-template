import axios from '@/utils/request'

class Course {
  // 注册
  static async register(userInfo) {
    return axios.post('/teacher/register', {
      ...userInfo
    })
  }
}

export {
  Course
}
