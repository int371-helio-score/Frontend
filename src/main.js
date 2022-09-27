import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import 'vue-select/dist/vue-select.css';
import 'vue3-easy-data-table/dist/style.css';
import NavTeacher from "@/components/Nav_Teacher.vue";
import SidebarTeacher from "@/components/SidebarTeacher.vue";
import UploadFile from "@/components/T_Upload.vue";
import Announce from "@/components/T_Announce.vue";
import vue3GoogleLogin from 'vue3-google-login'
import vSelect from 'vue-select';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UploadStudent from "@/components/UploadStd.vue"
import SelectSchool from "@/components/SelectSchool.vue"
import axios from "axios";

axios.defaults.baseURL = 'http://20.82.6.4/backend/api/';

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
app.component("uploadFile", UploadFile);
app.component("announceScore", Announce);
app.component("sidebarTeacher", SidebarTeacher);
app.component('v-select', vSelect);
app.component('EasyDataTable', Vue3EasyDataTable);
app.component("uploadStd", UploadStudent);
app.component("selectSchool", SelectSchool);
app.mount("#app");
