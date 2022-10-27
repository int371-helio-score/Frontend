<template>
  <div class="background bg-white mt-1 h-screen flex justify-center fixed">
    <div class="grid grid-rows-2">
      <div class="grid grid-rows-3 h-52">
        <div class="layout">
          <router-link to="/helioscore">
            <div class="object">
              <span class="material-symbols-outlined home mr-2"> home </span>
              <div class="sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 text-primary">
                หน้าหลัก
              </div>
            </div>
          </router-link>
        </div>

        <div class="layout">
          <router-link to="/helioscore/newsubject">
            <div class="object">
              <span class="material-symbols-outlined mr-2"> add </span>
              <div class="sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 text-primary">
                เพิ่มวิชาที่สอน
              </div>
            </div>
          </router-link>
        </div>

        <!-- <div class="layout">
          <router-link to="/helioscore/studentlist">
            <div class="object">
              <span class="material-symbols-outlined mr-2"> group </span>
              <div class="sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 text-primary">
                จัดการรายชื่อ
              </div>
            </div>
          </router-link>
        </div> -->

        <!-- <div class="layout">
          <router-link to="/helioscore/importstudentlist">
            <div class="object">
              <span class="material-symbols-outlined"> add </span>
              <div
                class="text-secondary sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 hover:text-primary"
              >
                เพิ่มรายชื่อในห้องเรียน
              </div>
            </div>
          </router-link>
        </div> -->
      </div>
<!-- 
      <div class="flex justify-end items-end">
        <button
          class="flex justify-center md:mx-5 self-center items-center"
          @click="() => $router.push('/helioscore/newsubject')"
        >
          <span class="material-symbols-outlined text-primary mr-2"> add </span>
          <div
            class="text-secondary sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 text-xs lg:text-sm"
          >
            เพิ่มวิชาที่สอน
          </div>
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
.background {
  /* width: 238px; */
  left: 3px;
  top: 89px;
  @apply lg:w-52 md:w-48 sm:w-40;
}
.layout {
  @apply py-10 flex justify-start;
}
.object {
  @apply flex text-primary sm:text-sm items-center;
}
button {
  position: absolute;
  left: 8.82%;
  right: 8.4%;
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 22px;
}
</style>
