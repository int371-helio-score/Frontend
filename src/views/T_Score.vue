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
            <!-- <router-link :to="`/helioscore/${this.subjectName}/${this.classId}`"> -->
              <div>{{ subjectName }} ชั้นมัธยมศึกษาปีที่ {{ grade }}</div>
            <!-- </router-link> -->
            
            <div class="mx-2">></div>
            <div>ห้อง {{ room }}</div>
          </div>

          <div
            class="my-5 pb-5 pt-15 grid grid-cols-2 w-screen max-w-screen-2xl"
          >
            <div class="flex justify-start text-secondary text-lg pt-3">
              รายชื่อทั้งหมด
            </div>
            <div class="flex justify-end">
              <div class="grid grid-cols-3 gap-4 md:gap-2 pt-3">
                <!-- class="mx-2" -->
                <button class="add click">
                  <div
                    class="flex justify-center self-center md:text-xs lg:text-base"
                  >
                    <span class="material-symbols-outlined"> group_add </span>
                    <div>อัปโหลดรายชื่อ</div>
                  </div>
                </button>

                <button class="add click" @click="clickAnnounce()">
                  <div
                    class="flex justify-center self-center md:text-xs lg:text-base"
                  >
                    <span class="material-symbols-outlined">
                      pending_actions </span
                    >คะแนนที่รอประกาศ
                  </div>
                </button>

                <button
                  class="add md:block hidden click"
                  @click="clickUpload()"
                >
                  <div
                    class="flex justify-center self-center md:text-xs lg:text-base"
                  >
                    <span class="material-symbols-outlined"> upload_file </span>
                    <div>อัปโหลดคะแนน</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- รอประกาศคะแนน -->
        <div class="grid grid-cols-4 mx-10 gap-8">
          <div v-if="announce">
            <div
              class="content border-2 rounded-lg md:w-60 md:h-60 bg-white px-10 pt-10 pb-2 text-sm text-center"
              v-for="assign in toAnnounce"
              :key="assign.id"
            >
              <div class="stitle mb-5">{{ assign.title }}</div>
              <div class="flex justify-center">
                <button
                  class="ojb bg-babyblue text-primary click"
                  @click="sentEmail(assign.title)"
                >
                  ประกาศ
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- อัปโหลด -->

        <div v-if="uploadFile">
          <div class="flex justify-center">
            <div class="container flex flex-col mt-10">
              <!-- preview file -->

              <div class="self-center">
                <input
                  class="wrapper flex justify-content-center align-items-center"
                  type="file"
                  ref="file"
                  @change="handleFileUpload()"
                />

                <!-- <div class="bar"></div>
              <div
                class="wrapper md:px-48 md:py-20 flex justify-center place-content-center"
              >
                <input type="file" class="input" @change="handleFileUpload()" />
              </div> -->
                <div class="md:grid md:grid-cols-2">
                  <div class="md:text-xs text-gray-400 mt-2">
                    * อัปโหลดได้เฉพาะไฟล์ CSV เท่านั้น
                  </div>
                  <button
                    class="relative md:mb-4 md:text-base flex justify-end"
                    style="color: #42a5f5"
                    @click="downloadTemp(this.class_id)"
                  >
                    ดาวน์โหลดไฟล์เทมเพลต
                  </button>
                </div>

                <div class="flex gap-10 justify-center mt-8">
                  <div class="flex justify-center ojb bg-light text-primary">
                    <button
                      class="md:w-32 h-12 text-sm"
                      id="custom-btn"
                      @click="clickUpload()"
                    >
                      ยกเลิก
                    </button>
                  </div>
                  <div class="flex justify-center ojb">
                    <button
                      class="md:w-32 h-12 text-sm bg-primary text-white md:rounded-lg"
                      @click="submitFile()"
                    >
                      อัปโหลด
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Score List -->

        <div
          v-if="(uploadFile == false) & (announce == false)"
          class="mx-10 ml-20 max-w-screen-2xl tab"
          :class="{ 'overflow-x-auto': scroll}"
        >
          <table class="w-screen max-w-screen-2xl h-fit">
            <tr class="bg-babyblue p-4">
              <th>เลขที่</th>
              <th>รหัส</th>
              <th>ชื่อ-นามสกุล</th>
              <th v-for="tt in std" :key="tt._id">
                {{ tt.title }}
              </th>
            </tr>

            <tr
              v-for="list in stdScore"
              :key="list.no"
              class="font-light bg-white hover:bg-light"
            >
              <th>{{ list.no }}</th>
              <th>{{ list.studentId }}</th>
              <th>
                {{ list.firstName }} &nbsp;&nbsp;
                {{ list.lastName }}
              </th>
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
import SidebarTeacher from "@/components/SidebarTeacher.vue";

export default {
  components: { SidebarTeacher },
  name: "StudentList",
  props: ["classId", "subjectName"],
  data() {
    return {
      url: "http://localhost:3000/api/helio/score",
      template: "http://localhost:3000/api/helio/score/template",
      announceUrl: "http://localhost:3000/api/helio/score/toAnnounce",
      sent: "http://localhost:3000/api/helio/mail",
      toAnnounce: [],
      std: [],
      grade: null,
      room: null,
      class_id: null,
      uploadFile: false,
      announce: false,
      file: "",
      sentToEmail: "",
      stdScore: [],
      scroll: false,
    };
  },

  methods: {
    sentEmail(score) {
      axios
        .post(
          `${this.sent}`,
          { class_id: this.class_id, scoreTitle: score },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode === 200) {
            this.$router.go();
            alert("ส่งอีเมลไปยังนักเรียนแล้ว");
          }
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("class_id", this.$route.query.class_id);

      axios
        .post(`${this.url}`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200 || res.status === 201) {
            this.getStudent(this.$route.query.class_id);
            alert("อัปโหลดไฟล์สมบูรณ์ กด ประกาศคะแนน เพื่อประกาศ");
            this.getAnnounce(this.$route.query.class_id);
            this.clickAnnounce().$router.go();
          }
        });
    },

    clickUpload() {
      this.uploadFile = !this.uploadFile;
      this.announce = false;
    },

    clickAnnounce() {
      this.announce = !this.announce;
      this.uploadFile = false;
    },

    downloadTemp(classId) {
      console.log("const filename = response.headers['content-disposition']");
      axios
        .get(`${this.template}/${classId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          responseType: "blob",
        })
        .then((response) => {
          window.URL = window.webkitURL || window.URL;
          const contentType = "text/csv";
          const csvFile = new Blob([response.data], { type: contentType });
          const downloadURL = window.URL.createObjectURL(csvFile);
          const downloadLink = document.createElement("a");
          downloadLink.href = downloadURL;
          downloadLink.setAttribute("download", "helioscore.xlsx");
          document.body.appendChild(downloadLink);
          downloadLink.click();
        });
    },

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
            if(this.std.length > 5){
              this.scroll = true
            }
            return response.data.data.results;
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    async getAnnounce(classId) {
      try {
        axios
          .get(`${this.announceUrl}/${classId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.toAnnounce = response.data.data.results;
            return response.data.data.results;
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },

  async created() {
    this.grade = this.$route.params.grade;
    this.room = this.$route.query.room;
    this.class_id = this.$route.query.class_id;

    await this.getStudent(this.$route.query.class_id);
    await this.getAnnounce(this.$route.query.class_id);
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
  @apply cursor-pointer
  md:w-36 md:mb-4 
  lg:rounded-b-lg rounded-md lg:w-56;
}
.data {
  @apply pl-60 mt-24 w-screen max-w-screen-2xl h-screen max-h-full;
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
}
table tr td,
th {
  border: 1px solid #ccc;
}
.tab {
  width: 90rem;
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
