import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/pages/Index'
import DaysView from '@/components/pages/DaysView'
import Preview from '@/components/pages/Preview'
import CreateService from '@/components/pages/CreateService'
import YamlView from '@/components/pages/YamlView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:date/preview',
      name: 'Preview',
      component: Preview,
      props: true
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/:date',
          name: 'DaysView',
          component: DaysView,
          props: true
        },
        {
          path: '/:date/yaml',
          name: 'YamlView',
          component: YamlView,
          props: true
        },
        {
          path: '/:date/:day/create-service',
          name: 'CreateService',
          component: CreateService,
          props: true
        }
      ]
    }
  ]
})

/*

// {
    //   path: '/:date/preview',
    //   name: 'Preview',
    //   component: require('@/components/pages/Preview.vue'),
    //   props: true
    // },
    // {
    //   path: '/create-week',
    //   name: 'CreateWeek',
    //   component: equire('@/components/pages/CreateWeek.vue')
    // },
    // {
    //   path: '/:date/:day/create-service',
    //   name: 'CreateService',
    //   component: require('@/components/pages/CreateService.vue'),
    //   props: true
    // },
    // {
    //   path: '/:date',
    //   name: 'WeekView',
    //   component: require('@/components/pages/WeekView.vue')
    // }

import Vue from 'vue'
import Router from 'vue-router'
import Blank from '@/components/Blank'
import WeekView from '@/components/WeekView'
import CreateWeek from '@/components/CreateWeek'
import CreateService from '@/components/CreateService'
import EditDay from '@/components/EditDay'
import EditService from '@/components/EditService'
import Preview from '@/components/Preview'

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
    },
    {
      path: '/:date/:day/:sindex/edit-service',
      name: 'EditService',
      component: EditService,
      props: true
    },
    {
      path: '/:date/:day/edit-day',
      name: 'EditDay',
      component: EditDay,
      props: true
    },
    {
      path: '/:date/preview',
      name: 'Preview',
      component: Preview,
      props: true
    }
  ]
})
*/
