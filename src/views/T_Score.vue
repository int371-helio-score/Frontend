<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-full rounded-t-2xl">
      <div class="grid grid-cols-2 ml-10">
        <div class="text-xl font-semibold">
          {{ subjectName }} ชั้นมัธยมศึกษาปีที่ {{ grade }} ห้อง {{ room }}
        </div>

        <div class="flex justify-end">
          <div class="grid grid-cols-2 content-center gap-4">
            <div
              class="rounded-b-lg bg-babyblue text-primary w-48"
              @click="score"
            >
              <span class="material-symbols-outlined"> pending_actions </span
              >คะแนนที่รอประกาศ
            </div>
            <!-- <router-link
            :to="{
              name: 'announce',
              params: {
                announce: announce.groupId,
              },
            }"
          > -->
            <div class="buttom bg-babyblue text-primary w-48">
              <div class="flex justify-center mt-5">
                <span class="material-symbols-outlined"> upload_file </span>
                <div>ประกาศคะแนน</div>
              </div>
            </div>
            <!-- </router-link> -->
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 mt-20 mx-10 gap-2">
        <div
          class="bg-light px-10 py-10 text-sm"
          v-for="list in std"
          :key="list.no"
        >
          <table>
            <tr>
              <th>เลขที่</th>
              <th>รหัส</th>
              <th>ชื่อ-นามสกุล</th>
            </tr>
            <tr>
              <th>{{ list.no }}</th>
              <th>{{ list.studentId }}</th>
              <th>{{ list.firstName }} {{ list.studentId }}</th>
            </tr>
          </table>
        </div>

        <div>
          <table>
            <tr>
              <th>เลขที่</th>
              <th>รหัส</th>
              <th>ชื่อ-นามสกุล</th>
            </tr>
            <tr>
              <th>{{ list.no }}</th>
              <th>{{ list.studentId }}</th>
              <th>{{ list.firstName }} {{ list.studentId }}</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "StudentList",
  props: ["classId", "subjectName"],

  async created() {
    // console.log(this.classId);
    const studentArr = await this.getStudent();

    let myStudentRoom;

    for (let index = 0; index < studentArr.length; index++) {
      if (studentArr[index].id == this.$route.query.room) {
        myStudentRoom = studentArr[index];
      }
    }
    this.grade = this.$route.params.grade;
    this.room = this.$route.query.room;
    this.std = myStudentRoom.members;
    // this.class_id = this.$route.query.class_id;
    console.log(this.grade);
  },
  data() {
    return {
      url: "http://localhost:3000/api/helio/score",
      std: [],
      grade: null,
      room: null,
      class_id: null,
    };
  },

  methods: {
    async getStudent() {
      try {
        const res = await axios.get(this.url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: this.room,
        });
        this.std = res.data.da.result;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },
};
</script>

<style scoped>
span {
  color: #42a5f5;
  @apply xl:mr-2;
}
.buttom {
  border-radius: 0px 10px 15px 15px;
}
</style>
