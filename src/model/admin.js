import axios from '@/utils/request'

class Admin {
  static async getCountData() {
    return await axios.get(`/admin/public`)
  }

  // 获取所有课程列表
  static async getCourseList(page, size) {
    return await axios.get(`/admin/getAllCourse?page=${page}&size=${size}`)
  }

  // 添加一门课程
  static async addCourse(couseInfo) {
    return await axios.post('/admin/addCourse', {
      ...couseInfo
    })
  }

  // 修改课程信息
  static async modifycourse(couseInfo) {
    return await axios.post('/admin/modifyCourse', {
      ...couseInfo
    })
  }

  // 删除一门课程
  static async deleteCouse(cno) {
    return await axios.post(`/admin/deleteCourse?cno=${cno}`)
  }

  // 获取教师列表
  static async getTeacherList(page, size) {
    return await axios.get(`/admin/getAllTeacher?page=${page}&size=${size}`)
  }

  // 修改一名教师信息

  static async modifyTeacher(userInfo) {
    return await axios.post('/teacher/modify', {
      ...userInfo
    })
  }

  // 删除一名教师
  static async deleteTeacher(id) {
    return await axios.post(`/teacher/delete?id=${id}`)
  }

  // 获取教师密码
  static async getPassword(name) {
    return await axios.post(`/teacher/getPassword?name=${name}`)
  }
}

export {
  Admin
}
