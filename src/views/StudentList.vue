<template>
  <div class="bg-light h-full">
    <navTeacher />

    <div class="inline-flex">
      <sidebar-teacher />

      <div class="data h-screen">
        <div class="title flex space-x-2">
          <div>ห้องเรียนทั้งหมด</div>
        </div>

        <div class="text-xl mt-20">
          <div class="order">
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
                  class="subject bg-white text-center"
                >
                  <p class="self-center  ">
                  ชั้นมัธยมศึกษาปีที่ {{ stdlist.groupName }}
                  </p>
                  <p class="self-center text-gray100">
                  จำนวน  {{ stdlist.total }} คน
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
</style>
