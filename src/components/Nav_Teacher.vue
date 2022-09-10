<template>
  <div
    class="bg-white grid grid-cols-2 sm:py-5 sm:px-10 px-1 py-4 fixed w-full"
  >
    <div class="flex self-center items-center">
      <router-link to="/">
        <div class="text-xl font-bold ml-5 text-secondary">
          HELIOSCORE
        </div></router-link
      >
    </div>

    <div class="flex justify-end">
      <div class="dropdown">
        <div
          class="dropbtn flex items-center border border-light cursor-pointer"
        >
          <img :src="getImage()" class="profile rounded-full" />
          <div class="ml-4 account text-secondary">
            {{ this.account.firstName }} {{ this.account.lastName }}
          </div>
        </div>
        <div class="rounded-sm dropdown-content">
          <a href="#" @click="clickInfo()">ข้อมูลบัญชี</a>
          <a href="#" @click="logout()">ออกจากระบบ</a>
        </div>
      </div>
    </div>
  </div>

  <div name="modal" v-show="showModal == true">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <img src="../../src/assets/Background.png" class="w-full relative" />
          <div class="borderPic">
            <img :src="getImage()" class="pic rounded-full w-28 h-28" />
          </div>

          <div class="" v-if="edit == false">
            <div class="font-extrabold text-md mx-20 mt-14">
              {{ this.account.firstName }} {{ this.account.lastName }}
            </div>

            <div class="mx-20 mt-10">
              <p class="text-secondary font-bold my-2">อีเมล</p>
              <p class="text-gray50">{{ this.account.email }}</p>
            </div>

            <div class="mx-20 mt-10">
              <p class="text-secondary font-bold my-2">โรงเรียน</p>
              <p class="text-gray50">{{ this.account.schoolName }}</p>
            </div>
          </div>

          <div v-else class="grid grid-cols-2 mx-20 mt-14">
            <div class="box">
              <p class="title">ชื่อ</p>
              <input class="border border-gray50" />
            </div>

            <div class="box">
              <p class="title">นามสกุล</p>
              <input class="border border-gray50" />
            </div>

            <div class="box">
              <p class="title">อีเมล</p>
              <input class="border border-gray50" />
            </div>

            <div class="box">
              <p class="title">รหัสผ่าน</p>
              <button class="bg-gray10 text-gray50 py-1 rounded-md">
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
          </div>

          <div class="flex justify-center mt-12">
            <div class="grid grid-cols-2" v-if="edit == false">
              <button
                class="bg-light text-primary rounded-md mr-2 px-2 py-1"
                @click="editProfile()"
              >
                แก้ไขข้อมูล
              </button>
              <button
                class="bg-secondary2 text-white rounded-md px-2 py-1 ml-2"
                @click="showModal = false"
              >
                ออก
              </button>
            </div>

            <div class="grid grid-cols-2" v-else>
              <button
                class="bg-light text-primary rounded-md mr-2 px-2 py-1"
                @click="cancle()"
              >
                ยกเลิก
              </button>
              <button
                class="bg-secondary2 text-white rounded-md px-2 py-1 ml-2"
                @click="showModal = false"
              >
                บันทึก
              </button>
            </div>
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
      account: [],
      showModal: false,
      url: "/api/helio/account/info",
      edit: false,
    };
  },

  methods: {
    async getAccount() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/helio/account/info",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        this.account = response.data.data;
        // console.log(this.account)
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getImage() {
      return this.account.image;
    },

    editProfile() {
      this.edit = true;
    },

    cancle() {
      this.edit = false;
    },

    logout() {
      localStorage.removeItem("token");
      return this.$router.push("/");
    },

    clickInfo() {
      this.showModal = true;
    },
  },

  async created() {
    await this.getAccount();
  },
};
</script>

<style scoped>
.profile {
  @apply lg:w-10 lg:h-10 sm:w-9 sm:h-9 w-8 h-8;
}
.menu {
  @apply flex justify-center bg-gradient-to-r from-light to-babyblue self-center rounded-md
  lg:py-3 lg:rounded-xl lg:mx-5
  md:rounded-lg md:py-1;
}
.listmenu {
  @apply flex self-center;
}
span {
  @apply lg:pr-2 text-primary text-base
  lg:text-xl
  sm:text-base sm:pr-2;
  /* width: 15.92px;
  height: 18px; */
}
.dropbtn {
  @apply px-4 py-2 rounded-md;
  padding: 4px;
  /* font-size: 16px; */
}

.dropdown {
  /* position: relative; */
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.account {
  @apply text-xs 
  md:text-base;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 721px;
  height: 531px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 25px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.pic {
  margin-top: -68px;
  position: absolute;
  border: 4px solid #fff;
  @apply ml-20;
}
.borderPic {
  border-radius: 49.9%;
  width: 160px;
}
input {
  @apply rounded-md py-1 px-2;
}
.box {
  @apply mt-5;
}
.title{
  @apply text-secondary;
}
</style>
