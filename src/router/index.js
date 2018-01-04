import Vue from 'vue'
import Router from 'vue-router'
import Blank from '@/components/Blank'
import WeekView from '@/components/WeekView'
import CreateWeek from '@/components/CreateWeek'
import CreateService from '@/components/CreateService'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Blank',
      component: Blank
    },
    {
      path: '/create-week',
      name: 'CreateWeek',
      component: CreateWeek
    },
    {
      path: '/:week',
      name: 'WeekView',
      component: WeekView
    },
    {
      path: '/:week/:day/create-service',
      name: 'CreateService',
      component: CreateService
    }
  ]
})
