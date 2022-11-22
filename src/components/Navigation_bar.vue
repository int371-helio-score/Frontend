<template>
  <div class="">
    <div
      class="bg-white drop-shadow-sm sm:py-5 sm:px-10 px-5 py-4 fixed xl:w-full w-screen"
    >
      <div class="grid grid-cols-2">
        <div class="flex self-center items-center">
          <div class="hidden lg:block">
            <router-link to="/">
              <div class="text-xl font-bold text-secondary">
                HELIOSCORE
              </div></router-link
            >
          </div>

          <div
            class="flex justify-start self-center lg:hidden"
            @click="openHamburger()"
          >
            <span class="material-symbols-outlined hamburger"> menu </span>
          </div>
        </div>

        <div class="" @click="clickProfile()">
          <div class="dropdown grid grid-rows-2">
            <div
              class="dropbtn flex items-center border border-light cursor-pointer"
            >
              <img :src="getImage()" class="profile rounded-full" />
              <div class="ml-4 account text-secondary hidden sm:block">
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

      <div class="flex justify-center lg:hidden" v-if="open">
        <div class="grid grid-rows-2">
          <div class="layout">
            <router-link to="/helioscore">
              <div class="object">
                <span class="material-symbols-outlined home mr-2" style="color: #42A5F5;"> home </span>
                <div
                  class="sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 text-secondary"
                >
                  หน้าหลัก
                </div>
              </div>
            </router-link>
          </div>

          <div class="layout">
            <router-link to="/helioscore/newsubject">
              <div class="object">
                <span class="material-symbols-outlined mr-2" style="color: #42A5F5;"> add </span>
                <div
                  class="sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 text-secondary"
                >
                  เพิ่มวิชาที่สอน
                </div>
              </div>
            </router-link>
          </div>

          <div class="layout">
            <router-link to="/helioscore/manual">
              <div class="object">
                <span class="material-symbols-outlined mr-2" style="color: #42A5F5;">
                  description
                </span>
                <div
                  class="sm:pt-0.5 lg:pt-0.5 lg:pl-0 pt-1 pl-1 text-secondary"
                >
                  คู่มือการใช้งาน
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- profile preview -->

  <div name="modal" v-show="showModal == true">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <img
            src="../../src/assets/Background.png"
            class="w-full relative hidden sm:block"
          />
          <div class="borderPic">
            <div class="flex justify-center sm:justify-start">
              <img
                :src="getImage()"
                class="pic rounded-full sm:w-28 sm:h-28 w-20 h-20 cursor-pointer"
                @click="showEdit()"
              />
              <!-- <input type="file" accept="image/*" @input="selectFile" /> -->
            </div>
          </div>

          <div class="" v-if="edit == false">
            <div
              class="font-extrabold text-md sm:mx-20 flex justify-center sm:justify-start"
            >
              {{ this.account.firstName }} {{ this.account.lastName }}
              <span
                class="material-symbols-outlined ml-2 flex items-end cursor-pointer hover:text-primary"
                @click="editProfile()"
              >
                border_color
              </span>
            </div>

            <div class="flex justify-center sm:justify-start">
              <div class="mx-4 sm:mx-20 mt-10">
                <p class="text-secondary font-bold my-2">อีเมล</p>
                <p class="text-gray50">{{ this.account.email }}</p>
              </div>
            </div>

            <div class="flex justify-center sm:justify-start">
              <div class="mx-4 sm:mx-20 mt-10 justify-start">
                <p class="text-secondary font-bold my-2">โรงเรียน</p>
                <p class="text-gray50">{{ this.account.schoolName }}</p>
              </div>
            </div>
          </div>

          <!-- edit profile -->

          <div v-else-if="edit">
            <div class="flex justify-center">
              <p class="text-base font-bold sm:hidden">แก้ไขข้อมูลส่วนตัว</p>
            </div>
            <div class="flex md:justify-start justify-center">
              <div class="grid gap-1 sm:grid-cols-2 lg:mx-20 md:mx-10 mx-5">
                <div class="box" v-if="!showEditPass">
                  <p class="title">ชื่อ</p>
                  <input
                    class="border border-gray50 w-full"
                    v-model="newFirstName"
                    maxlength="30"
                  />
                  <sup
                    v-show="inputFirstname"
                    class="text-red-500 flex justify-end mt-4"
                  >
                    Please enter firstname!</sup
                  >
                </div>

                <div class="flex sm:ml-4" v-if="!showEditPass">
                  <div class="box">
                    <p class="title">นามสกุล</p>
                    <div class="flex justify-end">
                      <input
                        class="border border-gray50 w-full"
                        v-model="newLastName"
                        maxlength="30"
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
                  <input
                    class="bg-gray10 text-gray50 py-1 px-2 rounded-md w-full cursor-default"
                    v-model="this.account.email"
                  >
                    <!-- {{ this.account.email }} -->
                  <!-- </input> -->
                </div>

                <div class="flex sm:ml-4" v-show="!account.google">
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
              </div>
            </div>

            <div class="flex lg:mx-20 md:mx-10 mx-5 mt-2 sm:mt-0">
              <div class="box" v-if="!showEditPass">
                <button
                  class="flex justify-start text-sm text-gray100 cursor-pointer hover:text-red-500"
                  @click="deleteAccount()"
                >
                  ลบบัญชี
                </button>
                <p class="text-xs text-gray100">
                  (หากทำการลบบัญชี ข้อมูลที่คุณสร้างไว้จะถูกลบทั้งหมด
                  แต่ไม่มีผลกับข้อมูลที่ผู้ใช้อื่นสร้างและเพิ่มคุณในห้องเรียน)
                </p>
              </div>
            </div>

            <!-- edit password -->

            <div
              class="lg:mx-40 md:mx-10 mx-5 mt-5 md:mt-5 grid col-span-2"
              v-if="showEditPass"
            >
              <div class="py-1">
                <p class="title">รหัสผ่านเดิม</p>
                <input
                  class="bg-gray10 py-1 rounded-md w-full"
                  placeholder="รหัสผ่านเดิม"
                  v-model="currentPass"
                  type="password"
                  minlength="8"
                />
                <sup
                  v-show="inputCurrent"
                  class="text-red-500 justify-end mt-4 flex"
                >
                  กรุณากรอกหรัสผ่านเดิม</sup
                >
              </div>

              <div class="py-1">
                <p class="title">รหัสผ่านใหม่</p>
                <input
                  class="bg-gray10 py-1 rounded-md w-full"
                  v-model="password"
                  type="password"
                  maxlength="20"
                  minlength="8"
                />
                <sup
                  v-show="inputPassword"
                  class="text-red-500 justify-end mt-4 flex"
                >
                  กรุณาตั้งรหัสผ่าน</sup
                >
              </div>

              <div class="py-1">
                <p class="title">ยืนยันรหัสผ่านใหม่</p>
                <input
                  class="bg-gray10 py-1 rounded-md w-full"
                  v-model="confirmPassword"
                  type="password"
                  maxlength="20"
                  minlength="8"
                />
                <sup
                  v-show="inputConfirm"
                  class="text-red-500 justify-end mt-4 flex"
                >
                  กรุณายืนยันรหัสผ่าน</sup
                >
              </div>
            </div>
          </div>

          <!-- button -->

          <div class="flex justify-center mt-12 md:mb-5 mb-5">
            <div class="" v-if="edit == false">
              <button
                class="bg-secondary2 text-white rounded-md px-6 py-1 ml-2"
                @click="showModal = false"
              >
                ออก
              </button>
            </div>

            <div class="grid grid-cols-2 mx-4 text-base sm:mx-0 sm:text-base" v-else>
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
      open: false,
      profile: false,
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

    clickProfile() {
      this.profile = !this.profile;
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
            alert("บันทึกสำเร็จ");
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
      let text = "คุณต้องการลบบัญชีหรือไม่ ?";
      if (confirm(text) == true) {
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
      } else {
        return;
      }
    },

    openHamburger() {
      this.open = !this.open;
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
  @apply flex justify-end;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  /* z-index: 1; */
  @apply mt-10 sm:mt-12;
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
  height: auto;
  overflow-y: auto;
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
  position: relative;
  border: 4px solid #fff;
  @apply sm:ml-20 mt-10;
}
@media only screen and (min-width: 640px) {
  .pic {
    margin-top: -68px;
  }
}
.borderPic {
  border-radius: 49.9%;
  /* width: 160px; */
}
input {
  @apply rounded-md py-1 px-2
  md:text-xs lg:text-sm;
}
.box {
  @apply mt-2 sm:mt-5 w-full;
}
.title {
  @apply text-secondary;
}
.hamburger {
  color: #42a5f5;
  @apply cursor-pointer
  text-xl sm:text-2xl md:text-3xl;
}
.layout {
  @apply py-10 flex justify-start;
}
.object {
  @apply flex sm:text-sm self-center items-end;
}
</style>
