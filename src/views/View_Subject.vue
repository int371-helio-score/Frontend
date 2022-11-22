<template>
  <div class="background pb-10 min-h-screen">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-0 md:mx-0 divide-y divide-gray10">
          <div class="title">หน้าหลัก</div>

          <div class="my-5 pt-5 md:pt-10 lg:py-5 grid sm:grid-cols-2">
            <div class="flex justify-start semes hidden sm:block">
              <p>วิชาทั้งหมด</p>
            </div>

            <div class="semes flex justify-end mb-5 sm:mb-0">
              <p>ปีการศึกษา</p>
              <select
                v-model="selected"
                class="ml-1 md:ml-4 bg-light text-secondary"
              >
                <option
                  v-for="semester in academics"
                  :key="semester"
                  :value="semester"
                >
                  {{ semester.semester }} / {{ semester.academicYear }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="order">
          <div v-for="subject in subjects" :key="subject._id">
            <div class="bg-white text-center box">
              <div class="subject">
                <div class="flex justify-end pt-1 pr-1">
                  <div class="dropdown">
                    <span
                      class="material-symbols-outlined text-secondary cursor-pointer dropbtn"
                      @click="clickSeeMore(subject._id)"
                    >
                      more_vert
                    </span>
                    <div class="rounded-sm dropdown-content" :id="subject._id">
                      <a href="#" @click="editSubject(subject)">แก้ไข</a>
                      <a
                        href="#"
                        @click="deleteSubject(subject._id, subject.subjectName)"
                        >ลบ</a
                      >
                    </div>
                  </div>
                </div>

                <router-link
                  :to="{
                    name: 'class',
                    params: {
                      subjectName: subject.subjectName,
                      classId: subject.grade,
                    },
                    query: {
                      subjectId: subject._id,
                      classId: subject.grade,
                    },
                  }"
                >
                  <img
                    :src="getPicture()"
                    class="flex sm:justify-center"
                  /><br />
                  <div>
                    {{ subject.subjectCode }} {{ subject.subjectName }}<br />
                  </div>
                  <div class="classroom">
                    <div>ชั้นมัธยมศึกษาปีที่ {{ subject.grade }}</div>
                    <div class="mt-4">{{ subject.totalClass }} ห้องเรียน</div>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- <div v-show="deletebtn == true && subject.owner">
              <button
                class="text-gray100 delete bg-gray50 cursor-pointer"
                @click="deleteSubject(subject._id, subject.subjectName)"
              >
                ลบ
              </button>
            </div> -->
          </div>
        </div>

        <!-- <div class="object" @click="clickDelete()" v-show="deletebtn == false">
          <span class="material-symbols-outlined mr-2"> edit </span>
          <p>จัดการรายวิชา</p>
        </div> -->
        <div class="object" v-if="deletebtn" @click="cancleDelete()">
          <span class="material-symbols-outlined mr-2"> close </span>
          <p>ยกเลิก</p>
        </div>
      </div>
    </div>
  </div>

  <editSubject
    v-if="editModal"
    :editComp="editSub"
    @showEditModal="editSubject"
    class="absolute"
  ></editSubject>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import SidebarTeacher from "@/components/SidebarTeacher.vue";

export default {
  components: { SidebarTeacher },
  data() {
    return {
      url: "helio/subject",
      subjects: null,
      totalRoom: "",
      academic: "helio/academic",
      academics: [],
      picture: "",
      selected: "",
      owner: null,
      term: [
        {
          name: "Please Select an Option",
          id: "",
        },
      ],
      deletebtn: false,
      editModal: false,
      editSub: null,
      show: false,
    };
  },

  async created() {
    await this.getAcademics();
  },

  watch: {
    selected() {
      this.getSubjects();
    },
  },
  methods: {
    clickSeeMore(e) {
      document.getElementById(e).classList.toggle("show");
    },

    clickDelete() {
      this.deletebtn = true;
    },

    cancleDelete() {
      this.deletebtn = false;
    },

    async deleteSubject(subjectId, subjectName) {
      let text = "หากคุณลบรายวิชานี้ คะแนนจะถูกลบทั้งหมด";
      if (confirm(text) == true) {
        axios
          .delete(`helio/subject/${subjectId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              alert("ลบวิชาเรียน " + "'" + subjectName + "'" + " สำเร็จ");
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

    async getAcademics() {
      try {
        const response = await axios.get("helio/academic", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        this.academics = response.data.data.results;
        this.selected = this.academics[0];
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getSubjects() {
      try {
        axios
          .get(this.url, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            params: {
              semester: _.get(this.selected, "semester"),
              academicYear: _.get(this.selected, "academicYear"),
            },
          })
          .then((res) => {
            console.log(res.data.data.results);
            this.subjects = res.data.data.results;
            this.totalRoom = res.data.data.total;
            this.owner = res.data.data.results[0].owner;
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    checkOwner() {
      if (this.subjects.owner == true) {
        return (this.owner = true);
      }
    },

    getPicture() {
      return "https://test-helioscore.sytes.net/backend/public/images/pic1.png";
    },

    async editSubject(subject) {
      this.editModal = !this.editModal;
      this.editSub = subject;
      // if(this.editModal == false){
      //   await this.getSubjects(this.$route.query.);
      // }
    },
  },
};
</script>

<style scoped>
.background {
  background: #ecf6fe;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
img {
  @apply lg:h-auto;
}
.box {
  border: 3px solid #f7f7f7;
  border-radius: 10px;
  @apply mb-5 sm:mb-0;
}
.subject {
  @apply justify-center text-xs px-1
  lg:text-sm 
  md:py-2
  sm:px-5 py-2;
}
.classroom {
  color: #797979;
}
label {
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
}
select {
  font-weight: 700;
  line-height: 29px;
  @apply md:text-base;
}
.order {
  @apply justify-center grid grid-cols-2 gap-1
  xl:grid-cols-5 xl:gap-5
  lg:grid-cols-4 lg:gap-5 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-3 sm:mx-0 sm:grid sm:gap-4;
}
.title {
  @apply text-base font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.semes {
  @apply text-secondary text-xs
md:text-base sm:text-sm; 
}
.data {
  @apply w-screen px-5 mt-20
  sm:px-10 sm:pt-8 
  md:pt-0 md:pl-10
  lg:pl-60 lg:mt-24;
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
