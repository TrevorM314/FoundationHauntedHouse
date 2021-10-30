import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        queue: [],
        curr_group_number: Number(1),
    },
    mutations: {
        enqueue(state, payload) {
            state.queue.push(payload);
            // TODO - send text here?
        },
        dequeue(state) {
            if (state.queue.length > 0) {
                state.queue.shift()
            }
        }
    }
})