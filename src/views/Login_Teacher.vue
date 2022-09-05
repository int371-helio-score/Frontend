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
            <button class="button" @click="toggleShow">
              <span class="icon is-small is-right">
                <i
                  class="fas"
                  :class="{
                    'fa-eye-slash': showPassword,
                    'fa-eye': !showPassword,
                  }"
                ></i>
              </span>
            </button>
            <!-- <div class="text-primary flex justify-end mr-24">ลืมรหัสผ่าน</div> -->
          </div>

          <div class="flex justify-center mt-20" @click="login">
            <button class="bg-primary rounded-md w-40 justify-center flex">
              <p class="text-white">เข้าสู่ระบบ</p>
            </button>
          </div>
        </form>

        <div class="flex justify-center my-5 text-gray100">
          <p>or</p>
        </div>

        <div class="flex justify-center">
          <!-- <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1> -->
          <!-- <button
            class="bg-white rounded-md w-40 justify-center flex border-gray50 border"
            @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized"
          >
            <p class="text-gray50">Sign in with Google</p>
          </button> -->
          <GoogleLogin :callback="callback" />
        </div>

        <div class="flex justify-center mt-14">
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
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response);
  const userData = decodeCredential(response.credential);
  console.log("Handle the userData", userData);
};
</script>
<script>
import axios from "axios";
// import { inject, toRefs } from "vue";

export default {
  // setup() {
  //   const callback = (response) => {
  //     // This callback will be triggered when the user selects or login to
  //     // his Google account from the popup
  //     console.log("Handle the response", response);
  //   };
  // },

  // created(){
  //   this.$watch('callback', (data) => console.log(data))
  // },

  data() {
    return {
      url: "http://localhost:3000/api/helio/account/login",
      user: "",
      pass: "",
    };
  },

  methods: {
    // async handleSignIn() {
    //   try {
    //     const googleUser = await this.$gAuth.signIn();
    //     if (!googleUser) {
    //       return null;
    //     }
    //     console.log("googleUser", googleUser);
    //     this.user = googleUser.getBasicProfile().getEmail();
    //     console.log("getId", this.user);
    //     console.log("getBasicProfile", googleUser.getBasicProfile());
    //     console.log("getAuthResponse", googleUser.getAuthResponse());
    //     console.log(
    //       "getAuthResponse",
    //       this.$gAuth.instance.currentUser.get().getAuthResponse()
    //     );
    //   } catch (error) {
    //     //on fail do something
    //     console.error(error);
    //     return null;
    //   }
    // },

    // async signinWithGoogle() {
    //   console.log("Google");
    //   const googleUser = await this.$gAuth.signIn();
    //   this.isSignin = this.$gAuth.isAuthorized;
    //   console.log("googleUser", googleUser);
    //   console.log("getId", googleUser.getId());
    // },

    async login() {
      if (!this.user || !this.pass) {
        alert("กรุณากรอก อีเมล และ รหัสผ่าน");
      } else {
        axios
          .post(this.url, {
            email: this.user,
            password: this.pass,
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              localStorage.setItem("token", res.data.data.token);
              return this.$router.push("/helioscore");
            }
            console.log(res);
          })
          .catch((err) => {
            alert(err.response.data);
          });
      }
    },
  },
  // setup(props) {
  //   const { isSignIn } = toRefs(props);
  //   const Vue3GoogleOauth = inject("Vue3GoogleOauth");
  //   const handleClickLogin = () => {};
  //   return {
  //     Vue3GoogleOauth,
  //     handleClickLogin,
  //     isSignIn,
  //   };
  // },
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
