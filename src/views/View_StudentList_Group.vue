<template>
  <div class="bg-light h-auto">
    <navTeacher />
    <div class="inline-flex">
      <sidebar-teacher />

      <div class="data">
        <div class="divide-y divide-gray10">
          <div class="title flex space-x-2">
            <div>
              <router-link to="/helioscore/studentList">รายชื่อ</router-link>
            </div>
            <div>></div>
            <div>ชั้นมัธยมศึกษาปีที่ {{ stdList.groupName }}</div>
          </div>

          <div class="my-5 pt-5 md:pt-10 lg:py-5 grid grid-cols-2">
            <div class="flex justify-start semes text-secondary">
              <p>ราชื่อทั้งหมด</p>
            </div>

            <div class="flex justify-end text-secondary">
              <div class="flex items-center self-center ">
                <span class="material-symbols-outlined cursor-pointer ml-2">
                  edit_note
                </span>
                <p class="mr-10 text-sm hover:text-primary cursor-pointer">
                  จัดการรายชื่อ
                </p>
              </div>

              <div class="flex items-center self-center" @click="deleteStd()">
                <span class="material-symbols-outlined"> delete </span>
                <p class="text-sm hover:text-primary cursor-pointer">
                  ลบรายชื่อ
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <div class="text-base">
            <template v-for="stdList in stdList.members" :key="stdList.no">
              <div
                class="h-14 flex flex-row justify-around bg-white my-1 rounded-md drop-shadow-sm"
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

    deleteStd() {
      let text = "ต้องการลบรายชื่อทั้งหมดหรือไม่?";
      if (confirm(text) == true) {
        axios
          .delete(`helio/studentList/${this.stdListId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              alert("ลบสำเสร็จ");
              this.$router.push("/helioscore/studentlist");
            }
          })
          .catch((err) => {
            alert(err.response.message);
          });
      }
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
  @apply pl-10 pr-10 w-screen pt-8 md:pt-0
  md:pl-10 mt-20
  lg:pl-60 lg:mt-24;
}
.title {
  @apply text-sm font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.order {
  @apply grid gap-4 justify-center
  xl:grid-cols-5 xl:gap-8
  lg:grid-cols-4 lg:gap-10 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-1;
}
span {
  color: #42a5f5;
  @apply xl:mr-2 md:text-xs lg:text-xl;
}
</style>
