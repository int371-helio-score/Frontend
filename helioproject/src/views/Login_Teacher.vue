<template>
  <div class="bg-light">
    <div class="grid grid-cols-2 h-full">
      <div>
        <img
          src="../assets/LoginHelio.png"
          class="flex justify-center place-content-center h-screen"
        />
      </div>


        <div class="box bg-white">
          <div
            class="pt-20 text-xl font-bold text-blue-700 justify-center flex"
          >
            <h1>เข้าสู่ระบบ</h1>
          </div>

          <form @submit.prevent="login" class="">
            <div class="pt-2">
              <div class="flex justify-center mt-20">
                <span class="material-symbols-outlined"> alternate_email </span>
                <input
                  v-model="user"
                  type="text"
                  placeholder="อีเมล"
                  class="border-b border-babyblue"
                />
              </div>
              <div class="flex justify-center mt-10">
                <span class="material-symbols-outlined"> lock </span>
                <input
                  v-model="pass"
                  type="password"
                  placeholder="รหัสผ่าน"
                  class="border-b border-babyblue"
                />
              </div>
            </div>

            <div class="flex justify-center mt-20" @click="login">
              <button class="bg-primary rounded-md w-40 justify-center flex">
                <p class="text-white">เข้าสู่ระบบ</p>
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
      url: "http://localhost:3000/api/helio/account/signin",
      // username: "noreply.helioscoresystem@gmail.com",
      // password: "helio039098103",
      user: "",
      pass: "",
    };
  },

  methods: {
    async login() {
      if (!this.user || !this.pass) {
        alert("กรุณากรอก อีเมล และ รหัสผ่าน");
      } 
      // else if (this.user != this.url || this.pass != this.url) {
      //   alert("อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง");
      // } 
      else {
        axios
          .post(this.url, {
            email: this.user,
            password: this.pass,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.statusCode === 200) {
              // localStorage.setItem("token", res.data.token);
              // localStorage.setItem("role", res.data.role);
              // if (res.data.role == "Teacher") {
              //   return this.$router.push("/helioscore");
              // }
              return this.$router.push("/helioscore");
            }
          })
          .catch((err) => {
            alert(err.response.data);
          });
      }
    },

    // async login() {
    //   if (!this.username || !this.password) {
    //     alert("Username and Password can't be empty!");
    //   } else if (this.user == this.username && this.pass == this.password) {
    //     return this.$router.push("/helioscore");
    //   } else {
    //     alert("Username and Password can't be empty!");
    //   }
    // },
  },
};
</script>

<style scoped>
::placeholder {
  color: #b3dbfb;
}
img{
  @apply xl:px-20 xl:py-20 
  lg:px-20 lg:py-36
  md:px-12 md:py-28;
}
.box {
  box-shadow: 0px 0px 50px 0px #d2ebff;
  border-radius: 20px;
  @apply xl:mr-80 xl:my-20
  h-3/4 lg:my-20 lg:mr-28
  md:my-16 md:mr-20;
}
span {
  color: #b3dbfb;
  @apply xl:mr-1 xl:text-base;
}
input {
  @apply text-primary lg:w-56;
  font-size: small;
}
</style>
