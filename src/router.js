import Vue from "vue";
import Router from "vue-router";

import Edit from "./pages/edit"
import View from "./pages/view"

Vue.use(Router);

export default new Router ({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "none",
    routes: [
        {name: "edit", path: "/edit", component: Edit },
        {name: "view", path: "/view", component: View },
    ]
})