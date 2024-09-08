const c1 = () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/home/shumail/Documents/projects/vueprojects/cerebralabs.github.io/src/pages/About.vue")
const c2 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/shumail/Documents/projects/vueprojects/cerebralabs.github.io/node_modules/gridsome/app/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/home/shumail/Documents/projects/vueprojects/cerebralabs.github.io/src/pages/Index.vue")

export default [
  {
    path: "/about/",
    component: c1
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    name: "home",
    path: "/",
    component: c3
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
