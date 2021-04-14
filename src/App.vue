<template>
  <div id="app">
    <div class="app-title">Mes Evenements</div>
    <div class="app-content">
      <div class="app-content__event-list">
        <event-item v-for="event in events" :key="event.id" :event="event"/>
      </div>
      <div class="app-content__edit-form"><hello-world :msg="currentEventIndex"/></div>
      <div class="app-content__comment-list">content__comment</div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {getEvents} from './assets/data.js'
import EventItem from './components/EventItem.vue'

export default {
  name: 'App',
  data: ()=> {
    return {
      currentEventIndex : null,
      events : [],
    }
  },
  components: {
    HelloWorld,
    EventItem
  },
  mounted: function(){
    this.getAllEvent();
  }, 
  methods:{
    getAllEvent(){
      this.events = getEvents();
      console.log('API CALL TO GET DATA');
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
