<template>
  <div class="page">

    <!--
    Previous Titles:
      - Into the Catacombs
      - Sunnyside Asylum
    -->
    <div class="banner">
      <h1>Sunnyside Asylum</h1>
      <h2>Foundation Open House</h2>
    </div>

    <div class="body">
      <v-card class="rounded-b-0">
        <h2>Next Group</h2>
        <div id="next-group">
          {{nextGroup}}
        </div>
      </v-card>

      <v-card class="queue rounded-t-0">
        <table>
          <tbody>
            <tr
              v-for="group in $store.state.queue.slice(1)"
              :key="group.number"
            >
              <td>
                {{group.number}}
              </td>
              <td>
                {{group.name}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </div>

  </div>
</template>

<script>
    export default {
        name: "view",
        data() {
            return {
                queue: [],
                headers: [
                    { text: 'Group Number' , value: 'number', width: '90%' },
                    { text: 'Group Name', value: 'name' }
                ]
            }
        },

        created() {
            setInterval(() => { this.queue = this.updateList(); }, 1000);
        },

        computed: {
            nextGroup() {
                return this.$store.getters.nextGroup?.name;
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

/* Variables */
* {
  --catacombs-bg: url("https://www.tripsavvy.com/thmb/rfULGIEBzqBba8PCTYKLsWGsd_4=/2122x1412/filters:fill(auto,1)/ParisCatacombs-9b0f678ccab940c28916e64afa309bfb.jpg");
  --asylum-bg: url("https://assets3.thrillist.com/v1/image/776232/1200x630/flatten;crop_down;webp=auto;jpeg_quality=70");

  --bg-tint: rgba(0, 0, 0, .7);
}

.page {
  background:
      linear-gradient(var(--bg-tint), var(--bg-tint)),
      var(--asylum-bg) no-repeat center center fixed;

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  height: 100%;
}

.banner {
  background: rgba(0, 0, 0, .7);
  width: 100vw;
}

h1, h2 {
  text-align: center;
  color: rgb(230, 230, 230);
}

.body {
  padding: 50px 100px;
}

.v-card > h2 {
  text-align: left;
  color: rgba(0, 0, 0, .65);
  margin-left: 5px;
}

#next-group {
  font-size: 5em;
  font-weight: 500;
  line-height: 1.2em;

  text-align: center;
}

tr:nth-child(odd) {
  background: rgb(200, 200, 200);
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

td:first-child {
  width: 65px;
  text-align: center;
}

</style>