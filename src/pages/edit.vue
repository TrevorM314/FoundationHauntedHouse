<template>
  <h1>Hello World</h1>
</template>

<script>
export default {
  name: "edit",
  methods: {
    addGroup() {
      this.$store.commit('enqueue', { name: "Trevor" });
    }
  }
}
</script>

<style scoped>

</style>