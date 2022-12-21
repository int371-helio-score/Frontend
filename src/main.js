import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import 'vue-select/dist/vue-select.css';
import 'vue3-easy-data-table/dist/style.css';
import vSelect from 'vue-select';
import axios from "axios";
import NavTeacher from "@/components/Navigation_bar.vue";
import SidebarTeacher from "@/components/SidebarTeacher.vue";
import vue3GoogleLogin from 'vue3-google-login'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import EditImage from "@/components/Edit_Image.vue";
import EditScore from "@/components/Edit_Score.vue";
import EditSubject from "@/components/Edit_Subject.vue"
import EditClass from "@/components/Edit_Class.vue"
import LoadingScreen from "@/components/LoadingScreen.vue"

axios.defaults.baseURL = 'http://localhost:3000/api/';

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
app.component("editSubject", EditSubject);
app.component("editClass", EditClass);
app.component("loadingScreen", LoadingScreen);
app.mount("#app");