<template>
  <div class="bg-light h-screen w-screen">
    <navTeacher />

    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-10 mx-5 divide-y divide-gray10">
          <div class="title flex space-x-2">
            <div><router-link to="/">หน้าหลัก </router-link></div>
            <div>></div>
            <div class="">
              {{ subjectName }}
              ชั้นมัธยมศึกษาปีที่ {{ classId }}
            </div>
          </div>

          <div class="my-5 pt-10 py-5 grid grid-cols-2">
            <div class="flex justify-start">วิชาทั้งหมด</div>
            <div class="flex justify-end">
              <router-link
                :to="{
                  name: 'addclass',
                  params: {
                    subject: this.$route.query.subjectId,
                    grade: this.$route.query.classId,
                  },
                }"
              >
                <button
                  class="add flex justify-center self-center items-center"
                >
                  <span class="material-symbols-outlined mr-2"> add </span>
                  <p>เพิ่มห้องเรียน</p>
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="order">

          <div v-for="room in classroom" :key="room.room">
            <router-link
              :to="{
                path: `/helioscore/${this.subjectName}/${this.classId}?room=${room.room}&class_id=${room._id}`,
                name: 'score',
                params: {
                  grade: this.classId,
                  subjectName: this.subjectName,
                  classId: this.classId,
                  subId: this.subjectId,
                },
                query: {
                  subjectName: this.subjectName,
                  classId: this.classId,
                  room: room.room,
                  class_id: room._id,
                },
              }"
            >
            <!-- {{ subjectId }}
            {{ classId }} -->
              <div class="class bg-white px-10 pt-10 pb-2 text-sm text-center">
                <div class="mb-5">ม.{{ classId }} ห้อง {{ room.room }}</div>
                <div>{{ room.totalStudent }} คน</div>
              </div>
            </router-link>
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
  name: "ClassInSubject",
  props: ["subjectName"],

  async created() {
    this.subjectId = this.$route.query.subjectId;
    this.classId = this.$route.query.classId;
    // console.log(this.subjectName)
    // console.log(this.subjectId)
    // console.log(this.classId)
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
      url: "helio/class",
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
            // console.log(res.data.data);
            return res.data.data.results;
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
.data {
  @apply pl-36 sm:pl-36 w-screen
  md:pl-44 mt-20
  lg:pl-60 lg:mt-24 
  ;
}
.add {
  background: white;
  box-shadow: 0px 1px 5px rgba(214, 214, 214, 0.5);
  border-radius: 22px;
  @apply px-8 py-1;
}
</style>
