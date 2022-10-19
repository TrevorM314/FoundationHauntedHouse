<template>
  <div class="page">

    <!--
    Previous Titles:
      - Into the Catacombs
      - The Asylum: A Foundation Open House
    -->
    <div class="banner">
      <h1>The Asylum</h1>
      <h2>A Foundation Open House</h2>
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
              v-for="(group, idx) in $store.state.queue.slice(1)"
              :key="group.number"
            >
              <td>
                {{group.number}}
              </td>
              <td>
                {{group.name}}
              </td>
              <td>
                {{millisecondsToHHMMSS(timeBetweenGroups * (idx+1))}}
              </td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </div>

  </div>
</template>

<script>
function millisecondsToHHMMSS(milliseconds) {
  let remainder = milliseconds
  const hours = Math.floor(remainder / (1000 * 60 * 60));
  remainder = remainder % (1000 * 60 * 60)
  const minutes = Math.floor(remainder / (1000 * 60));
  remainder = remainder % (1000 * 60);
  const seconds = Math.floor(remainder / 1000);
  return hours.toString().padStart(2, '0') + ':' +
      minutes.toString().padStart(2, '0') + ':' +
      seconds.toString().padStart(2, '0')
}

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
        },

        timeBetweenGroups() {
            return this.$store.getters.avgTimeBetweenGroups;
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
        },

        millisecondsToHHMMSS
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

.v-card {
  background-color: rgba(255, 255, 255, .5);
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

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

tr {
  font-size: 1.3em;
  background: rgba(255, 255, 255, .5);
}

tr:nth-child(odd) {
  background: rgba(200, 200, 200, .5);
}

td:first-child {
  width: 65px;
  text-align: center;
}

td:last-child {
  text-align: end;
  padding-right: 8px;
}

</style>