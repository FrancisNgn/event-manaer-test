<template>
    <div id="app" class="container">
        <div class="app-title py-2 row">Mes évènements</div>
        <div class="app-content d-flex row">
            <div class="col-md-3 app-content__event-list bg-light border d-flex flex-column scrollbar">
                <event-item
                        v-for="eventItem in events"
                        :key="eventItem.id"
                        :active="eventItem.id === currentEvent.id"
                        :event-item="eventItem"
                        :onClick="setCurrentEvent"
                />
            </div>
            <event-form :event-item="currentEvent" v-if="currentEvent.id !==0"/>
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
                currentEvent : {id:0},
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

    /*
     *  SCROLLBAR
     */
    .scrollbar {
        overflow-y: scroll;
        height: 637px;
    }
    .scrollbar::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
        border-radius: 10px;
    }
    .scrollbar::-webkit-scrollbar {
        width: 10px;
        background-color: #F5F5F5;
    }
    .scrollbar::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-image:
                -webkit-gradient(linear, left bottom, left top, color-stop(0.44, rgb(174 222 185)),
                color-stop(0.72, rgb(134 205 150)),
                color-stop(0.86, rgb(80 184 104)));
    }
</style>
