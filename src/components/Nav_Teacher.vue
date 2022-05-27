<template>
  <div
    class="bg-white grid grid-cols-2 md:mx-20 sm:mx-5 mx-1 sm:py-5 sm:px-10 px-1 py-4 sm:rounded-b-2xl rounded-b-md"
  >
    <div class="grid grid-cols-3 gap-x-10 listmenu">
      <div class="menu">
        <router-link to="/helioscore">
          <div
            class="flex self-center text-primary lg:text-md text-xs lg:text-base px-5"
          >
            <span class="material-symbols-outlined home"> home </span>
            <div class="sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1">หน้าหลัก</div>
          </div>
        </router-link>
      </div>
      <!-- <div class="menu">
        <router-link to="/studentlist">
          <span class="material-symbols-outlined"> group </span>จัดการรายชื่อ
        </router-link>
      </div> -->
      <!-- <div class="menu">
        <div class="">
          <router-link to="/announce">
            <div class="flex self-center px-5 text-primary text-md">
              <span class="material-symbols-outlined" @click="seeMore()">
                campaign
              </span>
              <p>ประกาศคะแนน</p>
            </div>
          </router-link>
        </div>
      </div> -->
    </div>

    <div class="flex justify-end">
      <div class="flex items-center">
        <img :src="getImage()" class="rounded-full" />
        <div class="ml-4 cursor-default account">
          {{ this.account.firstName }} {{ this.account.lastName }}
        </div>
        <div class="dropdown">
          <span
            class="material-symbols-outlined ml-1 sm:ml-4 dropbtn cursor-pointer expand"
          >
            expand_more
          </span>
          <div class="dropdown-content rounded-sm">
            <!-- <a href="#">ข้อมูลบัญชี</a> -->
            <a href="#" @click="logout()">ออกจากระบบ</a>
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
    };
  },

  methods: {
    async getAccount() {
      try {
        const response = await axios.get(
          "https://helioscore.sytes.net/backend/api/helio/account/info",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        this.account = response.data.data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getImage() {
      return "https://helioscore.sytes.net/backend/public/images/Account.jpg";
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return this.$router.push("/");
    },
  },

  async created() {
    await this.getAccount();
  },
};
</script>

<style scoped>
img {
  @apply lg:w-12 sm:w-9 w-8;
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
  @apply text-xs md:text-base;
}
</style>
