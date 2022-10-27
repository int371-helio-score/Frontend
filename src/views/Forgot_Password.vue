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

      <!-- forgot -->
      <div class="box bg-white">
        <div class="pt-14 text-xl font-bold text-primary justify-center flex">
          <h1>ลืมรหัสผ่าน</h1>
        </div>

        <form @submit.prevent="sendForgot">
          <div class="pt-2 lg:mx-20 md:mx-12 mx-20">
            <div class="pt-9 flex justify-center">
              <p>ส่งคำขอรีเซ็ตรหัสผ่านไปยังอีเมล</p>
            </div>
            <div class="flex justify-center lg:mt-20 md:mt-10 mt-20">
              <span class="material-symbols-outlined"> alternate_email </span>
              <input
                v-model="user"
                type="text"
                placeholder="อีเมล"
                class="border-b border-gray50"
              />
            </div>
          </div>

          <div class="flex justify-center mt-14 lg:mx-20 md:mx-10 mx-20">
            <button class="bg-primary">
              <p class="text-white text-sm">ส่งคำขอ</p>
            </button>
          </div>
        </form>

        <div class="flex justify-center mt-5 lg:mx-20 md:mx-10 mx-20">
          <button class=" text-primary border ">
            <a href="/" class="text-sm"> เข้าสู่ระบบ</a>
          </button>
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
      url: "helio/mail/forgotPassword",
      user: null,
    };
  },
  methods: {
    sendForgot() {
      if (!this.user) {
        alert("กรุณากรอก อีเมล");
      } else {
        axios
          .post(this.url, {
            email: this.user,
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              alert(
                "ระบบได้ทำการส่งลิงก์รีเซ็ตรหัสผ่านใหม่ไปยังอีเมลของคุณเรียบร้อยแล้ว"
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
button{
  @apply rounded w-full justify-center flex py-2;
}
</style>
