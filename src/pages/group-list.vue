<template>
  <div>{{this.queue}}</div>
</template>

<script>
    export default {
        name: "view",
        data() {
            return {
                queue: []
            }
        },
        created () {
            setInterval(() => { this.queue = this.updateList(); console.log("updating"); }, 1000);
        },
        methods: {
            getList() {
                return this.$store.state.queue
            },
            updateList() {
                console.log("queue before: " + this.$store.state.queue);
                if(localStorage.getItem('vuex')) {
                    // Replace the state object with the stored item
                    console.log(localStorage.getItem('vuex'));
                    Object.assign(this.$store.state, JSON.parse(localStorage.getItem('vuex')))
                }
                console.log("queue after: " + this.$store.state.queue);
                return this.$store.state.queue;
            }
        }
    }
</script>



<style scoped>

</style>