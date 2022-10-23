<template>
  <div class="bg-light h-full">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-10 mx-5 divide-y divide-gray10">
          <div class="title flex">
            <div>
              <router-link to="/">หน้าหลัก</router-link>
            </div>
            <div class="mx-2">></div>
            <div>{{ subjectName }} ชั้นมัธยมศึกษาปีที่ {{ grade }}</div>
            <div class="mx-2">></div>
            <div>ห้อง {{ room }}</div>
          </div>
        </div>

        <!-- Score List -->
        <div
          v-if="
            (uploadFile == false) & (announce == false) & (uploadStd == false)
          "
          class="mx-10"
          :class="{ 'overflow-x-auto': scroll }"
        >
          <table class="h-fit rounded-md">
            <tr class="bg-babyblue p-4">
              <th class="px-2">เลขที่</th>
              <th>รหัส</th>
              <th>ชื่อ-นามสกุล</th>
              <th v-for="tt in std" :key="tt._id" class="px-2">
                {{ tt.title }}
              </th>
            </tr>

            <tr
              v-for="list in stdScore"
              :key="list.no"
              class="font-light bg-white hover:bg-light"
            >
              <td>{{ list.no }}</td>
              <td>{{ list.studentId }}</td>
              <td>
                {{ list.firstName }} &nbsp;&nbsp;
                {{ list.lastName }}
              </td>
              <th v-for="(s, index) in list.score" :key="index">{{ s }}</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import SidebarTeacher from "@/components/SidebarTeacher.vue";

export default {
  // components: { SidebarTeacher },
  name: "StudentList",
  props: ["classId", "subjectName", "subId"],
  data() {
    return {
      url: "helio/score",
      std: [],
      grade: null,
      room: null,
      class_id: null,
      subject_id: null,
      stdScore: [],
      scroll: false,
    };
  },

  async created() {
    this.grade = this.$route.params.grade;
    this.room = this.$route.query.room;
    this.class_id = this.$route.query.class_id;
    this.subject_id = this.$route.params.subId;

    console.log("subId: " + this.subject_id);
    console.log("classId: " + this.class_id);
    console.log("subjectName: " + this.subjectName);

    await this.getStudent(this.$route.query.class_id);
  },

  methods: {
    async getStudent(classId) {
      try {
        axios
          .get(`${this.url}/${classId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.std = response.data.data.results;
            for (const s of this.std) {
              s.scores.forEach((each) => {
                let dup = this.stdScore.filter((el) => {
                  return el.no === each.no;
                });

                if (dup.length == 0) {
                  const obj = {
                    no: each.no,
                    studentId: each.studentId,
                    title: each.title,
                    firstName: each.firstName,
                    lastName: each.lastName,
                    score: [],
                  };
                  obj.score.push(each.score);
                  this.stdScore.push(obj);
                } else {
                  this.stdScore
                    .find((x) => x.no === each.no)
                    .score.push(each.score);
                }
              });
            }
            if (this.std.length > 5) {
              this.scroll = true;
            }
            return response.data.data.results;
          });
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
  @apply xl:mr-2 md:text-xs lg:text-xl;
}
.buttom {
  border-radius: 0px 10px 0px 12px;
}
th {
  @apply md:py-4;
}
.container {
  height: 400px;
  width: 800px;
  position: relative;
}
.container .wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  border: 2px dashed #b3dbfb;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.wrapper.active {
  border: none;
}
.wrapper .preview {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper #cancel-btn i {
  position: absolute;
  font-size: 20px;
  right: 15px;
  top: 15px;
  color: #9658fe;
  cursor: pointer;
  display: none;
}
.wrapper.active:hover #cancel-btn i {
  display: block;
}
.wrapper #cancel-btn i:hover {
  color: #e74c3c;
}
.wrapper .file-name {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 8px 0;
  font-size: 18px;
  color: #fff;
  display: none;
  background: linear-gradient(135deg, #3a8ffe 0%, #9658fe 100%);
}
.wrapper.active:hover .file-name {
  display: block;
}
.click {
  @apply cursor-pointer rounded-md
  md:w-36 md:mb-4 lg:w-36;
}
.data {
  @apply h-screen max-h-full pl-60 mt-24 w-screen;
}
.title {
  @apply text-sm font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.dropzone {
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  display: table;
  table-layout: fixed;
  width: 100px;
  height: 80px;
  top: 86px;
  left: 100px;
  border: 1px dashed #a4a4a4;
  border-radius: 3px;
  text-align: center;
  overflow: hidden;
}

.content {
  display: table-cell;
  vertical-align: middle;
}

.upload {
  margin: 6px 0 0 2px;
}

.filename {
  display: block;
  color: #676767;
  font-size: 14px;
  line-height: 18px;
}

.input {
  position: absolute;
  display: flex;
  width: 100;
  height: 100;
}

.ojb {
  @apply md:py-2;
}

.add {
  background: white;
  box-shadow: 0px 1px 5px rgba(214, 214, 214, 0.5);
  border-radius: 22px;
  @apply px-8 py-1;
}

table {
  border-collapse: collapse;
  /* border-radius: 100px; */
}
table tr td,
th {
  border: 1px solid #ccc;
}
table td {
  @apply py-2 px-2;
}
.tab {
  /* width: 90rem; */
  @apply w-screen;
}
table::-webkit-scrollbar {
  scrollbar-color: rgba(255, 100, 70, 0.8) rgba(0, 100, 200, 0.5);
}
table::-webkit-scrollbar-thumb {
  scrollbar-color: rgba(255, 100, 70, 0.8) rgba(0, 100, 200, 0.5);
}
table::-webkit-scrollbar-thumb:window-inactive {
  scrollbar-color: rgba(255, 100, 70, 0.8) rgba(0, 100, 200, 0.5);
}
</style>
