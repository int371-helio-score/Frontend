<template>
  <div
    class="bg-white grid grid-cols-2 sm:py-5 sm:px-10 px-1 py-4 fixed xl:w-full md:w-screen"
  >
    <div class="flex self-center items-center">
      <router-link to="/">
        <div class="text-xl font-bold ml-5 text-secondary">
          HELIOSCORE
        </div></router-link
      >
    </div>

    <div class="flex justify-end">
      <div class="dropdown">
        <div
          class="dropbtn flex items-center border border-light cursor-pointer"
        >
          <img :src="getImage()" class="profile rounded-full" />
          <div class="ml-4 account text-secondary">
            {{ this.account.firstName }} {{ this.account.lastName }}
          </div>
        </div>
        <div class="rounded-sm dropdown-content">
          <a href="#" @click="clickInfo()">ข้อมูลบัญชี</a>
          <a href="#" @click="logout()">ออกจากระบบ</a>
        </div>
      </div>
    </div>
  </div>

  <!-- profile preview -->

  <div name="modal" v-show="showModal == true">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <img src="../../src/assets/Background.png" class="w-full relative" />
          <div class="borderPic">
            <div>
              <img
                :src="getImage()"
                class="pic rounded-full w-28 h-28 cursor-pointer"
                @click="showEdit()"
              />
              <!-- <input type="file" accept="image/*" @input="selectFile" /> -->
            </div>
          </div>

          <div class="" v-if="edit == false">
            <div class="font-extrabold text-md mx-20 mt-14">
              {{ this.account.firstName }} {{ this.account.lastName }}
              <span
                class="material-symbols-outlined ml-2 flex items-end cursor-pointer hover:text-primary"
                @click="editProfile()"
              >
                border_color
              </span>
            </div>

            <div class="mx-20 mt-10">
              <p class="text-secondary font-bold my-2">อีเมล</p>
              <p class="text-gray50">{{ this.account.email }}</p>
            </div>

            <div class="mx-20 mt-10">
              <p class="text-secondary font-bold my-2">โรงเรียน</p>
              <p class="text-gray50">{{ this.account.schoolName }}</p>
            </div>
          </div>

          <!-- edit profile -->

          <div
            v-else-if="edit"
            class="grid grid-cols-2 lg:mx-20 mt-12 md:mx-10 mx-5"
          >
            <div class="box" v-if="!showEditPass">
              <p class="title">ชื่อ</p>
              <input
                class="border border-gray50 w-full"
                v-model="newFirstName"
              />
              <sup
                v-show="inputFirstname"
                class="text-red-500 flex justify-end mt-4"
              >
                Please enter firstname!</sup
              >
            </div>

            <div class="flex ml-4" v-if="!showEditPass">
              <div class="box">
                <p class="title">นามสกุล</p>
                <div class="flex justify-end">
                  <input
                    class="border border-gray50 w-full"
                    v-model="newLastName"
                  />
                </div>
                <sup
                  v-show="inputLastname"
                  class="text-red-500 justify-end mt-4 flex"
                >
                  Please enter lastname!</sup
                >
              </div>
            </div>

            <div class="box" v-if="!showEditPass">
              <p class="title">อีเมล</p>
              <div class="bg-gray10 text-gray50 py-1 px-2 rounded-md w-auto">
                {{ this.account.email }}
              </div>
            </div>

            <div class="flex ml-4">
              <div class="box" v-if="!showEditPass">
                <p class="title">รหัสผ่าน</p>
                <div class="flex justify-end">
                  <button
                    class="border border-gray50 py-1 rounded-md w-full text-xs lg:text-sm"
                    @click="changePass()"
                  >
                    เปลี่ยนรหัสผ่าน
                  </button>
                </div>
              </div>
            </div>

            <div class="flex ">
              <div class="box" v-if="!showEditPass">
                <div class="flex justify-start text-sm text-gray100 cursor-pointer" @click="deleteAccount()">
                  ลบบัญชี
                </div>
              </div>
            </div>

            <!-- edit password -->

            <div class="box ml-4" v-if="showEditPass">
              <p class="title">รหัสผ่านใหม่</p>
              <input
                class="bg-gray10 py-1 rounded-md lg:w-56 w-full"
                v-model="password"
                type="password"
              />
              <sup
                v-show="inputPassword"
                class="text-red-500 justify-end mt-4 flex"
              >
                กรุณาตั้งรหัสผ่าน</sup
              >
            </div>

            <div class="box" v-if="showEditPass">
              <p class="title">ยืนยันรหัสผ่านเดิม</p>
              <input
                class="bg-gray10 py-1 rounded-md lg:w-auto w-full"
                placeholder="รหัสผ่านเดิม"
                v-model="currentPass"
                type="password"
              />
              <sup
                v-show="inputCurrent"
                class="text-red-500 justify-end mt-4 flex"
              >
                กรุณากรอกหรัสผ่านเดิม</sup
              >
            </div>

            <div class="box ml-4" v-if="showEditPass">
              <p class="title">ยืนยันรหัสผ่านใหม่</p>
              <input
                class="bg-gray10 py-1 rounded-md lg:w-56 w-full"
                v-model="confirmPassword"
                type="password"
              />
              <sup
                v-show="inputConfirm"
                class="text-red-500 justify-end mt-4 flex"
              >
                กรุณายืนยันรหัสผ่าน</sup
              >
            </div>
          </div>

          <!-- button -->

          <div class="flex justify-center mt-12">
            <div class="" v-if="edit == false">
              <button
                class="bg-secondary2 text-white rounded-md px-6 py-1 ml-2"
                @click="showModal = false"
              >
                ออก
              </button>
            </div>

            <div class="grid grid-cols-2" v-else>
              <button
                class="bg-light text-primary rounded-md mr-2 px-2 py-1"
                @click="cancle()"
                v-if="!showEditPass"
              >
                ยกเลิก
              </button>
              <button
                class="bg-secondary2 text-white rounded-md px-2 py-1 ml-2"
                @click="checkInput()"
                v-if="!showEditPass"
              >
                บันทึก
              </button>

              <button
                class="bg-light text-primary rounded-md mr-2 px-2 py-1"
                @click="showEditPass = false"
                v-if="showEditPass"
              >
                ยกเลิก
              </button>
              <button
                class="bg-secondary2 text-white rounded-md px-2 py-1 ml-2"
                v-if="showEditPass"
                @click="checkPassword()"
              >
                ยืนยันการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <diV v-if="showEditImage">
    <editImage :editImage="editImg" @EditImage="EditImage"></editImage>
  </diV>
</template>

<script>
import axios from "axios";

export default {
  // props: [''],
  data() {
    return {
      account: [],
      showModal: false,
      url: "helio/account/info",
      edit: false,
      editPassword: false,
      inputFirstname: false,
      inputLastname: false,
      newFirstName: "",
      newLastName: "",
      showEditPass: false,
      inputPassword: false,
      inputCurrent: false,
      inputConfirm: false,
      password: "",
      currentPass: "",
      confirmPassword: "",
      showEditImage: false,
    };
  },

  methods: {
    getAccount() {
      try {
        axios
          .get(this.url, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.account = res.data.data;
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getImage() {
      return this.account.image;
    },

    editProfile() {
      this.edit = true;
      this.newFirstName = this.account.firstName;
      this.newLastName = this.account.lastName;
    },

    changePass() {
      this.showEditPass = true;
      this.password = "";
      this.currentPass = "";
      this.currentPass = "";
    },

    cancle() {
      this.edit = false;
      this.password = "";
      this.currentPass = "";
      this.currentPass = "";
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("school");
      return this.$router.push("/");
    },

    clickInfo() {
      this.showModal = true;
    },

    checkPassword() {
      this.inputPassword = this.password === "" ? true : false;
      this.inputCurrent = this.currentPass === "" ? true : false;
      this.inputConfirm = this.confirmPassword === "" ? true : false;
      if (
        this.password != "" &&
        this.confirmPassword != "" &&
        this.password != this.confirmPassword
      ) {
        return alert("รหัสผ่านใหม่ไม่ตรงกัน");
      } else if (this.password.length <= 7) {
        alert(
          "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วย A-Z, a-z, ตัวเลข, อีกษรพิเศษ"
        );
      } else if (
        this.inputPassword ||
        this.confirmPassword ||
        this.currentPass
      ) {
        this.submitPassword();
      }
    },

    submitPassword() {
      var data = {
        newPassword: this.password,
        currentPassword: this.currentPass,
      };
      axios
        .patch("helio/account/password", data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            alert("เปลี่ยนหรัสผ่านสำเร็จ");
            this.showModal = false;
            this.edit = false;
            this.getAccount();
            (this.password = ""),
              (this.currentPass = ""),
              (this.currentPass = "");
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    checkInput() {
      this.inputFirstname = this.newFirstName === "" ? true : false;
      this.inputLastname = this.newLastName === "" ? true : false;
      if (!this.inputFirstName || !this.inputLastName) {
        return this.submitEdit();
      }
    },

    async submitEdit() {
      var data = {
        firstName: this.newFirstName,
        lastName: this.newLastName,
      };
      // if(editImage){
      //   data.image = this.inputFile;
      // }
      axios
        .patch(this.url, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            alert("Edit success");
            this.showModal = false;
            this.edit = false;
            this.getAccount();
            this.newFirstName = "";
            this.newLastName = "";
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    chooseImage() {
      this.$refs.fileInput.click();
    },

    selectFile(e) {
      // this.showEditImage = true;

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

    deleteAccount() {
      axios
        .delete(`helio/account/delete`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            alert("ลบสำเร็จ");
            localStorage.removeItem("token");
            this.$router.push("/");
          }
        })
        .catch((err) => {
          alert(err.response.message);
        });
    },
  },

  async created() {
    await this.getAccount();
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
</style>
