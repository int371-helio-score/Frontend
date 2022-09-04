<template>
  <div class="background sm:bg-light bg-white">
    <div class="md:grid md:grid-cols-2 h-screen">
      <div>
        <img
          src="http://localhost:3000/public/images/LoginHelio.png"
          class="justify-center place-content-center h-screen md:block hidden"
        />
      </div>

      <div class="box bg-white">
        <div class="pt-20 text-xl font-bold text-primary justify-center flex">
          <h1>สร้างบัญชี</h1>
        </div>

        <div class="flex justify-center">
          <!-- <input type="text" class="bg-gray-50 px-4 py-2" autocomplete="off" v-model="school" @input="filterSchools" @focus="modal = true"/>
          <div v-if="filteredSchools && modal">
            <ul>
              <li v-for="filteredSchool in filteredSchools" :key="filteredSchool" class="py-2 border-b cursor-pointer" @click="setSchool(filteredSchool)"> {{ filteredSchool }}</li>
            </ul>
          </div> -->
          <ejs-autocomplete></ejs-autocomplete>
        </div>

        <div class="pt-2">
          <div class="flex justify-center mt-20">
            <span class="material-symbols-outlined"> account_circle </span>
            <input
              v-model="firstname"
              type="text"
              placeholder="ชื่อ"
              class="border-b border-gray50"
            />
          </div>
          <div class="flex justify-center mt-10">
            <span class="material-symbols-outlined"> account_circle </span>
            <input
              v-model="lastname"
              type="text"
              placeholder="นามสกุล"
              class="border-b border-gray50"
            />
          </div>
          <div class="flex justify-center mt-10">
            <span class="material-symbols-outlined"> alternate_email </span>
            <input
              v-model="email"
              type="text"
              placeholder="อีเมล"
              class="border-b border-gray50"
            />
          </div>
          <div class="flex justify-center mt-10">
            <span class="material-symbols-outlined"> lock </span>
            <input
              v-model="password"
              type="password"
              placeholder="รหัสผ่าน"
              class="border-b border-gray50"
            />
          </div>
          <div class="flex justify-center mt-10">
            <span class="material-symbols-outlined"> lock </span>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              class="border-b border-gray50"
            />
          </div>
          

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

        <div class="flex justify-center mt-10" @click="createAccount">
          <button class="bg-primary rounded-md w-40 justify-center flex">
            <p class="text-white">สร้างบัญชี</p>
          </button>
        </div>

        <div class="flex justify-center mt-10">
          <p class="inline-block text-gray100">หากคุณมีบัญชีแล้ว</p>
          <p class="inline-block text-primary underline">
            <a href="/"> เข้าสู่ระบบ</a>
          </p>
          <p class="inline-block text-gray100">ที่นี่</p>
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
      url: "http://localhost:3000//api/helio/account/register",
      urlSchool: "http://localhost:3000//api/helio/account/register",
      inputFirstname: false,
      inputLastname: false,
      inputEmail: false,
      inputPassword: false,
      inputConfirmPassword: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      school: "",
      schools: ['เตรียมอุดมศึกษา', 'เทพศิรินทร์', 'หอวัง'],
      filteredSchools: [],
      modal: false,

    };
  },

  mounted(){
    // this.filteredSchools();
  },

  methods: {
    // async getSchool() {
    //   axios
    //     .get(this.urlSchool, {
    //       headers: {
    //         Authorization: localStorage.getItem("token"),
    //       },
    //     })
    //     .then((response) => {
    //       this.school = response.data.data.results;
    //       return response.data.data.results;
    //     });
    // },

    filterSchools(){
      if(this.school.length == 0){
        this.fileredSchools = this.schools;
      }
      this.filterSchools = this.schools.filter(school => {
        return school.toLowerCase().startsWith(this.school.toLowerCase());
      })
    },

    setSchool(school){
      this.school = school;
      this.modal = false;
    },

    async createAccount() {
      this.inputFirstname = this.firstname === "" ? true : false;
      this.inputLastname = this.lastName === "" ? true : false;
      this.inputEmail = this.email === "" ? true : false;
      this.inputPassword = this.password === "" ? true : false;
      this.inputConfirm = this.password !== this.confirmPassword ? true : false;
      if (
        this.inputFirstname ||
        this.inputLastname ||
        this.inputEmail ||
        this.inputPassword ||
        this.inputConfirmPassword
      ) {
        return;
      }
      this.addAccount();
    },

    async addAccount() {
      const formData = new FormData();
      let data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      const json = JSON.stringify(data);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("data", blob);

      axios
        .post(`${this.url}/addAccount`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
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
  @apply sm:pt-20 md:pt-0 h-screen;
}
img {
  @apply h-auto
  xl:px-20 xl:py-20 
  lg:px-20 lg:py-36
  md:px-12 md:py-28;
}
.box {
  @apply xl:mr-80 xl:my-20
  h-3/4 lg:my-20 lg:mr-28
  md:my-16 md:mr-20 md:mx-0 md:rounded-xl
  sm:justify-center sm:mx-40;
}
span {
  color: #b3dbfb;
  @apply xl:mr-1 xl:text-base;
}
input {
  @apply text-primary px-2 lg:w-56;
  font-size: small;
}
.google {
  @apply xl:w-20 xl:h-20;
}
</style>
