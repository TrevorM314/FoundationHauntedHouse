<template>
  <v-container>
    <v-card style="padding: 8px;">
      <v-card-title>
      Next Group Number: {{ this.$store.state.curr_group_number }}
      </v-card-title>
      <v-form ref="form" v-model="valid" style="margin: 8px;">
        <v-text-field v-model="gname" :rules="nameRules" label="Group Name" />
        <v-text-field v-model="gsize" :rules="numRules" label="Number of people" />
        <v-text-field v-model="phone" :rules="phoneRules" label="Phone number for group" />
        <v-checkbox v-model="text" label="Send SMS message?"></v-checkbox>
      </v-form>
      <v-spacer></v-spacer>
      <v-card-actions>
      <v-btn v-on:click="addGroup" color="primary" :disabled="!valid">Add Group</v-btn>
      <v-btn v-on:click="clear">Clear Form</v-btn>
      <v-btn v-on:click="removeGroup" color="primary">Remove Group</v-btn>
      <v-btn v-on:click="showResetQueue" color="error">Reset Queue</v-btn>
      </v-card-actions>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="this.$store.state.queue"
    >
      <template v-slot:item.edit="{ item }">
        <v-btn color="primary" dark v-on:click="showEditItem(item)">
          Edit
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="editDialog">
      <v-card style="padding: 8px;">
        <v-form>
          <v-text-field v-model="editNumber" label="Group Number" readonly></v-text-field>
          <v-text-field v-model="editName" :rules="nameRules" label="Group Name"></v-text-field>
          <v-text-field v-model="editSize" :rules="numRules" label="Group Size"></v-text-field>
          <v-text-field v-model="editPhone" :rules="phoneRules" label="Group Phone"></v-text-field>
          <v-checkbox v-model="editText" label="Send an SMS?"></v-checkbox>
        </v-form>
        <v-card-actions>
          <v-btn v-on:click="saveEdit" color="primary">Save Changes</v-btn>
          <v-btn v-on:click="hideEditItem">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="resetDialog">
      <v-card style="padding: 8px;">
        <v-card-title>Are you sure you want to reset the queue?</v-card-title>
        <v-card-subtitle>You cannot undo this action.</v-card-subtitle>
        <v-card-actions>
          <v-btn v-on:click="resetQueue" color="primary">Reset</v-btn>
          <v-btn v-on:click="hideResetQueue">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "edit",
  data() {
    return {
        valid: false,
        resetDialog: false,
        editDialog: false,
        gname: "",
        gsize: "",
        phone: "+1",
        text: true,
        nameRules: [ v => !!v || "Group name is required" ],
        numRules: [
            v => !!v || "Group count is required",
            v => /[0-9]+/.test(v) || "Must be a number!"
        ],
        editNumber: 0,
        editName: "",
        editSize: "",
        editPhone: "",
        editText: true,

    }
  },
  created() {
      setInterval(() => { this.queue = this.updateList(); console.log("updating"); }, 1000);
  },
  computed: {
    phoneRules() {
      return [ v => /\+1[0-9]{10}/.test(v) || "Error: Must be valid US phone number" ];
    },
    headers() {
        return [
            { text: 'Group Number' , value: 'group_number' },
            { text: 'Group Name', value: 'group_name' },
            { text: 'Group Size', value: 'group_size' },
            { text: 'Phone', value: 'group_phone' },
            { text: 'Send Text', value: 'group_text' },
            { text: 'Edit', value: 'edit' }
        ]
    }
  },
  methods: {
    clear() {
        this.gname = "";
        this.gsize = "";
        this.phone = "+1";
    },
    addGroup() {
      this.$store.commit('enqueue', { group_number: this.$store.state.curr_group_number, group_name: this.gname, group_size: this.gsize, group_phone: this.phone, group_text: this.text });
      this.$store.state.curr_group_number++;
      this.clear();
    },
    removeGroup() {
      this.$store.commit('dequeue');
    },
    showResetQueue() {
      this.resetDialog = true;
      console.log(this.resetDialog);
    },
    hideResetQueue() {
      this.resetDialog = false;
    },
    resetQueue() {
      this.$store.commit('reset');
      this.resetDialog = false;
    },
    showEditItem(item) {
      this.editNumber = item.group_number;
      this.editName = item.group_name;
      this.editSize = item.group_size;
      this.editPhone = item.group_phone;
      this.editText = item.group_text;
      this.editDialog = true;
    },
    hideEditItem() {
      this.editNumber = "";
      this.editName = "";
      this.editSize = "";
      this.editPhone = "";
      this.editText = "";
      this.editDialog = false;
    },
    saveEdit() {
        this.$store.commit('edit', {
            group_number: this.editNumber,
            group_name: this.editName,
            group_size: this.editSize,
            group_phone: this.editPhone,
            group_text: this.editText
        });
        this.hideEditItem();
    },
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