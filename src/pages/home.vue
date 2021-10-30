<template>
  <div>
    <h1>Haunted House Queue</h1>
    <div v-for="entry in queue"
         :key="entry.id"
    >
      {{entry.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {

    }
  },
  computed: {
    queue() {
      console.log("Update");
      return this.$store.state.queue;
    }
  },
  mounted() {
    this.timer = setInterval(this.update, 10000);
    this.queue = this.$store.state.queue();
  },
  methods: {
    update() {
      location.reload();
    }
  }
}
</script>

<style scoped>

</style>