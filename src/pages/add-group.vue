<template>
  <v-container>
    <v-card style="padding: 8px;">
      <v-card-title>
      Next Group Number: {{ this.$store.state.curr_group_number }}
      </v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="gname" :rules="nameRules" label="Group Name" />
        <v-text-field v-model="gnum"  :rules="numRules" label="Number of people" />
        <v-text-field v-model="phone" :rules="phoneRules" label="Phone number for group" />
      </v-form>
      <v-spacer></v-spacer>
      <v-btn v-on:click="addGroup" color="primary" :disabled="!valid">Add Group</v-btn>
      <span style="padding: 4px;"> </span>
      <v-btn v-on:click="clear">Clear Form</v-btn>
      <span style="padding: 4px;"> </span>
      <v-btn v-on:click="removeGroup" color="primary">Remove Group</v-btn>
      <v-spacer></v-spacer>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "edit",
  data() {
    return {
        valid: false,
        gname: "",
        gnum: "",
        phone: "+1",
        nameRules: [ v => !!v || "Group name is required" ],
        numRules: [
            v => !!v || "Group count is required",
            v => /[0-9]+/.test(v) || "Must be a number!"
        ]
    }
  },
  computed: {
    phoneRules() {
      return [ v => /\+1[0-9]{10}/.test(v) || "Error: Must be valid US phone number" ];
    },
  },
  methods: {
    clear() {
        this.gname = "";
        this.gnum = "";
        this.phone = "+1";
    },
    addGroup() {
      this.$store.commit('enqueue', { group_number: this.$store.state.curr_group_number, group_name: this.gname, num_people: this.gnum, group_phone: this.phone });
      this.$store.state.curr_group_number++;
      this.clear();
    },
    removeGroup() {
      this.$store.commit('dequeue');
    },
  }
}
</script>

<style scoped>

</style>