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
              <div class="class bg-white px-10 pt-10 pb-2 text-sm text-center">
                <div class="mb-5">ม.{{ classId }} ห้อง {{ room.room }}</div>
                <div>{{ room.totalStudent }} คน</div>
              </div>
            </router-link>
            <div v-show="deletebtn == true">
              <button
                class="text-white delete bg-alert cursor-pointer"
                @click="deleteclass(room._id, room.room)"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>

        <div class="object" @click="clickDelete()" v-show="deletebtn == false">
          <span class="material-symbols-outlined mr-2"> edit </span>
          <p>จัดการรายวิชา</p>
        </div>
        <div class="object" v-if="deletebtn" @click="cancleDelete()">
          <span class="material-symbols-outlined mr-2"> close </span>
          <p>ยกเลิก</p>
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
      deletebtn: false,
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

    clickDelete() {
      this.deletebtn = true;
    },

    cancleDelete() {
      this.deletebtn = false;
    },

    async deleteclass(classId, room) {
      let text = "หากคุณลบชั้นเรียนนี้ คะแนนจะถูกลบทั้งหมด";
      if (confirm(text) == true) {
        axios
          .delete(`helio/class/${classId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              alert("ลบชั้นเรียนที่ " + "'" + room + "'" + " สำเร็จ");
            }
            this.$router.go();
          })
          .catch((err) => {
            alert(err.response.message);
          });
      } else {
        return;
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
  lg:pl-60 lg:mt-24;
}
.add {
  background: white;
  box-shadow: 0px 1px 5px rgba(214, 214, 214, 0.5);
  border-radius: 22px;
  @apply px-8 py-1;
}
.object {
  @apply flex text-secondary justify-end absolute bottom-8 right-10 items-center cursor-pointer
  sm:text-sm;
}
span {
  @apply text-lg;
}
.delete {
  text-decoration: underline;
  @apply lg:text-sm lg:w-full lg:rounded-sm lg:mt-1 
  flex justify-center;
}
</style>
