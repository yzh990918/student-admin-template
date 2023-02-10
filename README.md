<h1>Student-admin-template👨🏻‍🎓👨🏻‍🎓👨🏻‍🎓</h1>

![](https://image.yangxiansheng.top/img/20200616133520.png?imagelist)
  
> 由于部分同学乱删数据,所以体验账号失效,需要看到效果的同学可以注册账号体验，再三强调数据不要乱删啊

> 在线体验地址: 由于本人ECS服务器已过期，所以不再提供线上环境访问，想要开发直接看下面的使用说明

> 本项目前端框架来自于大佬 panjiachen 的杰作 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin),真的真的好用，赞！！！




## 🚗前端技术

- vue2.6
- vue-element-admin
- element-ui
- echarts
- socket.io
- koa
- axios

## 🚓后端技术

- springboot 2.3
- jpa
- maven
- jackson
- lombok
- redis
- mysql
- restful

## 🚕使用说明

1. **首先在你的数据库当中导入 [student.sql](./student_20210310_164218.sql),建议使用 Navicat 数据库管理工具**。

![](https://image.yangxiansheng.top/img/20210328184829.png?imglist)

2. **下载后端 Springboot 项目,导入并修改部分配置**

```bash
git clone https://github.com/251205668/student-admin.git
```

然后修改 `application.yml` 文件，改成你自己的数据库参数就好了，这里假设你将端口改成了 `8080`

![](https://image.yangxiansheng.top/img/20210328185313.png?imglist)


3. **前端项目**

```bash
# 下载
git clone https://github.com/251205668/student-admin-template

# 进入项目主目录
cd student-admin-template

# 安装依赖
npm install 或者 cnpm install

```

4. **然后需要修改前端的配置**

首先是修改 `Vue.config.js` 的接口代理配置，改成你的后端地址就行

![](https://image.yangxiansheng.top/img/20210328201122.png?imglist)

然后有一个注意的点是但凡碰到上传组件，上传的接口本项目不提供，各位自行修改即可

5. **启动项目了**

```bash
npm run dev

# 打包
npm run build

# 发布应用，详情看sh文件

# 开启聊天室功能，启动socket.js node应用即可
```

6. 开启聊天室功能

```bash
# pm2启动最佳
node socket.js
```

**当你看到这个界面，就说明你成功了🛺**

![](https://image.yangxiansheng.top/img/20210328201449.png?imglist)


## 🚙后台地址和接口文档

- [后台地址](https://github.com/251205668/student-admin)
- [接口文档](https://documenter.getpostman.com/view/10611320/T17Ge7JB?version=latest)

## 🏍项目痛点

1. 对 `element-ui` 和 `Vue-element-admin` 内部组件进行封装，完成复杂表单和表格开发
2. 利用拦截器实现项目中引入的 `Axios` 的封装，运用面向对象的思想实现 API 接口的管理

3. 利用 `Vuex` 状态管理工具和 `Vue-router` 的 `addRoutes` 实现角色控制路由分配

4. 利用 `SpringBoot` 实现后端接口服务，实现分角色登录、注册、获取大屏数据等功能

5. 引入 `Echart` 库完成学生首页成绩分析大屏数据图表，实现各科成绩分布的可视化对比

6. 使用 `Vue` 自定义指令实现按钮级别权限控制


## 🚌鸟瞰图

![](https://image.yangxiansheng.top/img/20201216120540.png?imglist)

## 🦽项目功能

```markdown
- 学生查询
- 学生列表查询
- 学生成绩分布查询
- 学生登录
- 学生注册
- 多人在线聊天室
- 学生的删除 
- 学生信息的修改
- 学生成绩修改
- 学生成绩的录入(操作student-class)
- 课程查询
- 课程列表查询
- 学科的增加 
- 学科的修改 
- 学科的删除 
- 获取全部学科数据
- 教师注册
- 教师登录
- 修改教师信息
- 单个教师信息
- 获取教师列表数据
- 删除教师
- 管理员登陆
- 获取大屏数据
```
## 🚎部分截图

<p style="font-size:20px;font-weight:500;">角色登录</p>

![](https://image.yangxiansheng.top/img/20200611002243.png?imagelist)

<p style="font-size:20px;font-weight:500;">角色注册</p>

![](https://image.yangxiansheng.top/img/20200616131849.png?imagelist)

<p style="font-size:20px;font-weight:500;">学生成绩分析</p>

![](https://image.yangxiansheng.top/img/20200616131914.png?imagelist)

<p style="font-size:20px;font-weight:500;">学生信息查询</p>

![](https://image.yangxiansheng.top/img/20200616131931.png?imagelist)

<p style="font-size:20px;font-weight:500;">学生成绩查询</p>

![](https://image.yangxiansheng.top/img/20200611002243.png?imagelist)

<p style="font-size:20px;font-weight:500;">首页</p>

![](https://image.yangxiansheng.top/img/20200616133520.png?imagelist)

<p style="font-size:20px;font-weight:500;">学生信息管理</p>

![](https://image.yangxiansheng.top/img/20200616133320.png?imagelist)

<p style="font-size:20px;font-weight:500;">学生成绩管理</p>

![](https://image.yangxiansheng.top/img/20200616132105.png?imagelist)

<p style="font-size:20px;font-weight:500;">课程管理</p>

![](https://image.yangxiansheng.top/img/20200616132129.png?imagelist)

<p style="font-size:20px;font-weight:500;">教师信息管理</p>

![](https://image.yangxiansheng.top/img/20200616132142.png?imagelist)

<p style="font-size:20px;font-weight:500;">多人聊天室</p>

![](https://image.yangxiansheng.top/img/20210328204003.png?imglist)

## Author 👶
[努力中的杨先生](https://github.com/251205668)
