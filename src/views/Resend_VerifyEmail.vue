<template>
  <div class="background bg-light">
    <div class="md:grid md:grid-cols-2 h-screen">
      <!-- image -->
      <div>
        <img
          src="http://localhost:3000/public/images/LoginHelio.png"
          class="justify-center place-content-center h-screen md:block hidden"
        />
      </div>

      <div class="flex justify-start items-center">
        <form @submit.prevent="resend">
          <div class="pt-2 lg:mx-20 md:mx-12 mx-20 mt-20 sm:mt-0">
            <p
              class="text-secondary font-semibold lg:text-2xl md:text-lg flex justify-center sm:text-lg text-base"
            >
              ตรวจสอบอีเมลของคุณเพื่อยืนยันบัญชีนี้
            </p>

            <div class="pt-9 flex justify-center lg:mt-10 sm:mt-20">
              <p class="text-gray100 lg:text-base md:text-sm sm:text-base text-xs">
                หากคุณไม่ได้รับอีเมล คุณสามารถกรอกอีเมลสำหรับการ Verify
                อีกครั้งได้ที่นี่
              </p>
            </div>
            <div class="flex justify-center lg:mt-5 md:mt-5 mt-5">
              <span class="material-symbols-outlined"> alternate_email </span>
              <input
                v-model="email"
                type="text"
                placeholder="อีเมล"
                class="border-b border-gray50 bg-light"
              />
            </div>
            <sup v-show="inputEmail" class="text-red-500 flex mt-4 justify-end md:text-sm">
              กรุณากรอก อีเมล สำหรับการ verify
            </sup>
          </div>

          <div class="flex justify-center mt-14 lg:mx-20 md:mx-10 mx-20">
            <button class="bg-primary rounded w-full justify-center flex py-2">
              <p class="text-white text-sm">ส่งอีเมลยืนยันอีกครั้ง</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "helio/mail/verify",
      email: null,
      inputEmail: false,
    };
  },
  methods: {
    resend() {
      if (!this.email) {
        // alert("กรุณากรอก อีเมล สำหรับการ verify");
        this.inputEmail = true;
      } else {
        axios
          .post(this.url, {
            email: this.email,
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              alert(
                "ระบบได้ทำการส่งลิงก์สำหรับการ Verify ไปยังอีเมลของคุณเรียบร้อยแล้ว"
              );
            } else if (res.data.statusCode === 404) {
              alert("อีเมลนี้ไม่ได้มีการลงทะเบียน");
            }
          })
          .catch((err) => {
            if (err.response.status === 500) {
              // this.$route() ไป error page
            }
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
