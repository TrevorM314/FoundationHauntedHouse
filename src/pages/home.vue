<template>
  <v-container>
    <h1>Foundation Haunted House Waitlist</h1>

    <div id="actions">

      <div id="displayWaitlist">
        <router-link to="/waitlist" target="_blank">
          <v-icon>mdi-monitor</v-icon>
          <br>
          Display Waitlist
        </router-link>
      </div>

      <v-divider vertical></v-divider>

      <div id="registerGroups">
        <router-link to="/registration" target="_blank">
          <v-icon>mdi-account-multiple-plus</v-icon>
          <br>
          Register Groups
        </router-link>
      </div>

    </div>
  </v-container>
</template>

<script>
export default {
  name: "home.vue"
}
</script>

<style scoped>

#actions {
  display: flex;
}

#actions > div {
  width: 50%;
  text-align: center;
}

.v-icon {
  font-size: 100px !important;
}

</style>