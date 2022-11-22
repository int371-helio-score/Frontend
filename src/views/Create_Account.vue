<template>
  <div class="background sm:bg-light bg-white">
    <div class="md:grid md:grid-cols-2 h-full">
      <div>
        <img
          src="http://localhost:3000/api/public/images/LoginHelio.png"
          class="justify-center place-content-center h-screen md:block hidden"
        />
      </div>

      <div class="box bg-white">
        <div
          class="sm:pt-14 text-xl font-bold text-primary justify-center flex"
        >
          <p>สร้างบัญชี</p>
        </div>

        <div class="md:mx-10 lg:mx-18 sm:mx-10 mx-14">
          <div class="flex justify-center mt-10">
            <span class="material-symbols-outlined self-center"> school </span>
            <v-select
              class="select w-full placeholder-opacity-60 placeholder-gray-400"
              placeholder="กรุณาเลือกโรงเรียน"
              label="schoolName"
              v-model="test"
              :filterable="false"
              :options="paginated"
              :reduce="(school) => school.schoolId"
              @open="onOpen"
              @close="onClose"
              @search="(query) => (school = query)"
            >
              <template #list-footer>
                <li v-show="hasNextPage" ref="load" class="loader">
                  Loading more options...
                </li>
              </template>
            </v-select>
          </div>
          <sup v-show="inputSchool" class="text-red-500 flex mt-4">
            กรุณาเลือกโรงเรียน
          </sup>

          <div class="">
            <div class="flex justify-center mt-10">
              <span class="material-symbols-outlined"> account_circle </span>
              <input
                v-model="firstname"
                type="text"
                placeholder="ชื่อ"
                class="border-b border-gray50 w-full"
                maxlength="30"
              />
            </div>
            <sup v-show="inputFirstname" class="text-red-500 flex mt-4">
              กรุณากรอกชื่อจริง
            </sup>

            <div class="flex justify-center mt-10">
              <span class="material-symbols-outlined"> account_circle </span>
              <input
                v-model="lastname"
                type="text"
                placeholder="นามสกุล"
                class="border-b border-gray50 w-full"
                maxlength="30"
              />
            </div>
            <sup v-show="inputLastname" class="text-red-500 flex mt-4">
              กรุณากรอกนามสกุล
            </sup>

            <div class="flex justify-center mt-10">
              <span class="material-symbols-outlined"> alternate_email </span>
              <input
                v-model="email"
                type="text"
                placeholder="อีเมล"
                class="border-b border-gray50 w-full"
                maxlength="50"
              />
            </div>
            <sup v-show="inputEmail" class="text-red-500 flex mt-4">
              กรุณากรอกอีเมล
            </sup>

            <div class="flex justify-center mt-10">
              <span class="material-symbols-outlined"> lock </span>
              <input
                v-model="password"
                @input="passwordCheck"
                type="password"
                placeholder="รหัสผ่าน"
                class="border-b border-gray50 w-full"
                maxlength="20"
                minlength="8"
              />
            </div>
            <div></div>
            <sup v-show="inputPassword" class="text-red-500 flex mt-4">
              กรุณากรอกรหัสผ่าน
            </sup>

            <div class="flex justify-start lg:pl-5 md:pl-4 sm:pl-4 mt-1 pl-7">
              <div>
                <p
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': password.length > 7 }"
                >
                  <i
                    class="frmIcon fas"
                    :class="password.length > 7 ? 'fa-check' : 'fa-times'"
                  ></i>
                  ความยาว 8 ตัวอักษรขึ้นไป
                </p>

                <p
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': inputUpperCase }"
                >
                  <i
                    class="frmIcon fas"
                    :class="inputUpperCase ? 'fa-check' : 'fa-times'"
                  ></i>
                  อักษร A-Z
                </p>
                <p
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': inputLowerCase }"
                >
                  <i
                    class="frmIcon fas"
                    :class="inputLowerCase ? 'fa-check' : 'fa-times'"
                  ></i>
                  อักษร a-z
                </p>
                <p
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': inputNum }"
                >
                  <i
                    class="frmIcon fas"
                    :class="inputNum ? 'fa-check' : 'fa-times'"
                  ></i>
                  ตัวเลข 0-9
                </p>
                <p
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': inputSpecail }"
                >
                  <i
                    class="frmIcon fas"
                    :class="inputSpecail ? 'fa-check' : 'fa-times'"
                  ></i>
                  อักษรพิเศษ ! @ # % ^ & * ) ( + = . _ -
                </p>
              </div>
            </div>

            <div class="flex justify-center mt-5">
              <span class="material-symbols-outlined"> lock </span>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="ยืนยันรหัสผ่าน"
                class="border-b border-gray50 w-full"
                maxlength="20"
                minlength="8"
              />
            </div>
            <sup v-show="inputConfirmPassword" class="text-red-500 flex mt-4">
              กรุณายืนยันรหัสผ่าน
            </sup>

            <button class="button" @click="toggleShow">
              <span class="icon is-small is-right">
                <!-- <i
                  class="fas"
                  :class="{
                    'fa-eye-slash': showPassword,
                    'fa-eye': !showPassword,
                  }"
                ></i> -->
              </span>
            </button>
          </div>

          <div class="flex justify-center mt-2" @click="createAccount()">
            <button class="bg-primary rounded justify-center flex w-full py-1">
              <p class="text-white md:text-sm lg:text-base">สร้างบัญชี</p>
            </button>
          </div>

          <div class="flex justify-center mt-10 text-sm">
            <p class="inline-block text-gray100">หากคุณมีบัญชีแล้ว</p>
            <p class="inline-block text-primary underline">
              <a href="/"> เข้าสู่ระบบ</a>
            </p>
            <p class="inline-block text-gray100">ที่นี่</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "helio",
      urlSchool: "helio/school",
      inputFirstname: false,
      inputLastname: false,
      inputEmail: false,
      inputPassword: false,
      inputConfirmPassword: false,
      inputSchool: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      school: "",
      schools: [],
      modal: false,
      limit: 5,
      observer: null,
      test: "",
      inputNum: false,
      inputLowerCase: false,
      inputUpperCase: false,
      inputSpecail: false,
      nextForm: false,
    };
  },

  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },

  methods: {
    passwordCheck: function () {
      this.inputNum = /\d/.test(this.password);
      this.inputLowerCase = /[a-z]/.test(this.password);
      this.inputUpperCase = /[A-Z]/.test(this.password);
      this.inputSpecail = /[!@#%^&*)(+=._-]/.test(this.password);
    },

    async getSchool() {
      axios
        .get(this.urlSchool, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.schools = response.data.data.results;
        });
    },

    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },

    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    async createAccount() {
      this.inputFirstname = this.firstname === "" ? true : false;
      this.inputLastname = this.lastname === "" ? true : false;
      this.inputEmail = this.email === "" ? true : false;
      this.inputPassword = this.password === "" ? true : false;
      this.inputConfirmPassword = this.confirmPassword === "" ? true : false;
      this.inputSchool = this.test === "" ? true : false;
      if (
        this.password != "" &&
        this.confirmPassword != "" &&
        this.password != this.confirmPassword
      ) {
        return alert("รหัสผ่านไม่ตรงกัน");
      } else if (
        this.inputFirstname ||
        this.inputLastname ||
        this.inputEmail ||
        this.inputPassword ||
        this.inputConfirmPassword ||
        this.inputSchool
      ) {
        return;
      }
      this.addAccount();
    },

    async addAccount() {
      const formData = new FormData();
      let data = {
        firstName: this.firstname,
        lastName: this.lastname,
        email: this.email,
        password: this.password,
        schoolId: this.test,
      };

      const json = JSON.stringify(data);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("data", blob);
      axios
        .post(`${this.url}/account/register`, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
            this.test = "";
            this.$router.push("/helioscore/resendemail") &&
              alert("สร้างบัญชีสำเร็จ กรุณายืนยันบัญชีของคุณ");
          }
        })
        .catch((err) => {
          if (err.response.data.message == "password too weak") {
            alert("รหัสผ่านของคุณง่ายเกินไป");
          }
          // alert(err.response.data.message);
        });
    },
  },

  async created() {
    await this.getSchool();
  },

  computed: {
    filtered() {
      return this.schools.filter((results) => {
        return results.schoolName
          .toLocaleLowerCase()
          .includes(this.school.toLocaleLowerCase());
      });
    },
    paginated() {
      return this.filtered.slice(0, this.limit);
    },
    hasNextPage() {
      return this.paginated.length < this.filtered.length;
    },
  },
};
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
::placeholder {
  color: #c4c4c4;
}
.background {
  @apply sm:pt-10 sm:pb-10 pb-8 md:pt-0 h-full;
}
img {
  @apply h-auto
  xl:px-20 xl:py-20 
  lg:px-20 lg:py-36
  md:px-12 md:py-28;
}
.box {
  @apply h-auto pb-2 rounded-lg pt-8
  xl:mr-80 xl:my-20
  lg:my-20 lg:mr-28
  md:my-16 md:mr-20 md:mx-0 md:rounded-xl
  sm:justify-center sm:mx-40;
}
span {
  color: #b3dbfb;
  @apply mr-1 xl:text-base
  md:text-sm
  sm:text-sm;
}
input {
  @apply px-2 text-sm md:text-base;
}
.google {
  @apply xl:w-20 xl:h-20;
}
.loader {
  text-align: center;
  color: #bbbbbb;
}
.inputDetail {
  @apply px-2 py-1 mb-4 w-full sm:w-32 md:w-40 lg:w-56 lg:text-base;
}
sup {
  @apply justify-end;
}
.container {
  width: 400px;
  margin: 50px auto;
  background: white;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif, sans-serif;
  border-radius: 3px;
}
h1 {
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
}
.frmField {
  background-color: white;
  color: #495057;
  line-height: 1.25;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  border: 0;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  width: 90%;
}
.frmLabel {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
.frmValidation {
  font-size: 0.7rem;
  line-height: 1rem;
  @apply text-gray100;
}
.frmValidation--passed {
  color: #0fa140;
}
.howToBuild {
  text-align: center;
  color: purple;
}
.howToBuild a {
  color: grey;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
