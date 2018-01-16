<template>
  <section class="container">
    <div>
      <h1>Седмицы</h1>
      <ul class="list pl0">
        <li class="mv2" v-for="week in weeks" :key="week.start">
          <router-link :to="`/${week.start}`">
            <strong class="b">{{week.name}}</strong> <small class="f7">({{week.start}} - {{week.end}})</small>
          </router-link>
        </li>
      </ul>
      <hr>
      <router-link to="/create-week" tag="button"> + Добавить седмицу</router-link>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WeekList',
  computed: mapState({
    weeks: state => state.weeks
  })
}
</script>

<style>

</style>
