<template>
  <div class="bg-light h-screen w-screen">
    <navTeacher />

    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="divide-y divide-gray10">
          <div class="title flex space-x-2">
            <div><router-link to="/">หน้าหลัก ></router-link></div>
            <div class="">
              {{ subjectName }}
              ชั้นมัธยมศึกษาปีที่ {{ classId }}
            </div>
          </div>

          <div class="my-5 pt-5 md:pt-10 lg:py-5 grid grid-cols-2">
            <div class="flex justify-start text-secondary">วิชาทั้งหมด</div>

            <div class="flex justify-end lg:mr-10" v-show="list">
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
            <!-- {{room._id}} -->
            <div class="text-center">
              <div class="flex justify-end pt-1 pr-1">
                <div class="dropdown">
                  <span
                    class="material-symbols-outlined cursor-pointer dropbtn"
                    @click="clickSeeMore(room._id)"
                  >
                    more_vert
                  </span>
                  <div class="rounded-sm dropdown-content">
                    <a href="#" @click="editClass(room)">แก้ไข</a>
                    <a href="#" @click="deleteSubject(room._id, room.room)"
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
                <div class="text-sm font-bold">
                  ชั้นปีที่ {{ classId }} ห้อง {{ room.room }}
                </div>
                <div class="text-sm font-bold my-8" v-show="room.owner">
                  คะแนนรวม {{}} คะแนน
                </div>
                <div
                  class="text-sm font-bold my-8"
                  v-show="room.owner == false"
                >
                  คะแนนรวม {{}} / {{}}
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
            <!-- <div v-show="deletebtn == true && room.owner">
              <button
                class="text-gray100 delete bg-gray50 cursor-pointer"
                @click="deleteclass(room._id, room.room)"
              >
                ลบ
              </button>
            </div> -->
          </div>
        </div>

        <!-- <div class="object" @click="clickDelete()" v-show="deletebtn == false">
          <span class="material-symbols-outlined mr-2"> edit </span>
          <p>จัดการรายวิชา</p>
        </div>
        <div class="object" v-if="deletebtn" @click="cancleDelete()">
          <span class="material-symbols-outlined mr-2"> close </span>
          <p>ยกเลิก</p>
        </div> -->
      </div>
    </div>
  </div>

  <editClass
    v-if="editModal"
    :editClassComp="edit"
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
      deletebtn: false,
      editModal: false,
      editSub: null,
      show: false,
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
          // console.log(this.theacher);
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

            console.log(this.classroom);
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

    clickSeeMore(classid) {
      console.log(classid)
      document.getElementById(classid).classList.toggle("show");
    },

    async editClass(selectClass) {
      this.editModal = !this.editModal;
      this.edit = selectClass;
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
  @apply text-sm font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.order {
  @apply grid gap-4 justify-center
  xl:grid-cols-5 xl:gap-5
  lg:grid-cols-4 lg:gap-5 lg:mb-20
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
.dropbtn {
  /* background-color: #3498db; */
  /* color: white; */
  /* padding: 16px; */
  /* font-size: 16px; */
  border: none;
  cursor: pointer;
}

.dropdown {
  /* position: relative; */
  display: inline-block;
  /* @apply flex justify-end; */
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
  /* position: absolute; */
}
.dropdown a:hover {
  background-color: #ddd;
}
.show {
  display: block;
}
</style>
