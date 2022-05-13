<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-full">
      <div class="grid grid-cols-2">
        <div>
          <!-- {{ classroom.subjectName }} -->
          <!-- <div v-for="grad in classroom.">
              ชั้นมัธยมศึกษาปีที่ {{ classroom.}}
          </div>  -->
        </div>
      </div>

      <div class="grid grid-cols-5 mt-20 mx-10 gap-8">
        <div
          class="bg-white border px-10 py-10 text-sm"
          v-for="room in classrooms"
          :key="room.id"
        >
            ม.{{ room.grade }} / {{ room.room }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "ClassInSubject",
  props: ["classId"],

  data() {
    return {
      classrooms: [],
      url:"http://localhost:5000/Subjects",
      url2: "http://localhost:5000/Classroom"
    };
  },

  methods: {
    async getSubjects() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
    async getClassrooms() {
      try {
        const res = await fetch(this.url2);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },

  async created() {
    this.classrooms = await this.getClassrooms();
  },

//   mounted() {
//     axios.get(`${this.url}/getSubjects/${this.subjectId}`).then((res) => {
//       return (this.classroom = res.data);
//     });
//   },
};
</script>