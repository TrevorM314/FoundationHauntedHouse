import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import axios from "../main.js";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        queue: [],
        full_queue: [],
        curr_group_number: 1,
        num_removed: 0
    },
    getters: {
        nextGroup(state) {
            return state.queue[0];
        }
    },
    mutations: {
        enqueue(state, payload) {
            state.queue.push(payload);
            state.full_queue.push(payload);
            state.curr_group_number++;
            if (payload.group_text) {
                axios.post("/send/", {
                    to: payload.group_phone,
                    body: `You are in line for Foundation's open house!\nGroup name: ${payload.group_name}\nGroup number: ${payload.group_number}`
                });
            }
            if (state.queue.length === 2) {
                if (state.queue[1].group_text) {
                    axios.post("/send/", {
                        to: state.queue[1].group_phone,
                        body: `You are next in line for Foundation's open house! Please make your way to the Sammy lobby if you're not there already!\n${payload.group_name}\nGroup number: ${payload.group_number}`
                    });
                }
            }
        },
        dequeue(state) {
            if (state.queue.length > 0) {
                state.queue.shift();
                state.num_removed++;
            }
            if (state.queue.length > 1) {
                if (state.queue[1].group_text) {
                    axios.post("/send/", {
                        to: state.queue[1].group_phone,
                        body: `You are next in line for Foundation's open house! Please make your way to the Sammy lobby if you're not there already!\nGroup Name: ${state.queue[1].group_name}\nGroup Number: ${state.queue[1].group_number}`
                    });
                }
            }
        },
        edit(state, payload) {
            const idx = payload.group_number - 1 - state.num_removed;
            state.queue[idx] = payload;
        },
        reset(state) {
            state.queue = [];
            state.full_queue = [];
            state.curr_group_number = 1;
            state.num_removed = 0;
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