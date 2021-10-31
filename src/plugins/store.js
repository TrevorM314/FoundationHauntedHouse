import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        queue: [],
        full_queue: [],
        curr_group_number: 1,
        num_removed: 0
    },
    mutations: {
        enqueue(state, payload) {
            state.queue.push(payload);
            state.full_queue.push(payload);
            // TODO - send text here?
        },
        dequeue(state) {
            if (state.queue.length > 0) {
                state.queue.shift();
                state.num_removed++;
                // TODO - send text here?
            }
        },
        edit(state, payload) {
            const idx = payload.group_number - 1 - state.num_removed;
            state.queue[idx] = payload;
        },
        reset(state) {
            state.queue = [];
            state.curr_group_number = 1;
            state.num_removed = 0;
        }
    }
})