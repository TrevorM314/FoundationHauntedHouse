import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        queue: [],
    },
    mutations: {
        enqueue(state, payload) {
            state.queue = [payload.name];
        },
    }
})