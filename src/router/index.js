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
      path: '/:date',
      name: 'WeekView',
      component: WeekView,
      props: (route) => ({ date: route.params.date, yaml: route.query.yaml === null })
    },
    {
      path: '/:date/:day/create-service',
      name: 'CreateService',
      component: CreateService,
      props: true
    }
  ]
})
