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
            :to="`/helioscore/${this.subjectName}/${this.classId}?room=${room.room}&class_id=${room._id}`"
          >
            <div class="class bg-white px-10 pt-10 pb-2 text-sm text-center">
              <div class="mb-5">ม.{{ classId }} / {{ room.room }}</div>
              <div> {{ room.totalStudent }} คน</div>
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
  props: ["subjectName"],

  async created() {
    this.subjectId = this.$route.query.subjectId;
    this.classId = this.$route.query.classId;
    await this.getClassroom();
    console.log(this.classId);
  },

  async mounted() {
    await axios
      .get(`${this.url}/${this.subjectId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        return (this.subject = res.data);
      });
  },
  data() {
    return {
      classroom: [],
      url: "http://localhost:3000/api/helio/class",
      subject: "",
      subjectId: null,
      classId: null,
    };
  },
  methods: {
    async getClassroom() {
      console.log(this.classId)
      try {
        axios
          .get(`${this.url}/${this.subjectId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res.data);
            this.classroom = res.data.data.results;
            return res.data.data.results
            // this.classroom = res.data.data.results.find((sub) => {
            //   return sub.subjectName == this.subjectName;
            // }).classroom;
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
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
