<template>
  <div class="bg-white grid grid-cols-2 mx-20 py-5 px-10 rounded-b-2xl">
    <div class="grid grid-cols-3 gap-x-10 listmenu">
      <div class="menu">
        <router-link to="/helioscore">
          <div class="flex self-center px-5 text-primary text-md">
            <span class="material-symbols-outlined"> home </span>หน้าหลัก
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
        <img :src="getImage()" class="rounded-full w-12" />
        <div class="ml-4">
          {{ this.account.firstName }} {{ this.account.lastName }}
        </div>
        <div class="dropdown">
          <span class="material-symbols-outlined ml-4 dropbtn cursor-pointer">
            expand_more
          </span>
          <div class="dropdown-content">
            <a href="#">ข้อมูลบัญชี</a>
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
          "http://localhost:3000/api/helio/account/info",
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
      return "http://localhost:3000/public/images/Account.jpg";
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
.menu {
  @apply flex justify-center bg-gradient-to-r from-light to-babyblue self-center
  lg:py-3 rounded-xl mx-5;
}
.listmenu {
  @apply flex self-center;
}
span {
  @apply lg:pr-2 text-primary;
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
</style>
