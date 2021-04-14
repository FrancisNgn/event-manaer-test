<template>
  <div class="event-item">
    <h1>{{ event.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'EventItem',
  props: {
    event: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.event-item{
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
}
</style>
