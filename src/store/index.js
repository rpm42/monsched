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
    '2017-10-02': { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} }
  }
}

const mutations = {
  CREATE_WEEK (state, week) {
    if (!state.weeks[week.start]) {
      Vue.set(state.weeks, week.start, week)
      Vue.set(state.days, week.start, { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} })
    }
  },
  SET_WEEK (state, week) {
    // ...
  },
  ADD_SERVICE (state, service) {
    let services = state.days[service.week][service.day].services || []
    services.push(service)
    Vue.set(state.days[service.week][service.day], 'services', services)
  },
  SET_DAY_INFO (state, info) {
    let week = state.days[info.week]
    let day = week[info.day]
    day.info = info.info
    Vue.set(state.list, info.date, week)
  }
}

const store = () => new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]
})

export default store
