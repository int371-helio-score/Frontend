<template>
  <div class="bg-light min-h-screen w-screen">
    <navTeacher />

    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="divide-y divide-gray10">
          <div class="title flex space-x-2">
            <div><router-link to="/">หน้าหลัก ></router-link></div>
            <div>
              {{ subjectName }}
              ชั้นมัธยมศึกษาปีที่ {{ classId }}
            </div>
          </div>

          <div class="my-5 pt-5 md:pt-10 lg:py-5 grid grid-cols-2">
            <div class="flex justify-start text-secondary">ห้องเรียนทั้งหมด</div>
            <div class="flex justify-end" v-show="list">
              <router-link
                :to="{
                  name: 'addclass',
                  query: {
                    subject: this.$route.query.subjectId,
                    grade: this.$route.query.classId,
                  },
                }"
              >
                <button
                  class="add flex justify-center self-center items-center text-secondary"
                >
                  <span class="material-symbols-outlined mr-2"> add </span>
                  <p>เพิ่มห้องเรียน</p>
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="order">
          <div
            v-for="room in classroom"
            :key="room.room"
            class="box bg-white text-secondary"
          >
            <div class="text-center">
              <div class="flex justify-end pt-1 pr-1">
                <div class="dropdown">
                  <span
                    class="material-symbols-outlined cursor-pointer dropbtn"
                    @click="clickMoreVert(room._id)"
                  >
                    more_vert
                  </span>
                  <div class="rounded-sm dropdown-content" :id="room._id">
                    <a href="#" @click="editClass(room, classId)">แก้ไข</a>
                    <a href="#" @click="deleteclass(room._id, room.room, classId)"
                      >ลบ</a
                    >
                  </div>
                </div>
              </div>
            </div>

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
              <div class="text-center mt-2">
                <div class="text-sm font-bold mb-10">
                  ชั้นมัธยมศึกษาปีที่ {{ classId }} ห้อง {{ room.room }}
                </div>
                <div class="text-xs" v-show="room.owner">
                  นักเรียนทั้งหมด {{ room.totalStudent }} คน
                </div>

                <div class="text-xs" v-show="room.owner === false">
                  <p>คุณครู {{ ownerName }}</p>
                  <p class="">ติดต่อ {{ ownerEmail }}</p>
                  <p></p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <editClass
    v-if="editModal"
    :editClassComp="edit"
    :showGrade="showGrade"
    @showEditModal="editClass"
    class="absolute"
  >
  </editClass>
</template>

<script>
import axios from "axios";

export default {
  name: "ClassInSubject",
  props: ["subjectName"],

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
      checkOwner: "helio/subject",
      subOwner: "helio/subject/info",
      ownerName: null,
      ownerEmail: null,
      list: false,
      edit: null,
      showGrade: null,
      deletebtn: false,
      editModal: false,
      editSub: null,
      show: false,
      more: false,
    };
  },
  methods: {
    owner(subId) {
      axios
        .get(`${this.checkOwner}/${subId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.list = response.data.data.results.owner;
          return;
        });
    },

    getSubjectOwner(subId) {
      axios
        .get(`${this.subOwner}/${subId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.ownerName = res.data.data.results.ownerName;
          this.ownerEmail = res.data.data.results.ownerEmail;
          return res.data.data.results;
        });
    },

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

    async deleteclass(classId, room, grade) {
      let text = "หากคุณลบห้องเรียนนี้ คะแนนและรายชื่อจะถูกลบทั้งหมด";
      if (confirm(text) == true) {
        axios
          .delete(`helio/class/${classId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              alert("ลบชั้นมัธยมศึกษาปีที่ "+ grade + " ห้อง " + room + " สำเร็จ");
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

    seeMore(){
      this.more =! this.more;
    },

    clickMoreVert(roomId) {
      document.getElementById(roomId).classList.toggle("show");
    },

    async editClass(selectClass, classId) {
      this.editModal = !this.editModal;
      this.edit = selectClass;
      this.showGrade = classId;
    },
  },

  async created() {
    this.subjectId = this.$route.query.subjectId;
    this.classId = this.$route.query.classId;
    await this.getClassroom();
    await this.owner(this.$route.query.subjectId);
    await this.getSubjectOwner(this.$route.query.subjectId);
  },
};
</script>

<style scoped>
.box {
  border: 3px solid #f7f7f7;
  border-radius: 10px;
  @apply pb-2 lg:pb-3;
}
.title {
  @apply text-sm font-medium mt-5 text-secondary
  sm:text-base sm:font-bold
  lg:text-xl lg:font-bold
  md:mt-10 md:text-lg md:font-bold;
}
.order {
  @apply justify-center
  grid grid-cols-2 gap-1
  xl:grid-cols-5 xl:gap-5
  lg:grid-cols-4 lg:gap-5 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-3 sm:mx-0 sm:grid sm:gap-4;
}
.data {
  @apply w-screen mt-20 px-5
  sm:px-10 sm:pt-8 
  md:pt-0 md:px-10 
  lg:pl-60 lg:mt-24;
}
.add {
  background: white;
  box-shadow: 0px 1px 5px rgba(214, 214, 214, 0.5);
  /* border-radius: 22px; */
  @apply sm:px-8 py-1 px-4 rounded-full text-xs sm:text-sm md:text-base;
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
.dropbtn {
  border: none;
  cursor: pointer;
}
.dropdown {
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown a:hover {
  background-color: #ddd;
}
.show {
  display: block;
}
</style>
