<template>
  <div class="event-comment-item">
    <h4>{{ eventComment.author }}</h4>
    <h3>{{ eventComment.content }}</h3>
    <small>{{ eventComment.creationDate }}</small>
  </div>
</template>

<script>
export default {
  name: 'EventCommentItem',
  props: {
    eventId: Number,
    eventComment: Object,
    onClick: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .event-comment-item{
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
  }
</style>
