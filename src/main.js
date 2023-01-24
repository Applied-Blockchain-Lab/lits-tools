import { createApp } from "vue";
import { createPinia } from "pinia";
import vSelect from "vue-select";

import App from "./App.vue";
import router from "./router";
// import directives from "./plugins/directives";

import "./assets/main.css";
import Paginate from "vuejs-paginate-next";

const app = createApp(App);

app.component("v-select", vSelect);
app.use(Paginate);

app.use(createPinia());
app.use(router);
// app.use(directives);

app.mount("#app");
