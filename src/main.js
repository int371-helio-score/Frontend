import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import NavTeacher from "@/components/Nav_Teacher.vue";
import SidebarTeacher from "@/components/SidebarTeacher.vue"
import UploadFile from "@/components/T_Upload.vue";
import Announce from "@/components/T_Announce.vue";

// import gAuthPlugin from 'vue3-google-oauth2';
import vue3GoogleLogin from 'vue3-google-login'

const gauthOption = {
  clientId: "217234620645-cporrkom4579lu5sdprtth63ph3g21l8.apps.googleusercontent.com",
  scope: "email",
  prompt: "consent",
  fetch_basic_profile: false,
};
const app = createApp(App).use(router);

// app.use(gAuthPlugin, gauthOption)
app.use(vue3GoogleLogin, {
  clientId: gauthOption.clientId
})
app.component("navTeacher", NavTeacher);
app.component("uploadFile", UploadFile);
app.component("announceScore", Announce);
app.component("sidebarTeacher", SidebarTeacher);
// app.component("modal", {
//   template: "#modal-template",
// });
app.mount("#app");
