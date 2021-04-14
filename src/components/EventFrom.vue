<!--suppress ALL -->
<template>
    <div class="app-content__edit-form col-md-9 ">
        <div class="d-flex flex-column row">
            <div class="col-md-12">
                <h5 class="mb-0">{{ eventItem.title }}</h5>
                <small>Crée le {{ eventItem.creationDate | formatDateTime }} par {{ eventItem.createdBy }}</small>
            </div>
        </div>
        <div class="app-content row d-flex pt-3">
            <div class="app-content__event-form col-md-7">
                <div class="form-group">
                    <label class="control-label required" for="event_title">Titre</label>
                    <b-form-input class=""
                                  id="event_title"
                                  v-model="eventItem.title"
                                  placeholder="Titre de l'evenement..."
                                  required
                    />
                </div>
                <div class="form-group">
                    <label class="control-label" for="event_description">Description</label>
                    <b-form-textarea
                            id="event_description"
                            v-model="eventItem.description"
                            placeholder="Entrez une description..."
                            rows="5"
                            max-rows="6"
                    ></b-form-textarea>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label class="control-label required" for="event_date">Date</label>
                        <b-input-group class="d-flex">
                            <b-form-input
                                    id="event_date"
                                    v-model="eventItem.date"
                                    type="text"
                                    placeholder="YYYY-MM-DD"
                                    autocomplete="off"
                                    class="w-50"
                            ></b-form-input>
                            <b-input-group-append class="h-32">
                                <b-form-datepicker
                                        v-model="eventItem.date"
                                        button-only
                                        right
                                        locale="fr-FR"
                                        aria-controls="example-input"
                                        @context="onContext"
                                ></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label required" for="event_hour">Heure</label>
                        <b-input-group class="mb-3">
                            <b-form-input
                                    id="event_hour"
                                    v-model="eventItem.hour"
                                    type="text"
                                    placeholder="HH:mm:ss"
                                    class="w-50"
                            ></b-form-input>
                            <b-input-group-append class="h-32">
                                <b-form-timepicker
                                        v-model="eventItem.hour"
                                        button-only
                                        right
                                        show-seconds
                                        locale="fr-FR"
                                        aria-controls="example-input"
                                ></b-form-timepicker>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label required" for="project_name">Nom du statut</label>
                    <b-form-select v-model="eventItem.statusName" :options="stateOptions"></b-form-select>
                </div>
                <div class="form-group">
                    <label class="control-label required" for="project_name">Employée concerné</label>
                    <b-form-select v-model="eventItem.involvedEmployeeId" :options="employees"></b-form-select>
                </div>
                <div class="form-group">
                    <label class="control-label required" for="project_name">Témoins</label>
                    <b-form-select v-model="eventItem.Témoins" :options="employeesTemoins" multiple></b-form-select>
                </div>
            </div>
            <div class="app-content__comment-list col-md-5">
                <b>Commentaires</b>
                <div class="app-content__comment-list__content bg-light border scrollbar" id="app-content__comment-list__content">
                    <event-comment-item
                            v-for="(comment, index) in comments"
                            :key="index"
                            :event-comment="comment"
                            @remove="deleteComment(index)" @edit="editComment(index)"/>
                </div>
                <b-form @submit="onSubmitNewComment" class="d-flex p-2 border border-top-0" v-if="newCommentShow">
                    <b-form-input class="mr-2 app-content__comment-list__new-comment"
                                  v-model="newComment.content"
                                  placeholder="Laissez un commentaire..."
                                  required
                    />
                    <b-button type="submit" variant="success">
                        <b-icon icon="upload" font-scale="1"/>
                    </b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import EventCommentItem from "./EventCommentItem";
    import {getEmployees, getEventComments} from "../assets/data";
    
    export default {
        name: 'EventForm',
        components: {EventCommentItem},
        props: {
            eventItem: Object,
            // updateEvent: Function,
        },
        data(){
            return {
                comments : [],
                employees : [],
                employeesTemoins : [],
                stateOptions: [
                    { value: 'Open', text: 'Ouvert' },
                    { value: 'Closed', text: 'Fermé' },
                    { value: 'InProgress', text: 'En cours' },
                ],
                currentEditCommentIndex: null,
                formatted: '',
                selected: '',
                newCommentShow: true,
                newComment :{
                    creationDate : '',
                    author : 'CurrentUser',
                    content : ''
                }
            }
        },
        mounted: function(){
            this.employees = getEmployees().map( em => {
                return {value: em.id, text: em.firstname+' '+em.lastname+' ('+em.id+')'}
            });
            this.employeesTemoins = getEmployees().map( em => {
                return {value: em.id, text: em.firstname}
            });
            this.comments = [...getEventComments(this.eventItem.id)];
            console.log('API CALL TO GET DATA');
        },
        watch:{
            eventItem: function(newEvent, oldEvent){
                if(newEvent.id !== oldEvent.id){
                    this.comments = [...getEventComments(this.eventItem.id)];
                    console.log('API CALL TO GET COMMENTS DATA');
                }
            }
        },
        methods: {
            onContext(ctx) {
                this.formatted = ctx.selectedFormatted;
                this.selected = ctx.selectedYMD;
            },
            deleteComment(index) {
                console.log(index);
                this.comments.splice(index, 1);
            },
            editComment(index) {
                this.newComment.content = this.comments[index].content;
                this.currentEditCommentIndex = index;
                console.log(index, this.comments[index].content);
            },
            onSubmitNewComment(event) {
                event.preventDefault();
                if(this.currentEditCommentIndex === null){
                    this.comments.push({...this.newComment,creationDate : new Date().toISOString()});
                    // // Trick to reset/clear native browser form validation state
                    this.newCommentShow = false;
                    this.$nextTick(() => {
                        this.newCommentShow = true;
                        // Scroll to botom
                        const commentListContent = document.getElementById("app-content__comment-list__content");
                        commentListContent.scrollTop = commentListContent.scrollHeight;
                    })
                } else{
                    this.comments[this.currentEditCommentIndex] = {...this.newComment,creationDate : new Date().toISOString()};
                    this.currentEditCommentIndex = null;
                }
                this.newComment.content = '';
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .custom-select{
        background-color: #F1F3F4;
        border: none #dddddd;
    }
    .event-form{
        font-size: 12px;
        padding: 15px;
        width: 450px;
    }
    .app-content__comment-list__new-comment{
        height: auto;
    }
    .app-content__comment-list__content{
        height: 495px;
        overflow-y: scroll;
    }
    .app-content__event-form{
        min-width: 350px;
    }
    .form-group {
        margin-bottom: 15px;
    }
    label {
        font-weight: 500;
        color: #333;
        font-size: 13px;
        margin-bottom: 3px;
    }
    .h-32{
        height: 32px;
    }
    input.form-control, textarea.form-control {
        border-radius: 2px;
        box-shadow: inset 0 0 0 #00000013, 0 0 0 #77777780;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        display: block;
        width: 100%;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        color: rgb(128,134,139);
        background-color: #F1F3F4;
        border: none #dddddd;
    }
</style>
