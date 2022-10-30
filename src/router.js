import Vue from "vue";
import Router from "vue-router";

import Registration from "./pages/registration"
import Waitlist from "./pages/waitlist"

Vue.use(Router);

export default new Router ({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "none",
    routes: [
        {name: "registration", path: "/registration", component: Registration },
        {name: "waitlist", path: "/waitlist", component: Waitlist },
    ]
})