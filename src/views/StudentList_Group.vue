<template>
  <div class="bg-light h-full">
    <navTeacher />
    <div class="inline-flex">
      <sidebar-teacher />

      <div class="data h-screen">
        <div class="title flex space-x-2">
          <div>
            <router-link to="/helioscore/studentList">รายชื่อ</router-link>
          </div>
          <div>></div>
          <div>ม. {{ stdList.groupName }}</div>
        </div>

        <div class="mt-20">
          <div class="text-base lg:pl-0 lg:pr-16">
            <template v-for="stdList in stdList.members" :key="stdList.no">
              <div
                class="h-14 flex flex-row justify-around bg-white my-4 rounded-md drop-shadow-sm"
              >
                <p class="self-center">เลขที่ {{ stdList.no }}</p>
                <p class="self-center">รหัสนักเรียน {{ stdList.studentId }}</p>
                <p class="self-center">
                  {{ stdList.title }} {{ stdList.firstName }}
                  {{ stdList.lastName }}
                </p>

                <p class="self-center">{{ stdList.email }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["group"],
  name: "studentGroup",
  data() {
    return {
      url: "helio/studentList",
      stdList: [],
    };
  },
  methods: {
    getStudentList() {
      axios
        .get(`${this.url}/${this.stdListId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.stdList = res.data.data.results;
        });
    },
  },
  async created() {
    this.stdListId = this.$route.query.group;

    this.getStudentList();
  },
};
</script>

<style scoped>
.data {
  @apply pl-36 sm:pl-36 w-screen
  md:pl-44 mt-20
  lg:pl-60 lg:mt-24;
}
.title {
  @apply text-sm font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.order {
  @apply grid mx-10 gap-4 justify-center
  xl:grid-cols-5 xl:gap-8
  lg:grid-cols-4 lg:gap-10 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-1;
}
</style>
