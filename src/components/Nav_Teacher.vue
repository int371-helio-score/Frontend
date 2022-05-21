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
      <div class="menu">
        <div class="">
          <router-link to="/announce">
            <div class="flex self-center px-5 text-primary text-md">
              <span class="material-symbols-outlined" @click="seeMore()">
                campaign
              </span>
              <div>
                <!-- <a> ข้อมูลบัญชี </a>
                <a> ออกจากระบบ </a> -->
              </div>
              <p>ประกาศคะแนน</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <div class="flex items-center">
        <img :src="getImage(this.account.picture)" class="rounded-full w-20" />
        <div class="ml-4">
          {{ this.account.firstName }} {{ this.account.lastName }}
        </div>
        <span class="material-symbols-outlined ml-4"> expand_more </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "http://localhost:5000/Teacher",
      account: "",
    };
  },

  methods: {
    async getAccount() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getImage(img) {
      return "http://localhost:5000/Teacher" + img;
    },

    seeMore() {},

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return this.$router.push("/");
    },
  },

  async created() {
    this.account = await this.getAccount();
    console.log(this.account);
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
</style>
