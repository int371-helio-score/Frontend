<template>
  <div class="bg-white grid grid-cols-2 mx-20 py-5 px-10 rounded-b-2xl">
    <div class="grid grid-cols-3 gap-x-10 listmenu">
      <div class="menu">
        <router-link to="/helioscore">
          <div class="flex self-center px-5 text-primary">
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
            <span class="material-symbols-outlined"> campaign </span>
            <p>ประกาศคะแนน</p>
          </router-link>
        </div>
      </div> -->
    </div>

    <div class="flex justify-end self-center">Account</div>
  </div>
</template>

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
  
}
</style>
