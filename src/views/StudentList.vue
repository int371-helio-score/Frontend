<template>
  <div class="bg-light h-full">
    <navTeacher />

    <div class="inline-flex">
      <sidebar-teacher />

      <div class="data h-screen">
        <div class="title flex space-x-2">
          <div>รายชื่อ</div>
        </div>

        <div class="text-xl mt-20">
          <div class="px-52">
            <template v-for="stdlist in stdList" :key="stdlist._id">
              <router-link :to="{
                name:'studentGroup',
                params: {
                    group: stdlist._id,
                  },
                  query: {
                    group: stdlist._id,
                  },
              }">
                <div
                  class="h-14 flex flex-row justify-between pr-8 bg-white my-10 rounded-2xl drop-shadow-sm"
                >
                  <p class="self-center ml-10 flex justify-start">
                    {{ stdlist.groupName }}
                  </p>
                  <p class="self-center mr-10 flex justify-end">
                    {{ stdlist.total }} คน
                  </p>
                </div>
              </router-link>
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
            console.log(res.data);
            this.stdList = res.data.data.results;
            console.log(this.stdList);
          }
        });
    },
  },
  async created() {
    this.getAllStudentList();
    console.log(this.stdList);
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
