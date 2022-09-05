<template>
  <div class="bg-light h-full">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="grid grid-cols-2 ml-10">
          <!-- <div class="title"><router-link to="/">หน้าหลัก > </router-link></div> -->
          <div class="title">
            {{ subjectName }} ชั้นมัธยมศึกษาปีที่ {{ grade }} ห้อง {{ room }}
          </div>

          <div class="flex justify-end">
            <div class="sm:grid sm:grid-cols-2 gap-4 md:gap-2">
              <button
                class="bg-babyblue text-primary click"
                @click="clickAnnounce()"
              >
                <div
                  class="flex justify-center self-center md:text-xs lg:text-base"
                >
                  <span class="material-symbols-outlined">
                    pending_actions </span
                  >คะแนนที่รอประกาศ
                </div>
              </button>

              <button
                class="buttom bg-babyblue text-primary md:block hidden click"
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

        <!-- รอประกาศคะแนน -->
        <div class="grid grid-cols-4 mt-20 mx-10 gap-8">
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
          class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-10 gap-2"
          v-if="(uploadFile == false) & (announce == false)"
        >
          <div class="bg-light px-5 py-10 text-sm rounded-md mb-10">
            <tr class="">
              <th>เลขที่</th>
              <th class="md:pl-10">รหัส</th>
              <th class="md:pl-10 lg:pl-16">ชื่อ-นามสกุล</th>
            </tr>
            <table v-for="list in std[0].scores" :key="list.no">
              <tr class="font-light">
                <th class="md:pl-3">{{ list.no }}</th>
                <th class="md:pl-12">{{ list.studentId }}</th>
                <th class="md:pl-8 lg:pl-12">
                  {{ list.firstName }} &nbsp;&nbsp; {{ list.lastName }}
                </th>
              </tr>
            </table>
          </div>

          <div
            class="bg-light px-10 py-10 text-sm rounded-md lg:col-span-2 mb-10 pl-5"
            v-for="list in std"
            :key="list.score_id"
          >
            <tr>
              <th>{{ list.title }}</th>
            </tr>
            <!-- <table v-for="(score, index) in std[index].scores" :key="index">
            <tr>
              <th class="pl-3">{{ score.score }}</th>
            </tr>
          </table> -->
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
            console.log(response);
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
  @apply lg:w-48
  md:w-36 md:mb-4 cursor-pointer lg:rounded-b-lg rounded-md;
}
.data {
    @apply ml-60 mt-1 h-fit;
}
.title {
  @apply text-sm font-bold mt-5
  lg:text-xl lg:font-semibold
  md:text-base md:font-bold md:mt-10;
}
.order {
  @apply grid mx-10 mt-10 gap-4 justify-center
  xl:grid-cols-5 xl:gap-8
  lg:grid-cols-4 lg:gap-10 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-2;
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
</style>
