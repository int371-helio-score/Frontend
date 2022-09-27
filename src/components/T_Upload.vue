<template>
  <div class="flex justify-center">
        <div class="container flex flex-col mt-20">
          <button
            class="relative self-end md:mb-4 text-xl"
            style="color: #42a5f5"
            @click="download"
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
</template>

<script>
// import axios from 'axios';
export default {
  name: "UploadFile",
  // props: ["classId", "subjectName"],

  async created(){
    // this.class_id = this.$route.query.classId;
  },

  data() {
    return {
      // class_id: null,
      url: "helio/score/template"
    };
  },

  methods: {
    upload(){

    },

    // download(){
    //   axios.get(`${this.url}/${class_id}`,{
    //     headers: {
    //       Authorization: localStorage.getItem("token"),
    //     },
    //     params:{
          
    //     }
    //   })
    // }
  },

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
