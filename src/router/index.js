import Vue from 'vue'
import Router from 'vue-router'
import Preview from '@/components/Preview'
import advertlist from "@/components/AdvertList";
import deletepop from "@/components/deletepop"
import addadvert from "@/components/addadvert"
import editadvert from "@/components/EditAdvert"
import viewadvert from "@/components/viewAdvert"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Preview',
      component: Preview
    },
    {
  	  path: '/com1',
  	  name: 'advertlist',
  	  component: advertlist
	  },
    {
      path: '/com2',
      name: 'deletepop',
      component: deletepop
    },
    {
      path: '/addadvert/:advid',
      name: 'addadvert',
      component:addadvert
    },
    {
      path: '/editadvert/:advid',
      name: 'editadvert',
      component:editadvert
    },
    {
      path: '/viewadvert/:advid',
      name: 'viewadvert',
      component:viewadvert
    }
  ]
})
