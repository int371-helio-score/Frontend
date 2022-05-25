<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-full">
      <div class="grid grid-cols-2">
        <div class="md:ml-20 md:mt-8">
          <h1 class="font-bold text-2xl">
            คณิตศาสตร์พื้นฐาน ชั้นมัธยมศึกษาปีที่ x{{}} ห้อง x{{}}
          </h1>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="container flex flex-col md:mt-40">
          <button
            class="relative self-end md:mb-4 text-xl"
            style="color: #42a5f5"
          >
            ดาวน์โหลดไฟล์เทมเพลต
          </button>
          <div class="container self-center">
            <div class="wrapper">
              <div class="preview">
                <!-- preview here -->
              </div>
              <div class="content">
                <div class="flex justify-center">
                  <!-- <img src="../assets/upload.png" width="78" height="98" /> -->
                </div>
                <div class="md:mt-4">
                  <p class="text-gray-400 text-xl">
                    อัปโหลดได้เฉพาะไฟล์ CSV เท่านั้น
                  </p>
                </div>
              </div>
              <div id="cancel-btn">
                <i class=""></i>
              </div>
              <div class="file-name">File name here</div>
            </div>
            <div class="flex justify-center">
              <button
                class="md:w-44 w-44 h-12 text-lg"
                onclick="call method here()"
                id="custom-btn"
              >
                อัปโหลด
              </button>
              <input id="default-btn" type="file" hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: "Upload file",
  props: ["classId", "subjectName"],

  data() {
    return {
      // url: "",
    };
  },

  methods: {},

  async created() {},
};
</script>

<style scoped>
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
