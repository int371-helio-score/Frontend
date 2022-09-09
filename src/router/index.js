import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login_Teacher.vue";
import Subject from "../views/T_Subject.vue";
// import Upload from "../components/T_Upload.vue";
import Score from "../views/T_Score.vue";
import Class from "../views/T_Class.vue";
// import Announce from "../components/T_Announce.vue";
import CreateAccount from "../views/CreateAccount.vue"

const routes = [{
        path: "/",
        name: "login",
        component: Login,
        beforeEnter: (to, from, next) => {
            const login = localStorage.getItem("token");
            if (login) {
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
        name: "score",
        component: Score,
        props: true,
    },
    {
        path: "/helioscore/signup",
        name: "signUp",
        component: CreateAccount,
        props: true,
    },
    // {
    //     path: "/helioscore/:subjectName/:grade/upload",
    //     name: "Upload",
    //     component: Upload,
    //     props: true,
    // },
    // {
    //     path: "/helioscore/:subjectName/:grade/announce",
    //     name: "announce",
    //     component: Announce,
    //     props: true,
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;