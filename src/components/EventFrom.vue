<template>
  <div class="event-form">
    <h1>{{ event.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'EventForm',
  props: {
    event: Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .event-form{
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
  }
</style>
