<template>
  <div class="event-item d-flex my-2 px-4 py-3 bg-white border" :class="(active)?'border-success':''" @click="onClick(eventItem)">
    {{ eventItem.title }}
  </div>
</template>

<script>
export default {
  name: 'EventItem',
  props: {
    eventItem: Object,
    active: Boolean,
    onClick: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .event-item{
    font-size: 16px;
    cursor: pointer;
  }
</style>
