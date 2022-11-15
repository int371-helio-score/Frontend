<template>
  <div class="hidden lg:block">
    <div class="background bg-white mt-1 h-screen flex justify-center fixed">
      <div class="grid grid-rows-2">
        <div class="grid grid-rows-3 h-52">
          <div class="layout">
            <router-link to="/helioscore">
              <a class="object Item active">
                <span class="material-symbols-outlined home mr-2"> home </span>
                <p class=""> หน้าหลัก </p>
              </a>
            </router-link>
          </div>

          <div class="layout">
            <router-link to="/helioscore/newsubject">
              <a class="object">
                <span class="material-symbols-outlined mr-2"> add </span>
                <a class=""> เพิ่มวิชาที่สอน </a>
              </a>
            </router-link>
          </div>

          <div class="layout">
            <router-link to="/helioscore/studentlist">
              <a class="object">
                <span class="material-symbols-outlined mr-2"> group </span>
                <a class=""> จัดการรายชื่อ </a>
              </a>
            </router-link>
          </div>
          <!-- 
          <div class="">
            <span class="material-symbols-outlined"> add </span>
            <a
              class="active"
            >
              เพิ่มรายชื่อในห้องเรียน
            </a>
          </div>
        </div> -->
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
        </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const Items = document.querySelectorAll(".Item");
// console.log("hi")
// Items.forEach((Item) => {
//   Item.addEventListener("click", () => {
//     document.querySelector(".active").classList.remove("active");
//     Item.classList.add("active");
//     console.log("li")
//   });
// });
import { ref } from 'vue'
export default{
  setup(){
    const selected = ref(0)
    return {
      selected,
    }
  }
}
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
  @apply flex sm:text-sm items-center;
}
button {
  position: absolute;
  left: 8.82%;
  right: 8.4%;
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 22px;
}
span {
  @apply text-primary;
}
.Item {
  color: #1a4262;
  @apply sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1;
}
/* .Item.active {
  color: #42a5f5;
} */

.Item:visited{
  color: red;
}
</style>
