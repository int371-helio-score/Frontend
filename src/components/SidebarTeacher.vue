<template>
  <div class="background bg-white mt-1 h-screen flex justify-center fixed">
    <div>
      <div class="layout">
        <router-link to="/helioscore">
          <div class="object">
            <span class="material-symbols-outlined home"> home </span>
            <div class="sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1">หน้าหลัก</div>
          </div>
        </router-link>
      </div>

      <div class="layout">
        <router-link to="/studentlist">
          <div class="object">
            <span class="material-symbols-outlined"> group </span>
            <div>จัดการรายชื่อ</div>
          </div>
        </router-link>
      </div>

      <div class="layout">
        <router-link to="/studentlist">
          <div class="object">
            <span class="material-symbols-outlined"> add </span>
            <div>เพิ่มวิชาที่สอน</div>
          </div>
        </router-link>
      </div>
    </div>

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
</template>

<style scoped>
.background {
  /* position: absolute; */
  width: 238px;
  left: 3px;
  top: 89px;
}
.layout {
  @apply py-10 flex justify-start;
}
.object {
  @apply flex text-primary;
}
</style>
