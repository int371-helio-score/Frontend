<template>
  <div class="background">
    <navTeacher/>
    <div class="inline-flex">
      <sidebarTeacher/>

      <div class="data">
        <div class="divide-y divide-gray10">
          <div class="title">คู่มือการใช้งาน</div>

          <div class="my-5 pt-5 md:pt-10 lg:py-5">
            <img src="../assets/manual.png"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background{
  background: #ECF6FE;
  background-size: cover;
  /* @apply h-screen ; */
  /* width: 100vw;
  height: 100vh; */
}
.data {
  @apply px-10 pt-8 md:pt-0
  md:pl-10 mt-20
  lg:pl-60 lg:mt-24;
}
.title {
  @apply text-base font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
</style>
