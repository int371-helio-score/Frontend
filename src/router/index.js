import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login_Teacher.vue";
import Subject from "../views/T_Subject.vue";
import Upload from "../views/T_Upload.vue";
import Score from "../views/T_Score.vue";
import Class from "../views/T_Class.vue";
import Announce from "../views/T_Announce.vue";

const routes = [{
        path: "/",
        name: "login",
        component: Login,
        beforeEnter: (to, from, next) => {
            const role = localStorage.getItem("role");
            const login = localStorage.getItem("token");
            if (login && role === "Teacher") {
                next("/helioscore");
            } else {
                next();
            }
        },
    },
    {
        path: "/helioscore",
        name: "subject",
        component: Subject,
    },
    {
        path: "/helioscore/:subjectName",
        name: "class",
        component: Class,
        props: true,
    },
    {
        path: "/helioscore/:subjectName/:grade",
        name: "Score",
        component: Score,
        props: true,
    },
    {
        path: "/helioscore/:subjectName/:grade/upload",
        name: "Upload",
        component: Upload,
        props: true,
    },
    {
        path: "/helioscore/:subjectName/:grade/announce",
        name: "announce",
        component: Announce,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;