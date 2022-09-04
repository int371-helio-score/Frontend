<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white data">
      <div class="title mx-10">
        <div class="">
          {{ subjectName }}
          ชั้นมัธยมศึกษาปีที่ {{ classId }}
        </div>
      </div>

      <div class="order">
        <div v-for="room in classroom" :key="room.room">
          <router-link
            :to="`/helioscore/${this.subjectName}/${this.classId}?room=${room.room}&class_id=${room._id}`"
          >
            <div class="class bg-white px-10 pt-10 pb-2 text-sm text-center">
              <div class="mb-5">ม.{{ classId }} ห้อง {{ room.room }}</div>
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
      try {
        axios
          .get(`${this.url}/${this.subjectId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.classroom = res.data.data.results;
            return res.data.data.results
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
.title {
  @apply text-sm font-bold mt-5
  lg:text-xl lg:font-semibold
   md:text-base md:font-bold ;
}
.order {
  @apply grid mx-10 mt-10 gap-4 justify-center
  xl:grid-cols-5 xl:gap-8
  lg:grid-cols-4 lg:gap-10 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-2;
}
.data{
  @apply rounded-md mx-1 mt-5
  md:mt-10 md:mx-20 md:h-fit md:pb-48 md:rounded-2xl md:pt-5 pt-2;
}
</style>
