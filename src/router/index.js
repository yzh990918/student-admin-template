import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    },
    {
      path: 'teacher/student/score/detail',
      component: () => import('@/views/teacher/score/score-detail'),
      meta: { title: '成绩详情' },
      hidden: true
    }
    ]
  },
  {
    path: '/chat',
    name: 'chat',
    component: Layout,
    children: [{
      path: '',
      name: 'chat',
      component: () => import('@/views/chat/index'),
      meta: { title: '在线交流平台', icon: 'wechat' }
    }]
  }
]
// 权限控制路由
export const asyncRoutes = [
  // 学生角色路由 大屏数据和成绩查询
  {
    path: '/student',
    name: 'student',
    component: Layout,
    meta: { title: '学生信息查询', icon: 'documentation', roles: ['student'] },
    children: [
      {
        path: 'info',
        component: () => import('@/views/student/info'),
        name: 'studentInfo',
        meta: { title: '信息查询', icon: 'form' }
      },
      {
        path: 'score',
        component: () => import('@/views/student/score'),
        name: 'studentScore',
        meta: { title: '成绩查询', icon: 'score' }
      }
    ]
  },
  // 教师路由分配
  {
    path: '/teacher/student',
    name: 'teacherStudent',
    component: Layout,
    meta: { title: '学生管理', icon: 'form', roles: ['teacher'] },
    children: [
      {
        path: 'info',
        component: () => import('@/views/teacher/student/index'),
        meta: { title: '学生信息管理', icon: 'student' },
        children: [
          {
            path: '',
            component: () => import('@/views/teacher/student/student'),
            meta: { title: '学生列表', icon: 'list' }
          },
          {
            path: 'add',
            component: () => import('@/views/teacher/student/addStudent'),
            meta: { title: '添加学生', icon: 'edit' }
          }
        ]
      },
      {
        path: 'score',
        component: () => import('@/views/teacher/score/index'),
        meta: { title: '学生成绩管理', icon: 'score' },
        children: [
          {
            path: '',
            component: () => import('@/views/teacher/score/studentScore'),
            meta: { title: '学生成绩列表', icon: 'list' }
          },
          {
            path: 'add',
            component: () => import('@/views/teacher/score/addScore'),
            meta: { title: '录入成绩', icon: 'edit' }
          }
        ]
      }
    ]
  },
  // 管理员额外路由
  {
    path: '/admin/course',
    component: Layout,
    meta: { title: '课程管理', icon: 'course', roles: ['admin'] },
    children: [
      {
        path: 'list',
        name: 'adminCourse',
        component: () => import('@/views/admin/course/course'),
        meta: { title: '课程列表', icon: 'list' }
      },
      {
        path: 'add',
        name: 'adminaddCourse',
        component: () => import('@/views/admin/course/addCourse'),
        meta: { title: '添加课程', icon: 'edit' }
      }
    ]
  },
  {
    path: '/admin/teacher',
    component: Layout,
    meta: { title: '教师管理', icon: 'teacher', roles: ['admin'] },
    children: [
      {
        path: 'list',
        name: 'adminTeacher',
        component: () => import('@/views/admin/teacher/teacher'),
        meta: { title: '教师列表', icon: 'list' }
      },
      {
        path: 'add',
        name: 'adminaddTeacher',
        component: () => import('@/views/admin/teacher/addTeacher'),
        meta: { title: '添加教师', icon: 'edit' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
