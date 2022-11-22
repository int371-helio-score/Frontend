<template>
  <div class="bg-light h-screen">
    <navTeacher />

    <div class="inline-flex">
      <sidebar-teacher />

      <div class="data">
        <div div class="sm:mx-10 md:mx-0 divide-y divide-gray10">
          <div class="title">รายชื่อ</div>

          <div class="my-5 pt-10 lg:py-5 grid grid-cols-2">
            <div class="flex justify-start text-secondary">รายการทั้งหมด</div>

            <div class="semes flex justify-end">
              <router-link to="/helioscore/importstudentlist">
                <button class="add flex justify-center">
                  <span class="material-symbols-outlined mr-2"> add </span>
                  <p>เพิ่มรายชื่อ</p>
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="order">
          <template v-for="stdlist in stdList" :key="stdlist._id">
            <router-link
              :to="{
                name: 'studentGroup',
                params: {
                  group: stdlist._id,
                },
                query: {
                  group: stdlist._id,
                },
              }"
            >
              <div class="subject bg-white text-center">
                <p class="self-center">
                  ชั้นมัธยมศึกษาปีที่ {{ stdlist.groupName }}
                </p>
                <p class="self-center text-gray100">
                  จำนวน {{ stdlist.total }} คน
                </p>
              </div>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentLists",
  data() {
    return {
      url: "helio/studentList",
      stdList: [],
    };
  },
  methods: {
    getAllStudentList() {
      axios
        .get(this.url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            this.stdList = res.data.data.results;
          }
        });
    },
  },
  async created() {
    this.getAllStudentList();
  },
};
</script>

<style scoped>
.data {
  @apply pl-36 pr-10 sm:pl-36 w-screen
  md:pl-44 mt-20
  lg:pl-60 lg:mt-24;
}
.title {
  @apply text-sm font-medium mt-5 text-secondary
  sm:text-base sm:font-bold
  lg:text-xl lg:font-bold
  md:mt-10 md:text-lg md:font-bold;
}
.order {
  @apply grid mx-10 gap-4 justify-center
  xl:grid-cols-5 xl:gap-8
  lg:grid-cols-4 lg:gap-10 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-1;
}
.subject {
  border: 3px solid #f7f7f7;
  border-radius: 10px;
  @apply justify-center text-xs
  lg:text-sm py-8
  md:px-5;
}
.add {
  background: white;
  box-shadow: 0px 1px 5px rgba(214, 214, 214, 0.5);
  border-radius: 22px;
  @apply px-8 py-1;
}
.semes {
  @apply text-secondary text-xs
md:text-base;
}
</style>
