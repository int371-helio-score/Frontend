<template>
  <div class="background sm:bg-light bg-white">
    <div class="md:grid md:grid-cols-2 h-screen">
      <!-- image -->
      <div>
        <img
          src="https://helioscore.sytes.net/backend/public/images/LoginHelio.png"
          class="justify-center place-content-center h-screen md:block hidden"
        />
      </div>

      <!-- reset -->
      <div class="box bg-white">
        <div class="pt-14 text-xl font-bold text-primary justify-center flex">
          <h1>รีเซ็ตรหัสผ่าน</h1>
        </div>
        <div class="md:mx-10 lg:mx-18 sm:mx-10 mx-14">
          <div class="flex justify-center mt-10">
            <span class="material-symbols-outlined"> lock </span>
            <input
              v-model="password"
              @input="passwordCheck"
              type="password"
              placeholder="รหัสผ่าน"
              class="border-b border-gray50 w-full"
            />
          </div>
          <div></div>
          <div class="flex justify-center mt-5">
            <span class="material-symbols-outlined"> lock </span>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              class="border-b border-gray50 w-full"
            />
          </div>
          <sup v-show="inputConfirmPassword" class="text-red-500 flex mt-4">
            กรุณายืนยันรหัสผ่าน
          </sup>
        </div>

        <div class="flex justify-center mt-14 lg:mx-20 md:mx-10 mx-20">
          <button
            @click="resetPassword"
            class="bg-primary rounded w-full justify-center flex py-2"
          >
            <p class="text-white text-sm">รีเซ็ตรหัสผ่าน</p>
          </button>
        </div>

        <div class="flex justify-center mt-10 md:text-sm text-xs">
          <p class="inline-block text-primary underline pr-2">
            <a href="/"> เข้าสู่ระบบ</a>
          </p>
        </div>
        <div class="flex justify-center mt-10 md:text-sm text-xs">
          <p class="inline-block text-gray100 pr-1">หากคุณเป็นสมาชิกใหม่</p>
          <p class="inline-block text-primary underline pr-1">
            <a href="/helioscore/signup">สร้างบัญชี</a>
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
      url: "helio/account/resetPassword",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    resetPassword() {
      const token = this.$route.query.token;
      axios
        .patch(
          this.url,
          {
            newPassword: this.password,
            // body
          },
          {
            params: {
              token: token,
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode === 200) {
            alert("รีเซ็ตรหัสผ่านเรียบร้อย");
            this.$router.push("/");
          }else if(res.data.statusCode === 401){
            alert("ลิงก์หมดอายุ กรุณาส่งคำขอใหม่")
            this.$router.push("/")
          }
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
