<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-full rounded-t-2xl">
      <div class="grid grid-cols-2 mx-10">
        <div class="mt-10 text-xl font-semibold">
          {{ subjectName }}
          ชั้นมัธยมศึกษาปีที่ {{ classId }}
        </div>
      </div>

      <div class="grid grid-cols-5 mt-20 mx-10 gap-8">
        <div v-for="room in classroom" :key="room.room">
          <router-link
            :to="`/helioscore/${this.subjectName}/${this.classId}?room=${room.room}`"
          >
            <div class="class bg-white px-10 pt-10 pb-2 text-sm text-center">
              <div class="mb-5">ม.{{ classId }} / {{ room.room }}</div>
              <div>คน</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ClassInSubject",
  props: ["subjectName", "classId"],

  data() {
    return {
      classroom: [],
      url: "http://localhost:5000/Subjects",
      subject: "",
    };
  },

  methods: {
    // async getClassroom() {
    //   try {
    //     const res = await fetch(this.url);
    //     const data = await res.json();
    //     return data.find((sub) => {
    //       return sub.subjectName == this.subjectName;
    //     }).classroom;
    //   } catch (error) {
    //     console.log(`Could not get! ${error}`);
    //   }
    // },

    async getClassroom() {
      try {
        axios.get(`${this.url}/`).then((res) => {
          this.classroom = res.data.find((sub) => {
            return sub.subjectName == this.subjectName;
          }).classroom;
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },

  async created() {
    await this.getClassroom();
  },

  mounted() {
    axios.get(`${this.url}/getSubjects/${this.subjectId}`).then((res) => {
      return (this.subject = res.data);
    });
  },
};
</script>

<style scoped>
.class {
  border: 3px solid #f7f7f7;
  border-radius: 10px;
  @apply xl:justify-center;
}
</style>
