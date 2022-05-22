<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-full rounded-t-2xl">
      <div class="grid grid-cols-2 ml-10">
        <div class="mt-10 text-xl font-semibold">
          {{ subjectName }} ชั้นมัธยมศึกษาปีที่ {{ grade }} ห้อง {{ room }}
        </div>
        <div class="flex justify-end content-center">
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
              <span class="material-symbols-outlined"> campaign </span>
              <div>ประกาศคะแนน</div>
            </div>
          </div>
          <!-- </router-link> -->
        </div>
      </div>

      <div class="grid grid-cols-3 mt-20 mx-10 gap-2">
        <div
          class="bg-light px-10 py-10 text-sm"
          v-for="list in std"
          :key="list.no"
        >
          <div class="columns-4">
            <div>
              {{ list.firstName }}   {{ list.studentId }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentList",
  props: ["classId", "subjectName"],

  async created() {
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
  },
  data() {
    return {
      url: "http://localhost:5000/Student",
      std: null,
      grade: null,
      room: null,
    };
  },
  methods: {
    // async getStudent() {
    //   try {
    //     const res = await fetch(this.url);
    //     const data = await res.json();
    //     return data.find((student) => {
    //       return student.id == this.classroom.id;
    //     }).std;
    //   } catch (error) {
    //     console.log(`Could not get! ${error}`);
    //   }
    // },

    async getStudent() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
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
