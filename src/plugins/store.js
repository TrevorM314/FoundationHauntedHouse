import Vue from "vue";
import Vuex from "vuex";
import createMutationsSharer from "vuex-shared-mutations";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        queue: [],
        id: 0
    },
    mutations: {
        enqueue(state, payload) {
            let group = {
                name: payload.name,
                id: state.id
            }
            state.queue.unshift(group);
            state.id++;
        },
        deque(state) {
            state.queue.shift()
        }
    },
    plugins: [createMutationsSharer({
        predicate: ["mutation1", "mutation2"]
    })]
})