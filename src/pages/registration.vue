<template>
  <v-container>
    <v-card class="pa-2 mb-4">
      <v-card-title>
      Next Group Number: {{ this.$store.state.nextRegistrationNumber }}
      </v-card-title>
      <v-form ref="form" v-model="valid" style="margin: 8px;">
        <v-text-field v-model="group.name" :rules="nameRules" label="Group Name" />
        <v-text-field v-model="group.size" :rules="numRules" label="Number of people" type="number"/>
        <v-text-field v-model="group.phone" :rules="phoneRules" label="Phone number for group" />
        <v-checkbox v-model="group.notifyByText" label="Send SMS message?"></v-checkbox>
      </v-form>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn v-on:click="addGroup"
               color="primary"
               :disabled="!valid"
        >Add Group</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-on:click="clear">Clear Form</v-btn>
      </v-card-actions>
    </v-card>


    <v-card class="pa-2">
      <v-card-actions id="waitlistActions">
        <v-btn v-on:click="sendGroup" color="primary">Send Group</v-btn>
        <v-btn v-on:click="downloadHistory"
               icon
               title="Download"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-on:click="showResetQueue" color="error">Reset Queue</v-btn>
      </v-card-actions>
      <v-data-table
        :headers="headers"
        :items="this.$store.state.queue"
        disable-sort
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
              @click="showEditItem(item)"
              icon
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
              @click="showCancelDialog(item)"
              icon
              color="red"
          >
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.move="{ item }">
          <v-btn
              @click="move(item, directions.UP)"
              icon
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn
              @click="move(item, directions.DOWN)"
              icon
          >
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>


    <v-dialog v-model="editDialog" max-width="500px">
      <v-card style="padding: 8px;">
        <v-form>
          <p><span style="color: gray">Group Number:</span> {{editGroup.number}}</p>
          <v-text-field v-model="editGroup.name" :rules="nameRules" label="Group Name"></v-text-field>
          <v-text-field v-model="editGroup.size" :rules="numRules" label="Group Size"></v-text-field>
          <v-text-field v-model="editGroup.phone" :rules="phoneRules" label="Group Phone"></v-text-field>
          <v-checkbox v-model="editGroup.notifyByText" label="Send an SMS?"></v-checkbox>
        </v-form>
        <v-card-actions>
          <v-btn v-on:click="saveEdit" color="primary">Save Changes</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-on:click="hideEditItem">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="resetDialog" max-width="500px">
      <v-card style="padding: 8px;">
        <v-card-title>Are you sure you want to reset the queue?</v-card-title>
        <v-card-subtitle>You cannot undo this action.</v-card-subtitle>
        <v-card-actions>
          <v-btn v-on:click="resetQueue" color="error">Reset</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-on:click="hideResetQueue">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="cancelGroupDialog.active" max-width="500px">
      <v-card class="pa-2">
        <v-card-title>Are you sure?</v-card-title>
        <v-card-subtitle>You will not be able to recover this group</v-card-subtitle>
        <v-card-actions>
          <v-btn @click="cancel(cancelGroupDialog.group)"
                 color="error"
          >
            Cancel Group
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="cancelGroupDialog.active = false;">Nevermind</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>

import {saveAs} from "file-saver"
import {directions} from "@/enums";
const phoneRegex = /(\+1)?[0-9]{10}/;

export default {
  name: "edit",

  data() {
    const defaultEditGroupForm = Object.freeze({
      number: null,
      name: "",
      size: null,
      phone: "",
      notifyByText: true
    })

    return {
      valid: false,

      resetDialog: false,
      editDialog: false,
      cancelGroupDialog: {
        active: false,
        group: undefined
      },

      group: {
        name: "",
        size: null,
        phone: "+1",
        notifyByText: true
      },
      nameRules: [ v => !!v || "Group name is required" ],
      numRules: [
          v => !!v || "Group count is required",
      ],
      editGroup: Object.assign({}, defaultEditGroupForm),
      defaultEditGroupForm,

      directions
    }
  },

  created() {
      setInterval(() => { this.queue = this.updateList(); }, 1000);
  },

  computed: {
    phoneRules() {
      if (this.group.notifyByText === false) return [true];
      return [ v => phoneRegex.test(v) || "Error: Must be valid US phone number" ];
    },
    headers() {
        return [
            { text: 'Group Number' , value: 'number', width: '1px'},
            { text: 'Group Name', value: 'name' },
            { text: 'Group Size', value: 'size' },
            { text: 'Phone', value: 'phone' },
            { text: 'Send Text', value: 'notifyByText', width: '1px'},
            { text: 'Actions', value: 'actions', width: '104px', align: 'center' },
            { text: 'Move', value: 'move', width: '104px', align: 'center'}
        ]
    }
  },

  methods: {
    clear() {
        this.$refs.form.reset();
        this.group.phone = "+1";
        this.group.notifyByText = false;
    },
    addGroup() {
      let group = Object.assign({}, this.group)
      if (phoneRegex.test(group.phone) && ! group.phone.startsWith("+1")) {
        group.phone = "+1" + group.phone;
      }
      if (! group.notifyByText && ! phoneRegex.test(group.phone)) {
        group.phone = null
      }
      this.$store.commit('enqueue', group);
      this.clear();
    },
    sendGroup() {
      this.$store.commit('dequeue');
    },
    showResetQueue() {
      this.resetDialog = true;
    },
    hideResetQueue() {
      this.resetDialog = false;
    },
    resetQueue() {
      this.$store.commit('reset');
      this.resetDialog = false;
    },
    showEditItem(group) {
      Object.assign(this.editGroup, group);
      this.editDialog = true;
    },
    hideEditItem() {
      this.editGroup = Object.assign({}, this.defaultEditGroupForm);
      this.editDialog = false;
    },
    saveEdit() {
        this.$store.commit('edit', this.editGroup);
        this.hideEditItem();
    },
    showCancelDialog(group) {
      this.cancelGroupDialog.group = group;
      this.cancelGroupDialog.active = true;
    },
    cancel(group) {
        this.$store.commit('cancel', {
            groupNumber: group.number,
            noShow: false
        });
        this.cancelGroupDialog.active = false;
    },
    move(group, direction) {
      this.$store.commit('move', {
        groupNumber: group.number,
        direction
      })
    },
    updateList() {
        if(localStorage.getItem('vuex')) {
            // Replace the state object with the stored item
            Object.assign(this.$store.state, JSON.parse(localStorage.getItem('vuex')))
        }
        return this.$store.state.queue;
    },
    testText() {
      this.$store.commit('send');
    },
    downloadHistory() {
      const history = this.$store.getters.queueHisory;
      const downloadedFile = new Blob([JSON.stringify(history)], {
        type: 'application/json'
      });
      saveAs(downloadedFile, "HauntedHouseHistory.json");
    }
  }
}

</script>


<style scoped>

.container {
  max-width: 1024px;
}

</style>