import HelloWorld from '@/components/HelloWorld'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '*', redirect: 'signin'}, {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {requiresAuth: true}
    },
    {path: '/signup', name: 'Signup', component: Signup},
    {path: '/signin', name: 'Signin', component: Signin}
  ]
})

// router.beforeEach()を追加
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('signin')
  else if (!requiresAuth && currentUser) next()
  else next()
})

export default router
