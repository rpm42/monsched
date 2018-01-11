import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  weeks: {
    '2017-10-02': {
      name: '22-ая неделя по пятидесятнице',
      start: '2017-10-02',
      end: '2017-10-09'
    }
  },
  days: {
    '2017-10-02': {
      1: { week: '2017-10-02', index: 1, description: '', pagebreak: false, services: [] },
      2: { week: '2017-10-02', index: 2, description: '', pagebreak: false, services: [] },
      3: { week: '2017-10-02', index: 3, description: '', pagebreak: false, services: [] },
      4: { week: '2017-10-02', index: 4, description: '', pagebreak: false, services: [] },
      5: { week: '2017-10-02', index: 5, description: '', pagebreak: false, services: [] },
      6: { week: '2017-10-02', index: 6, description: '', pagebreak: false, services: [] },
      7: { week: '2017-10-02', index: 7, description: '', pagebreak: false, services: [] }
    }
  }
}

const mutations = {
  CREATE_WEEK (state, week) {
    if (!state.weeks[week.start]) {
      Vue.set(state.weeks, week.start, week)
      Vue.set(state.days, week.start, {
        1: { week: week.start, index: 1, description: '', pagebreak: false, services: [] },
        2: { week: week.start, index: 2, description: '', pagebreak: false, services: [] },
        3: { week: week.start, index: 3, description: '', pagebreak: false, services: [] },
        4: { week: week.start, index: 4, description: '', pagebreak: false, services: [] },
        5: { week: week.start, index: 5, description: '', pagebreak: false, services: [] },
        6: { week: week.start, index: 6, description: '', pagebreak: false, services: [] },
        7: { week: week.start, index: 7, description: '', pagebreak: false, services: [] }
      })
    }
  },
  SET_WEEK (state, {week, weekObj}) {
    Vue.set(state.days, week, weekObj)
  },
  ADD_SERVICE (state, {week, day, service}) {
    let services = state.days[week][day].services || []
    // services.push(service)
    services = [ ...services, service ]
    Vue.set(state.days[week][day], 'services', services)
  },
  SET_DAY (state, dayObj) {
    console.log('SET_DAY', dayObj)
    let weekObj = {...state.days[dayObj.week]}
    weekObj[dayObj.index] = dayObj
    Vue.set(state.days, dayObj.week, weekObj)
  }
}

const store = () => new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]
})

export default store
