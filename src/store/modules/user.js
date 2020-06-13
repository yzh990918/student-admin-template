import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userInfo: {},
    uid: Number
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, info) => {
    state.userInfo = info
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  }

}

const actions = {
  // 用户登陆
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        if (response.code === 200) {
          // 获取信息唯一凭证
          const uid = response.data.userInfo.sno ? response.data.userInfo.sno : response.data.userInfo.tno ? response.data.userInfo.tno : response.data.userInfo.id
          // 设置vuex数据和保存cookie
          commit('SET_TOKEN', response.data.token)
          commit('SET_UID', uid)
          localStorage.setItem('uid', uid)
          setToken(response.data.token)
          resolve()
        } else {
          Message({
            type: 'error',
            message: response.msg,
            duration: 4000
          })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 携带token信息请求用户信息
      getInfo(state.token, localStorage.getItem('uid')).then(response => {
        const { data } = response
        const roles = data.roles
        const name = data.roles[0] === 'admin' ? data.userInfo.username : data.userInfo.name
        const { avatar } = data.userInfo
        // 返回信息 roles是必须的
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        // 保存vuex数据
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_USERINFO', data.userInfo)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 退出登录
      try {
        // 将cookie中的token清除
        removeToken()
        // 路由重定向
        resetRouter()
        // vuex信息清除
        commit('RESET_STATE')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

