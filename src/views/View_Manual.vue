<template>
  <div class="bg-light h-screen">
    <navTeacher></navTeacher>
    <div class="inline-flex">
      <sidebarTeacher></sidebarTeacher>

      <div class="data sm:mx-0 md:mx-0 divide-y divide-gray10">
        <div class="title">คู่มือการใช้งาน</div>
<!-- 
        <div class="">เนื้อหา</div> -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data {
  @apply pl-10 pr-10 w-screen pt-8 md:pt-0
  md:pl-10 mt-20
  lg:pl-60 lg:mt-24;
}
.title {
  @apply text-base font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
</style>
