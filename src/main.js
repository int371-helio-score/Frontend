import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import 'vue-select/dist/vue-select.css';
import 'vue3-easy-data-table/dist/style.css';
import NavTeacher from "@/components/Navigation_bar.vue";
import SidebarTeacher from "@/components/SidebarTeacher.vue";
import vue3GoogleLogin from 'vue3-google-login'
import vSelect from 'vue-select';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import EditImage from "@/components/Edit_Image.vue";
import EditScore from "@/components/Edit_Score.vue";
import axios from "axios";

axios.defaults.baseURL = 'https://test-helioscore.sytes.net/backend/api/';

const gauthOption = {
  clientId: "217234620645-cporrkom4579lu5sdprtth63ph3g21l8.apps.googleusercontent.com",
  scope: "email",
  prompt: "consent",
  fetch_basic_profile: false,
};
const app = createApp(App).use(router);

app.use(vue3GoogleLogin, {
  clientId: gauthOption.clientId
})
app.component("navTeacher", NavTeacher);
app.component("sidebarTeacher", SidebarTeacher);
app.component('v-select', vSelect);
app.component('EasyDataTable', Vue3EasyDataTable);
app.component("editImage", EditImage);
app.component("editScore", EditScore);
app.mount("#app");
