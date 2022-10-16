import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import axios from "../main.js";

import {directions} from "@/enums";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        queue: [], // list of Group objects
        full_queue: [], // list of Group Objects, includes groups that already went
        nextRegistrationNumber: 1,
    },

    getters: {
        nextGroup(state) {
            return state.queue[0];
        }
    },

    mutations: {
        // Payload should be of type Group
        enqueue(state, payload) {
            let group = payload
            group.number = state.nextRegistrationNumber;
            group.registrationTime = Date.now()

            state.queue.push(group);
            state.full_queue.push(group);
            state.nextRegistrationNumber++;

            if (group.notifyByText) {
                axios.post("/send/", {
                    to: group.phone,
                    body: `You are in line for Foundation's open house!` +
                          `\nGroup name: ${group.name}` +
                          `\nGroup number: ${group.number}`
                });
            }

            if (state.queue.length === 2) {
                let nextGroup = state.queue[1]
                if (nextGroup.notifyByText) {
                    axios.post("/send/", {
                        to: state.queue[1].phone,
                        body: `You are next in line for Foundation's open house! ` +
                              `Please make your way to the Sammy lobby if you're not there already!` +
                              `\n${nextGroup.name}` +
                              `\nGroup number: ${nextGroup.number}`
                    });
                }
            }
        },

        dequeue(state) {
            if (state.queue.length > 0) {
                state.queue[0].entryTime = Date.now();
                state.queue.shift();
            }
            if (state.queue.length > 1) {
                let nextGroup = state.queue[1]
                if (nextGroup.notifyByText) {
                    // TODO: refactor into function. Same data as above
                    axios.post("/send/", {
                        to: nextGroup.phone,
                        body: `You are next in line for Foundation's open house! ` +
                              `Please make your way to the Sammy lobby if you're not there already!` +
                              `\n${nextGroup.name}` +
                              `\nGroup number: ${nextGroup.number}`
                    });
                }
            }
        },

        // payload should only have properties belonging to group,
        // but it does not need to be a complete group object
        edit(state, payload) {
            const idx = state.queue.findIndex(group => group.number === payload.number)
            if (idx < 0) throw new Error("Group not found in queue");
            Object.assign(state.queue[idx], payload)
        },

        /*
        payload format: {
            groupNumber: number,
            noShow: boolean
        }
        */
        cancel(state, payload) {
            let idx = state.queue.findIndex(group => group.number === payload.groupNumber);
            if (idx < 0) throw new Error("Group number found in queue");
            let group = state.queue[idx]
            group.cancelled = true;
            if (! payload.noShow) {
                group.cancellationTime = Date.now();
            }
            state.queue.splice(idx, 1);
        },

        /*
        payload format: {
            groupNumber: number,
            direction: direction
        }
         */
        move(state, payload) {
            let idx = state.queue.findIndex(group => group.number === payload.groupNumber);
            if (idx < 0) throw new Error("Group number found in queue");
            if (idx === 0 && payload.direction === directions.UP) return;
            if (idx === state.queue.length && payload.direction === directions.DOWN) return;

            const neighborIdx = idx + payload.direction;
            // Swap the two elements in the queue
            [state.queue[idx], state.queue[neighborIdx]] = [state.queue[neighborIdx], state.queue[idx]]
        },

        reset(state) {
            state.queue = [];
            state.full_queue = [];
            state.nextRegistrationNumber = 1;
        },

        send() {
            axios.post("/send/", {
                to: '+13143499090',
                body: 'Testing 123'
            })
            .then(result => {
                console.log(result);
            });
        }
    }
})