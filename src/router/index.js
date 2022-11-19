import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login_User.vue";
import Subject from "../views/View_Subject.vue";
import Score from "../views/View_Score.vue";
import Class from "../views/View_Class.vue";
import CreateAccount from "../views/Create_Account.vue";
import AddSubject from "../views/Add_Subject.vue";
import AddSchool from "../views/Add_School.vue";
import AddClass from "../views/Add_Class.vue";
import ImportStudent from "../views/Add_StudentList.vue";
import ForgotPassword from "../views/Forgot_Password.vue";
import ResetPassword from "../views/Reset_Password.vue";
import GoToVerify from "../views/Resend_VerifyEmail.vue";
import Verify from "../views/VerifyEmail.vue";
import StudentList from "../views/View_StudentList.vue";
import StudentGroup from "../views/View_StudentList_Group.vue"
import Manual from "../views/View_Manual.vue"

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      const login = localStorage.getItem("token");
      const school = localStorage.getItem("school");
      if (login || school === undefined) {
        next("/helioscore");
      }
      if (school) {
        next("/helioscore/school");
      } else {
        next();
      }
    },
  },
  {
    path: "/helioscore",
    name: "subject",
    component: Subject,
    beforeEnter: (to, from, next) => {
      const login = localStorage.getItem("token");
      const school = localStorage.getItem("school");
      if (school) {
        next("/helioscore/school");
      } else if (!login) {
        next("/");
      } else {
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
      const school = localStorage.getItem("school");
      if (!login || school) {
        next("/");
      } else {
        next();
      }
    },
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
      const school = localStorage.getItem("school");
      if (school) {
        next();
      } else {
        next(`${from.path}`);
      }
    },
  },
  {
    path: "/helioscore/:subjectName",
    name: "class",
    component: Class,
    props: true,
    beforeEnter: (to, from, next) => {
      const login = localStorage.getItem("token");
      if (!login) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/helioscore/:subjectName/:grade",
    name: "score",
    component: Score,
    props: true,
    beforeEnter: (to, from, next) => {
      const login = localStorage.getItem("token");
      if (!login) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/helioscore/signup",
    name: "signUp",
    component: CreateAccount,
    props: true,
  },
  {
    path: "/helioscore/studentlist",
    name: "student list",
    component: StudentList,
    props: true,
  },
  {
    path: "/helioscore/studentgroup/:group",
    name: "studentGroup",
    component: StudentGroup,
    props: true,
  },
  {
    path: "/helioscore/importstudentlist",
    name: "newstudentlist",
    component: ImportStudent,
    // props: true,
  },
  {
    path: "/helioscore/forgotpassword",
    component: ForgotPassword,
    name: "forgotPassword",
  },
  {
    path: "/helioscore/resetPassword",
    name: "reset",
    component: ResetPassword,
  },
  {
    path: "/helioscore/resendemail",
    name: "gotoVerify",
    component: GoToVerify,
  },
  {
    path: "/helioscore/verifyEmail",
    name: "verify success",
    component: Verify,
  },
  {
    path: "/helioscore/manual",
    name: "manual",
    component: Manual
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
