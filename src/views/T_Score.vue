<template>
  <div class="bg-light w-full max-h-full min-h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 max-h-full min-h-screen rounded-t-2xl">
      <div class="grid grid-cols-2 ml-10">
        <div class="text-xl font-semibold pt-10">
          {{ subjectName }} ชั้นมัธยมศึกษาปีที่ {{ grade }} ห้อง {{ room }}
        </div>

        <div class="flex justify-end">
          <div class="grid grid-cols-2 content-top gap-4">
            <div
              class="rounded-b-lg bg-babyblue text-primary w-48 mb-4 cursor-pointer"
              @click="clickAnnounce()"
            >
              <div class="flex justify-center self-center mt-3">
                <span class="material-symbols-outlined"> pending_actions </span
                >คะแนนที่รอประกาศ
              </div>
            </div>

            <div
              class="buttom bg-babyblue text-primary w-48 pt-3 mb-4 cursor-pointer"
              @click="clickUpload()"
            >
              <div class="flex justify-center self-center">
                <span class="material-symbols-outlined"> upload_file </span>
                <div>อัปโหลดคะแนน</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- รอประคะแนน -->

      <div v-if="announce">
        <announceScore />
      </div>

      <!-- อัปโหลด -->

      <div v-if="uploadFile">
        <div class="flex justify-center">
          <div class="container flex flex-col mt-10">
            <button
              class="relative self-end md:mb-4 text-xl"
              style="color: #42a5f5"
              @click="downloadTemp(this.class_id)"
            >
              ดาวน์โหลดไฟล์เทมเพลต
            </button>

            <!-- preview file -->

            <div class="container self-center">
              <input
                class="wrapper"
                type="file"
                placeholder="* อัปโหลดได้เฉพาะไฟล์ CSV เท่านั้น *"
                @change="handleFileUpload()"
              />
              <!-- <div class="content">
                  <div class="flex justify-center">
                    <span class="material-symbols-outlined"> upload_file </span>
                  </div>
                  <div class="md:mt-4 text-center">
                    <p class="text-gray-400 text-xl">เลือกไฟล์ที่นี่</p>
                    <p class="text-gray-400 text-sm">
                      * อัปโหลดได้เฉพาะไฟล์ CSV เท่านั้น *
                    </p>
                  </div>
                </div> -->

              <div class="flex justify-center">
                <button
                  class="md:w-44 w-44 h-12 text-lg"
                  @onclick="submitFile()"
                  id="custom-btn"
                  @change="handleFileUpload($event)"
                >
                  อัปโหลด
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Score List -->

      <div
        class="grid grid-cols-3 mt-20 mx-10 gap-2"
        v-if="(uploadFile == false) & (announce == false)"
      >
        <div class="bg-light px-10 py-10 text-sm rounded-md">
          <tr>
            <th>เลขที่</th>
            <th>รหัส</th>
            <th>ชื่อ-นามสกุล</th>
          </tr>
          <table v-for="list in std.scores" :key="list.no">
            <tr>
              <th>{{ list }}</th>
              <!-- <th>{{ list.scores.studentId }}</th>
              <th>{{ list.scores.firstName }} {{ list.scores.lastName }}</th> -->
            </tr>
          </table>
        </div>

        <div
          class="bg-light px-10 py-10 text-sm rounded-md"
          v-for="(list, index) in std"
          :key="index"
        >
          <tr>
            <th>{{ list.title }}</th>
          </tr>
          <table>
            <tr>
              <th>{{ list.scores.score }}</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentList",
  props: ["classId", "subjectName"],

  // async mounted() {
  //   await axios
  //     .get(`${this.url}/${this.class_id}`, {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     })
  //     .then((res) => {
  //       return (this.subject = res.data);
  //     });
  // },

  data() {
    return {
      url: "http://localhost:3000/api/helio/score",
      template: "http://localhost:3000/api/helio/score/template",
      std: [],
      grade: null,
      room: null,
      class_id: null,
      uploadFile: false,
      announce: false,
      file: "",
    };
  },

  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);

      axios
        .post(`${this.url}`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    clickUpload() {
      this.uploadFile = !this.uploadFile;
    },

    clickAnnounce() {
      this.announce = !this.announce;
    },

    downloadTemp(classId) {
      console.log("const filename = response.headers['content-disposition']")
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
          // const filename = response.headers['content-disposition'];
          // const filename = xhr.getResponseHeaders("Content-Disposition");
          downloadLink.setAttribute("download", "helio.xlsx");
          // console.log(filename);
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
            // console.log(response.data);
            this.std = response.data.data.results;
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

    console.log(this.class_id);
  },
};
</script>

<style scoped>
span {
  color: #42a5f5;
  @apply xl:mr-2;
}
.buttom {
  border-radius: 0px 10px 0px 12px;
}
th {
  padding: 20px;
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
.container #custom-btn {
  margin-top: 30px;
  display: block;
  height: 50px;
  outline: none;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  background: #42a5f5;
}
</style>
