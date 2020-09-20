/**
 * 全局路由守卫 生成动态路由
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register'] // 路由白名单，不会重定向

// 全局路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 设置meta标题
  document.title = getPageTitle(to.meta.title)
  // 判断token是否存在
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 有token 跳转首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 不是login 判断角色,根据角色去获取动态路由,每次访问用replace访问
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 如果没有角色信息 就获取角色信息 然后生成动态路由
          const { roles } = await store.dispatch('user/getInfo')
          // 生成动态路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          //  使用 replace 访问路由，不会在 history 中留下记录，登录到dashbord时回退空白页面
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    // 无token
    // 白名单不用重定向 直接访问
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 携带参数为重定向到前往的路径
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
