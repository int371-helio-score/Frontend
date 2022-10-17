<template>
  <div class="bg-light h-full">
    <navTeacher />

    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div
          v-if="
            (uploadFile == false) & (announce == false) & (uploadStd == false)
          "
          class="mx-10"
          :class="{ 'overflow-x-auto': scroll }"
        >
          <table class="h-fit rounded-md">
            <tr class="bg-babyblue p-4">
              <th class="px-2">เลขที่</th>
              <th>รหัส</th>
              <th>ชื่อ-นามสกุล</th>
              <th v-for="tt in std" :key="tt._id" class="px-2">
                {{ tt.title }}
              </th>
            </tr>

            <tr
              v-for="list in stdScore"
              :key="list.no"
              class="font-light bg-white hover:bg-light"
            >
              <td>{{ list.no }}</td>
              <td>{{ list.studentId }}</td>
              <td>
                {{ list.firstName }} &nbsp;&nbsp;
                {{ list.lastName }}
              </td>
              <th v-for="(s, index) in list.score" :key="index">{{ s }}</th>
            </tr>
          </table>

          <!-- Manage Score -->
          <div
            class="lg:mt-10 flex justify-start sm:mx-10 mx-5 items-center self-center"
          >
            <span class="material-symbols-outlined"> settings </span>
            <p class="text-sm ml-1 hover:text-primary cursor-pointer">
              ลบคะแนนชิ้นงาน
            </p>
          </div>
        </div>
      </div>

      <!-- Score List -->
    </div>
  </div>
</template>

<style scoped>
.data {
  @apply h-screen max-h-full pl-60 mt-24 w-screen;
}
</style>
