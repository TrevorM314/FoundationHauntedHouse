<template>
  <div>
    <h1>Hello World</h1>
    <button type="button"
            @click="addGroup"
    >Add Group</button>
    <div>{{getList}}</div>
  </div>
</template>

<script>
export default {
  name: "edit",
  computed: {
    getList() {
      return this.$store.state.queue
    }
  },
  methods: {
    addGroup() {
      this.$store.commit('enqueue', { name: "Trevor" });
    }
  }
}
</script>

<style scoped>

</style>