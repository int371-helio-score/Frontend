<template>
  <div class="background sm:bg-light bg-white">
    <div class="md:grid md:grid-cols-2 h-screen">
      <!-- image -->
      <div>
        <img
          src="http://20.82.6.4/backend/public/images/LoginHelio.png"
          class="justify-center place-content-center h-screen md:block hidden"
        />
      </div>

      <!-- login -->
      <div class="box bg-white">
        <div class="pt-14 text-xl font-bold text-primary justify-center flex">
          <h1>เข้าสู่ระบบ</h1>
        </div>

        <form @submit.prevent="login">
          <div class="pt-2 lg:mx-20 md:mx-12 mx-20">
            <div class="flex justify-center lg:mt-20 md:mt-10 mt-20">
              <span class="material-symbols-outlined"> alternate_email </span>
              <input
                v-model="user"
                type="text"
                placeholder="อีเมล"
                class="border-b border-gray50"
              />
            </div>
            <div class="flex justify-center mt-10">
              <span class="material-symbols-outlined"> lock </span>
              <input
                v-model="pass"
                type="password"
                placeholder="รหัสผ่าน"
                class="border-b border-gray50"
              />
            </div>
            <!-- <button class="button" @click="toggleShow">
              <span class="icon is-small is-right">
                <i
                  class="fas"
                  :class="{
                    'fa-eye-slash': showPassword,
                    'fa-eye': !showPassword,
                  }"
                ></i>
              </span>
            </button> -->
            <div class="text-gray100 flex justify-end text-xs mt-2">
              ลืมรหัสผ่าน
            </div>
          </div>

          <div class="flex justify-center mt-14 lg:mx-20 md:mx-10 mx-20">
            <button class="bg-primary rounded w-full justify-center flex py-2">
              <p class="text-white text-sm">เข้าสู่ระบบ</p>
            </button>
          </div>
        </form>

        <div class="flex justify-center my-5 text-gray100">
          <p>or</p>
        </div>

        <div class="flex justify-center lg:mx-20 md:mx-10 mx-20">
          <GoogleLogin :callback="callback" />
        </div>

        <div class="flex justify-center mt-10 md:text-sm text-xs">
          <p class="inline-block text-gray100">หากคุณเป็นสมาชิกใหม่</p>
          <p class="inline-block text-primary underline">
            <a href="/helioscore/signup"> สร้างบัญชี</a>
          </p>
          <p class="inline-block text-gray100">ที่นี่</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { decodeCredential } from "vue3-google-login";
import router from "@/router";

const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  const userData = decodeCredential(response.credential);
  const url = "helio/account/google/redirect";
  axios
    .post(url, {
      firstName: userData.given_name,
      lastName: userData.family_name,
      email: userData.email,
      googleId: userData.sub,
      image: userData.picture,
    })
    .then((response) => {
      if (response.data.statusCode === 200) {
        if (response.data.data.school == 0) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("school", true);
          return router.push({ path: "/helioscore/school" });
        } else {
          localStorage.setItem("token", response.data.data.token);
          return router.push({ path: "/helioscore" });
        }
      }
    })
    .catch((err) => {
      alert(err.response.data);
    });
};
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "helio/account/login",
      user: "",
      pass: "",
      email: "",
    };
  },

  methods: {
    async login() {
      // console.log(this.pass);
      if (!this.user || !this.pass) {
        alert("กรุณากรอก อีเมล และ รหัสผ่าน");
      } 
      // else if (!this.user) {
      //   alert("กรุณากรอก อีเมล");
      // } else if (!this.pass) {
      //   alert("กรุณากรอก รหัสผ่าน");
      // } 
      else {
        axios
          .post(this.url, {
            email: this.user,
            password: this.pass,
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              localStorage.setItem("token", res.data.data.token);
              return this.$router.push("/helioscore");
            } else if (res.data.statusCode === 403) {
              alert("อีเมล และ หรัสผ่านไม่ถูกต้อง");
              (this.user = ""), (this.pass = "");
            }
          })
          .catch(() => {
            // alert(err.response.data.message);
            alert("อีเมล และ หรัสผ่านไม่ถูกต้อง");
            (this.user = ""), (this.pass = "");
          });
      }
    },
  },
};
</script>

<style scoped>
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
  @apply lg:mr-1 lg:text-base 
  md:text-base
  text-sm;
}
input {
  @apply text-primary w-full px-2;
  font-size: small;
}
</style>
