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
          <div>{{ stdList.groupName }}</div>
        </div>

        <div class="mt-20">
          <div class="text-xl px-40">
            <template v-for="std in stdList.members" :key="std.no">
              <div
                class="h-14 flex flex-row justify-around bg-white my-4 rounded-2xl drop-shadow-sm"
              >
                <p class="self-center">
                  {{ std.title }} {{ std.firstName }} {{ std.lastName }}
                </p>
                <p class="self-center">{{ std.email }}</p>
                <p class="self-center">เลขที่ {{ std.no }}</p>
                <p class="self-center">รหัสนักเรียน {{ std.studentId }}</p>
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
import SidebarTeacher from "@/components/SidebarTeacher.vue";

export default {
  components: { SidebarTeacher },
  props: ["groupName"],
  name: "StudentLists",
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
</style>
