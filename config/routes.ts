/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'home',
    component: './Welcome',
  },
  {
    path: '/account',
    name: 'account',
    icon: 'user',
    component: './Account',
  },
  {
    path: '/resume',
    name: 'resume',
    icon: 'container',
    component: './Resume',
  },
  {
    path: '/company',
    name: 'company',
    icon: 'copyright',
    component: './Company',
  },
  {
    path: '/job',
    name: 'job',
    icon: 'project',
    component: './Job',
  },
  {
    path: '/position',
    name: 'position',
    icon: 'InsertRowBelow',
    component: './Position',
  },
  {
    path: '/industry',
    name: 'industry',
    icon: 'profile',
    component: './Industry',
  },
  {
    path: '/welfare',
    name: 'welfare',
    icon: 'coffee',
    component: './Welfare',
  },
  {
    path: '/apply',
    name: 'apply',
    icon: 'solution',
    component: './Apply',
  },
  {
    path: '/collect',
    name: 'collect',
    icon: 'star',
    component: './Collect',
  },
  {
    path: '/browse',
    name: 'browse',
    icon: 'eye',
    component: './Browse',
  },

  {
    path: '/system',
    name: 'system',
    icon: 'setting',
    routes: [
      {
        path: '/system',
        redirect: '/system/notice',
      },
      {
        path: '/system/notice',
        name: 'notice',
        component: './System/Notice',
      },
      {
        path: '/system/about',
        name: 'about',
        component: './System/About',
      },
      {
        path: '/system/agreement',
        name: 'agreement',
        component: './System/Agreement',
      },
      {
        path: '/system/privacy',
        name: 'privacy',
        component: './System/Privacy',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
