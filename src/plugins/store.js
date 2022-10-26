import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import {directions} from "@/enums";
import { sendText } from "@/smsUtil";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        queue: [], // list of Group objects
        queueHistory: [], // list of Group Objects, includes groups that already went
        nextRegistrationNumber: 1,
    },

    getters: {
        nextGroup(state) {
            return state.queue[0];
        },

        queueHisory(state) {
            return state.queueHistory;
        },

        avgTimeBetweenGroups(state) {
            let entryTimes = state.queueHistory.map(group => group.entryTime);
            entryTimes = entryTimes.filter(time => time !== undefined).sort();
            if (entryTimes.length < 2) return 0;
            let cumulativeWait = 0;
            for (let i=1; i < entryTimes.length; i++) {
                cumulativeWait += entryTimes[i] - entryTimes[i-1];
            }
            return cumulativeWait / (entryTimes.length - 1);
        }
    },

    mutations: {
        // Payload should be of type Group
        async enqueue(state, payload) {
            let group = payload
            group.number = state.nextRegistrationNumber;
            group.registrationTime = Date.now()

            state.queue.push(group);
            state.queueHistory.push(group);
            state.nextRegistrationNumber++;

            if (group.notifyByText) {
                await sendText(
                    group.phone,
                    `You are in line for Foundation's open house!` +
                    `\nGroup name: ${group.name}` +
                    `\nGroup number: ${group.number}`
                )
            }

            if (state.queue.length === 2) {
                let nextGroup = state.queue[1]
                if (nextGroup.notifyByText) {
                    await sendText(
                        state.queue[1].phone,
                        `You are next in line for Foundation's open house! ` +
                        `Please make your way to the Sammy lobby if you're not there already!` +
                        `\n${nextGroup.name}` +
                        `\nGroup number: ${nextGroup.number}`
                    );
                }
            }
        },

        async dequeue(state) {
            if (state.queue.length > 0) {
                let group = Object.assign({entryTime: Date.now()}, state.queue[0]);
                const idx = state.queueHistory.findIndex(g => g.number === group.number);
                state.queueHistory[idx] = group;
                state.queue.shift();
            }
            if (state.queue.length > 1) {
                let nextGroup = state.queue[1]
                if (nextGroup.notifyByText) {
                    await sendText(
                        nextGroup.phone,
                        `You are next in line for Foundation's open house! ` +
                        `Please make your way to the Sammy lobby if you're not there already!` +
                        `\n${nextGroup.name}` +
                        `\nGroup number: ${nextGroup.number}`
                    );
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

            // update the queue history
            idx = state.queueHistory.findIndex(g => g.number === group.number);
            state.queueHistory[idx] = group;
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
            state.queueHistory = [];
            state.nextRegistrationNumber = 1;
        }
    }
})