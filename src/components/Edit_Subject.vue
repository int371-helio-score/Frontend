<template>
  <div name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container relative">
          <img src="../../src/assets/Background.png" class="w-full relative" />
          <p class="flex justify-center font-bold text-secondary">
            แก้ไขรายละเอียดวิชา
          </p>
          <div class="flex justify-center my-5 text-secondary">
            <div class="grid grid-cols-2 lg:gap-y-4">
              <div class="box">
                <p class="title">รหัสวิชา</p>
                <input v-model="subjects.subjectCode" />
              </div>

              <div class="box">
                <p>ชื่อวิชา</p>
                <input v-model="subjects.subjectName" />
              </div>

              <div class="box">
                <p>ชั้นมัธยมศึกษาปีที่</p>
                <input v-model="subjects.grade" />
              </div>

              <div class="box">
                <p>ภาคการศึกษา</p>
                <!-- {{this.term.semester}} -->
                <input v-model="this.term" type="text" />
              </div>

              <div class="box">
                <p>ปีการศึกษา</p>
                <input v-model="this.academic" type="number" />
              </div>
            </div>
          </div>

          <div class="flex justify-center place-content-end mt-12">
            <div class="absolute bottom-8 grid grid-cols-2 gap-4">
              <button
                class="bg-light text-secondary2 border border-secondary2 rounded-md px-6 py-1 ml-2"
                @click="cancel()"
              >
                ออก
              </button>
              <button
                class="bg-secondary2 text-white rounded-md px-6 py-1 ml-2"
                @click="submitForm()"
              >
                บันทึก
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
  props: {
    editComp: {
      type: Object,
    },
  },
  data() {
    return {
      url: "helio/subject",
      urlSubject: "helio/academic",
      subjects: null,
      term: null,
      academic: null,
    };
  },

  methods: {
    cancel() {
      this.$emit("showEditModal");
    },

    async getTerm() {
      try {
        const response = await axios.get(
          `${this.urlSubject}/${this.subjects._id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        this.term = response.data.data.results.semester;
        this.academic = response.data.data.results.academicYear;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    info() {
      this.newSubjectCode = this.subjects.subjectCode;
    },

    submitForm() {
      var data = {
        subjectId: this.subjects._id,
        subjectCode: this.subjects.subjectCode,
        subjectName: this.subjects.subjectName,
        grade: this.subjects.grade,
        academicYear: this.term.academicYear,
        semester: this.term.semester.toString(),
      };
      axios
        .patch(this.url, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            alert("แก้ไขคะแนนสำเร็จ");
            this.$emit("showEditModal");
            this.$router.go();
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },

  async created() {
    this.subjects = this.editComp;
    await this.getTerm();
  },
};
</script>

<style scoped>
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
  overflow-y: auto;
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
input {
  color: black;
  @apply border px-2 py-1 rounded-md;
}
.box {
  @apply lg:mx-5;
}
</style>
