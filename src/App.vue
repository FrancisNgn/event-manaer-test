<template>
  <div id="app">
    <div class="app-title">Mes Evenements</div>
    <div class="app-content">
      <div class="app-content__event-list">
        <event-item v-for="event in events" :key="event.id" :event="event" :onClick="setCurrentEvent"/>
      </div>
      <div class="app-content__edit-form">
        <event-form :event="currentEvent" v-if="currentEvent.id !==0"/>
        <div v-else>Please select an Event for edition</div>
      </div>
      <div class="app-content__comment-list" v-if="currentEvent.id !==0">
        <div>Commentaires</div>
        <event-comment-item v-for="comment in currentEvent.comments" :key="comment.id" :event-id="currentEvent.id" :event-comment="comment"/>
      </div>
    </div>
  </div>
</template>

<script>

import EventItem from './components/EventItem.vue'
import EventForm from "./components/EventFrom";
import EventCommentItem from "./components/EventCommentItem";
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
    EventCommentItem,
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
