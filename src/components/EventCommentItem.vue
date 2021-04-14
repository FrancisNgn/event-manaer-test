<template>
  <div class="event-comment-item d-flex m-2 p-2 bg-white border">
    <div class="event-comment-item__profile mr-2">
      <b-icon icon="person-circle" font-scale="3"/>
    </div>
    <div class="d-flex flex-column flex-grow-1">
      <div class="event-comment-item__author text-black-50 d-flex">
        {{ eventComment.author }}
        <b-icon icon="pencil" variant="success" class="ml-auto btn-comment-pointer" font-scale="1.5" @click="$emit('edit')"/>
        <b-icon icon="trash" variant="danger" class="ml-1 btn-comment-pointer" font-scale="1.5" @click="$emit('remove')"/>
      </div>
      <div class="event-comment-item__content">{{ eventComment.content }}</div>
      <small class="event-comment-item__date ml-auto text-black-50">{{ eventComment.creationDate | formatDate }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCommentItem',
  props: {
    eventComment: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .event-comment-item{
    font-size: 12px;
  }
  .btn-comment-pointer{
    cursor: pointer;
  }
  .event-comment-item__profile{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #cacaca;
  }
</style>
