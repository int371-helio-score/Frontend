<template>
  <div class="background bg-white mt-1 h-screen flex justify-center fixed">
    <div class="grid grid-rows-2">
      <div class="grid grid-rows-3 h-52">
        <div class="layout">
          <router-link to="/helioscore">
            <div class="object">
              <span class="material-symbols-outlined home mr-2"> home </span>
              <div
                class="bdutsky sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 text-primary"
              >
                หน้าหลัก
              </div>
            </div>
          </router-link>
        </div>

        <!-- <div class="layout">
        <router-link to="/studentlist">
          <div class="object">
            <span class="material-symbols-outlined"> group </span>
            <div>จัดการรายชื่อ</div>
          </div>
        </router-link>
      </div> -->

        <!-- <div class="layout">
        <router-link to="/studentlist">
          <div class="object">
            <span class="material-symbols-outlined"> add </span>
            <div class="text-secondary sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 hover-primary">เพิ่มวิชาที่สอน</div>
          </div>
        </router-link>
      </div> -->
      </div>

      <div class="flex justify-end items-end">
        <button
          class="flex justify-center mx-5 self-center items-center"
          @click="() => $router.push('/helioscore/newsubject')"
        >
          <span class="material-symbols-outlined text-primary mr-2"> add </span>
          <div class="text-secondary sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1">
            เพิ่มวิชาที่สอน
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
    };
  },

  methods: {
    add() {
      this.router.push({ path: "/helioscore/newsubject" });
    },
  },
};
</script>

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
button {
  position: absolute;
  left: 8.82%;
  right: 8.4%;
  /* top: 89.74%; */
  /* bottom: 5.41%; */
  background: #ffffff;
  /* Shadow */
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 22px;
  /* @apply lg:mb-20; */
}
</style>
