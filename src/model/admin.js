import axios from '@/utils/request'

class Admin {
  static async getCountData() {
    return await axios.get(`/admin/public`)
  }
}

export {
  Admin
}
