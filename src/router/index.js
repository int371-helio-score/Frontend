import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login_Teacher.vue";
import Subject from "../views/T_Subject.vue";
import Score from "../views/T_Score.vue";
import Class from "../views/T_Class.vue";
import CreateAccount from "../views/CreateAccount.vue"
import AddSubject from "../views/Add_Subject.vue"
import AddSchool from "../views/Add_School.vue"
import AddClass from "../views/Add_Class.vue"

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
        beforeEnter: (to, from, next) => {
            const login = localStorage.getItem("token");
            const school = localStorage.getItem("school")
            if (login || school === undefined) {
                next("/helioscore");
            }
            if (school) {
                next('/helioscore/school')
            }
            else {
                next();
            }
        },
    },
    {
        path: "/helioscore/newsubject",
        name: "addsubject",
        component: AddSubject,
        beforeEnter: (to, from, next) => {
            const login = localStorage.getItem("token");
            const school = localStorage.getItem("school")
            if (!login || school) {
                next('/')
            } else {
                next()
            }
        }
    },
    {
        path: "/helioscore/newclassroom",
        name: "addclass",
        component: AddClass,
        props: true,
    },
    {
        path: "/helioscore/school",
        name: "addschool",
        component: AddSchool,
        beforeEnter: (to, from, next) => {
            const school = localStorage.getItem("school")
            if (school) {
                next()
            } else {
                next(`${from.path}`)
            }
        }
    },
    {
        path: "/helioscore",
        name: "subject",
        component: Subject,
        beforeEnter: (to, from, next) => {
            const login = localStorage.getItem("token");
            const school = localStorage.getItem("school")
            if (school) {
                next('/helioscore/school')
            } else if (!login) {
                next('/')
            }
            else {
                next()
            }
        }
    },
    {
        path: "/helioscore/:subjectName",
        name: "class",
        component: Class,
        props: true,
        beforeEnter: (to, from, next) => {
            const login = localStorage.getItem("token");
            if (!login) {
                next('/')
            } else {
                next()
            }
        }

    },
    {
        path: "/helioscore/:subjectName/:grade",
        name: "score",
        component: Score,
        props: true,
        beforeEnter: (to, from, next) => {
            const login = localStorage.getItem("token");
            if (!login) {
                next('/')
            } else {
                next()
            }
        }
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