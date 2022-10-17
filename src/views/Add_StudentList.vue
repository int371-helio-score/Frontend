<template>
  <div class="bg-light h-screen">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-10 mx-5 divide-y divide-gray10">
          <div class="title">เพิ่มรายชื่อ</div>

          <div>
            <div class="step">
              <p class="header">ขั้นตอนที่ 1 ดาวน์โหลดไฟล์เทมเพลต</p>
              <div class="inline description">
                <p @click="downloadTempStd(this.class_id)">คลิกที่นี่</p>
                <p>เพื่อดาวน์โหลด</p>
              </div>
            </div>

            <div class="step">
              <p class="header">ขั้นตอนที่ 2 ระบุชั้นเรียน และห้องที่ต้องการเพิ่มรายชื่อ</p>
              <p class="description">เลือกชั้นเรียน</p>
              <v-select type="text" name="academic" v-model="classroom" />
              <!-- <sup
              v-show="inputClass"
              class="text-red-500 flex justify-center mt-4"
              >กรุณาเลือกชั้นเรียน</sup
            > -->

              <p class="description">เลือกห้องเรียน</p>
              <v-select></v-select>
            </div>

            <div class="step">
              <p class="header">ขั้นตอนที่ 3 นำเข้าไฟล์ข้อมูล</p>
              <div class="flex justify-center">
                <div class="container flex flex-col mt-10">
                  <div class="self-center">
                    <input
                      class="wrapper flex justify-content-center align-items-center"
                      type="file"
                      ref="file"
                      @change="handleFileStd()"
                    />
                    <div class="md:grid md:grid-cols-2">
                      <div class="md:text-xs text-gray-400 mt-2">
                        * อัปโหลดได้เฉพาะไฟล์ CSV เท่านั้น
                      </div>
                      <button
                        class="relative md:mb-4 md:text-base flex justify-end"
                        style="color: #42a5f5"
                        
                      >
                        ดาวน์โหลดไฟล์เทมเพลตรายชื่อ
                      </button>
                    </div>

                    <div class="flex gap-10 justify-center mt-8">
                      <div
                        class="flex justify-center ojb bg-light text-primary"
                      >
                        <button
                          class="md:w-32 h-12 text-sm bg-white text-primary md:rounded-lg"
                          id="custom-btn"
                          @click="clickUploadStd()"
                        >
                          ยกเลิก
                        </button>
                      </div>
                      <div class="flex justify-center ojb">
                        <button
                          class="md:w-32 h-12 text-sm bg-primary text-white md:rounded-lg"
                          @click="submitFileStd()"
                        >
                          อัปโหลดรายชื่อ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      //   urlGrade: "/helio/class/$subject_id",
      classroom: [],
    };
  },

  async created() {
    await this.getClass();
    console.log(this.classroom);
  },

  methods: {
    async getClass() {
      try {
        const response = await axios.get("/helio/class", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        this.classroom = response.data.data.results;
        // this.selected = this.academics[0];
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    downloadTempStd() {
      axios
        .get(this.templateStd, {
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
  },
};
</script>

<style scoped>
.data {
  @apply pl-36 sm:pl-36 w-screen
  md:pl-44 mt-20
  lg:pl-60 lg:mt-24;
}
.title {
  @apply text-sm font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
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
input {
  @apply border border-gray50 rounded-md px-2 py-1 pt-1;
}
.step{
    @apply mt-10;
}
.header{
    color: #42A5F5;
    @apply lg:text-base lg:font-medium ;
}
.description{
    @apply lg:text-sm lg:pt-2;
}
</style>
