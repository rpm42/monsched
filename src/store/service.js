import Vue from 'vue'

const state = {
  list: {}
}

const mutations = {
  ADD_SERVICE (state, service) {
    let week = state.list[service.week] || { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} }
    let day = week[service.day]
    let services = day.services || []
    services.push(service)
    Vue.set(state.list, service.date, week)
  },
  SET_DAY_INFO (state, info) {
    let week = state.list[info.week] || { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} }
    let day = week[info.day]
    day.info = info.info
    Vue.set(state.list, info.date, week)
  },
  SET_WEEK (state, week) {
    // ...
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
