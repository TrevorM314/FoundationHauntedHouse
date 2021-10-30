<template>
  <div>
    <h1>Haunted House Queue</h1>
    <div v-for="(entry) in queue"
         :key="entry.id"
    >
      {{entry.id}}
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    queue() {
      return this.$store.state.queue;
    }
  },
  mounted() {
    console.log("Hello");
  }
}
</script>

<style scoped>

</style>