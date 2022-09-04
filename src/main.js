import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import NavTeacher from "@/components/Nav_Teacher.vue";
import SidebarTeacher from "@/components/SidebarTeacher.vue"
import UploadFile from "@/components/T_Upload.vue";
import Announce from "@/components/T_Announce.vue";
import GAuth from "vue-google-oauth2";

const gauthOption = {
  clientId:
    "217234620645-1nusiiiprhj1sqsjkobbif1as92vshrq.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "consent",
  fetch_basic_profile: true,
};
const app = createApp(App).use(router, GAuth, gauthOption);
app.component("navTeacher", NavTeacher);
app.component("uploadFile", UploadFile);
app.component("announceScore", Announce);
app.component("sidebarTeacher", SidebarTeacher);
// app.component("modal", {
//   template: "#modal-template",
// });
app.mount("#app");
