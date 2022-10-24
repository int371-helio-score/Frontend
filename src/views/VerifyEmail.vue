<template>
  <div class="background sm:bg-light bg-white">
    <div class="md:grid md:grid-cols-2 h-screen">
      <!-- image -->
      <div>
        <img
          src="http://localhost:3000/public/images/LoginHelio.png"
          class="justify-center place-content-center h-screen md:block hidden"
        />
      </div>

      <div class="flex justify-start items-center">
        <p class="text-secondary font-semibold md:text-2xl text-lg">Welcome to Helio Score</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "helio/account/verifyEmail",
      email: null,
    };
  },

  methods: {
    verified() {
      console.log("Hi")
      const token = this.$route.query.token;
      axios
        .get(this.url, {
          params: {
            token: token,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            alert("ยืนยันสำเร็จ");
            this.$router.push("/helioscore");
          } else if (res.data.statusCode === 401) {
            alert("ลิงก์หมดอายุ กรุณาส่งคำขอใหม่");
            this.$router.push("/helioscore/resendemail");
          }
        });
    },
  },

  created() {
    console.log("hi")
    this.verified();
    console.log("eiei")
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
