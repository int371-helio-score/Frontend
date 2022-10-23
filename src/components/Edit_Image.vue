<template>
  <!-- profile preview -->
  <div name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <img src="../../src/assets/Background.png" class="w-full relative" />

          <div class="flex justify-center">เปลี่ยนแปลงรูปภาพ</div>

          <label
            class="bg-white flex-col items-center ursor-pointer rounded-lg shadow-lg upPic"
            id="preview"
          >
            <img :src="preview" />
            <svg
              class="w-4 h-4"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span class="mt-2 leading-normal">Upload a Image</span>
            <input
              type="file"
              accept="image/*"
              @change="selectFile"
              class="hidden form-control-file"
            />
          </label>

          <!-- button -->

          <div class="flex justify-center mt-12">
            <div class="">
              <button
                class="bg-light text-secondary rounded-md px-6 py-1 ml-2"
                @click="closeModal()"
              >
                ยกเลิก
              </button>
            </div>
            <div class="">
              <button
                class="bg-secondary2 text-white rounded-md px-6 py-1 ml-2"
                @click="submitFrom()"
              >
                อัปโหลด
              </button>
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
  props: { editImage: { type: Object } },
  emits: [""],
  data() {
    return {
      picture: null,
      preview: null,
      imgFile: null,
      imageName: null,
      closed: false,
    };
  },

  methods: {
    closeModal() {
      this.$emit("EditImage");
    },
    selectFile(e) {
      const file = e.target.files[0];
      this.picture = URL.createObjectURL(file);
      this.imageName = file.name;
      this.imgFile = file;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    submitFrom() {
      const formData = new FormData();
      formData.append("image", this.imgFile);
      //   formData.append("data", blob);
      axios
        .post(`helio/account/info`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("เปลี่ยนแปลงรูปสำเร็จ");
            //    return this.$router.push("/stock");
          }
          alert("Error");
        });
    },

    async created() {
      await this.getAccount();
    },
  },
};
</script>

<style scoped>
.profile {
  @apply lg:w-10 lg:h-10 sm:w-9 sm:h-9 w-8 h-8;
}
.menu {
  @apply flex justify-center bg-gradient-to-r from-light to-babyblue self-center rounded-md
  lg:py-3 lg:rounded-xl lg:mx-5
  md:rounded-lg md:py-1;
}
.listmenu {
  @apply flex self-center;
}
span {
  @apply lg:pr-2 text-secondary text-base
  lg:text-xl
  sm:text-base sm:pr-2;
}
.dropbtn {
  @apply px-4 py-2 rounded-md;
  padding: 4px;
}
.dropdown {
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.account {
  @apply text-xs 
  md:text-base;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 721px;
  height: 531px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 25px;
  @apply w-3/4 md:w-96 lg:w-1/2;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.pic {
  margin-top: -68px;
  position: absolute;
  border: 4px solid #fff;
  @apply ml-20;
}
.borderPic {
  border-radius: 49.9%;
  width: 160px;
}
input {
  @apply rounded-md py-1 px-2
  md:text-xs lg:text-sm;
}
.box {
  @apply mt-5 w-full;
}
.title {
  @apply text-secondary;
}
.upPic {
  @apply w-40 h-40 flex justify-center mt-4 text-sm 
  sm:mt-8 sm:w-60 sm:h-60 sm:justify-self-start
  md:justify-self-start md:ml-8 md:h-72 md:w-72 
  lg:w-52 lg:h-52 lg:text-base;
}
</style>
