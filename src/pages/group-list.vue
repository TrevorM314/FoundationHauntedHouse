<template>
  <div>
    <v-card dark class="text-center">
      <v-img src="https://www.tripsavvy.com/thmb/rfULGIEBzqBba8PCTYKLsWGsd_4=/2122x1412/filters:fill(auto,1)/ParisCatacombs-9b0f678ccab940c28916e64afa309bfb.jpg" max-height="1080px">
        <v-card-title class="justify-center">Into the Catacombs</v-card-title>
        <v-card-subtitle light>Foundation Open House</v-card-subtitle>

        <v-card light style="background-color: #F75F1C; margin: 8px; margin-left: 360px; margin-right: 360px;">
          <v-card-title>Next Up</v-card-title>
          <v-data-table
              style="background-color: #F75F1C;"
              :headers="headers"
              :items="[this.$store.state.queue[0]]"
              hide-default-footer

          ></v-data-table>
        </v-card>

        <v-data-table
            style="margin: 8px; margin-left: 360px; margin-right: 360px;"
            :headers="headers"
            :items="this.$store.state.queue.slice(1)"
            hide-default-header
            hide-default-footer
            dense
            items-per-page="50"
        >
          Catacombs Queue
        </v-data-table>
      </v-img>


    </v-card>
  </div>

</template>

<script>
    export default {
        name: "view",
        data() {
            return {
                queue: []
            }
        },
        created() {
            setInterval(() => { this.queue = this.updateList(); }, 1000);
        },
        computed: {
            headers() {
                return [
                    { text: 'Group Number' , value: 'group_number' },
                    { text: 'Group Name', value: 'group_name' }
                ]
            }
        },
        methods: {
            updateList() {
                if(localStorage.getItem('vuex')) {
                    // Replace the state object with the stored item
                    console.log(localStorage.getItem('vuex'));
                    Object.assign(this.$store.state, JSON.parse(localStorage.getItem('vuex')))
                }
                return this.$store.state.queue;
            }
        }
    }
</script>



<style scoped>

</style>