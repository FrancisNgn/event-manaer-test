<template>
  <div id="app" class="container">
    <div class="app-title py-2 row">Mes évènements</div>
    <div class="app-content d-flex row">
      <div class="col-md-3 app-content__event-list bg-light border d-flex flex-column">
        <event-item v-for="event in events" :key="event.id" :active="event.id === currentEvent.id" :event="event" :onClick="setCurrentEvent"/>
      </div>
      <event-form :event="currentEvent" v-if="currentEvent.id !==0"/>
      <div v-else class="col-md-9 d-flex flex-column flex-grow-1  pl-3 pt-3 align-items-center justify-content-center">
        <b-icon icon="exclamation-triangle" font-scale="5"/>
        <h2>Choisissez un évènement</h2>
      </div>
    </div>
  </div>
</template>

<script>

import EventItem from './components/EventItem.vue'
import EventForm from "./components/EventFrom";
import {getEvents, getEventComments} from "./assets/data";

export default {
  name: 'App',
  data: ()=> {
    return {
      currentEvent : {id:0, comments:[]},
      events : [],
    }
  },
  components: {
    EventForm,
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
    setCurrentEvent(event){
      this.currentEvent = event;
      this.currentEvent.comments = getEventComments(this.currentEvent.id);
    },
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .app-content{
  }
  .app-title{
    color: #7b7b7b;
    font-size: 20px;
    text-align: left;
  }
  .app-content__event-list{
    overflow-y: scroll;
    height: 637px;
  }
</style>
