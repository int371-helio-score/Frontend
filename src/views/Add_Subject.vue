<template>
  <div class="bg-light h-screen">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-10 mx-5 divide-y divide-gray10">
          <div class="title" >เพิ่มวิชาที่สอน</div>

          <div class="my-5 pt-10 py-5">
            <form
              @submit.prevent="submitForm"
              class="bg-white rounded-lg lg:py-5 lg:px-48"
            >
              <div class="flex justify-start text-primary font-bold">
                รายระเอียดวิชา
              </div>

              <div class="grid grid-cols-2 mt-5">
                <div class="inputForm">
                  <p>ปีการศึกษา</p>
                  <input
                    class=""
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุปีการศึกษา"
                    v-model="academic"
                  />
                  <sup
                    v-show="inputAcademicYear"
                    class="text-red-500 flex justify-center mt-4"
                    >กรอกปีการศึกษา</sup
                  >
                </div>

                <div class="inputForm">
                  <p>ภาคการศึกษา</p>
                  <input
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุภาคการศึกษา"
                    v-model="semester"
                  />
                  <sup
                    v-show="inputSemester"
                    class="text-red-500 flex justify-center mt-4"
                    >กรอกภาคการศึกษา</sup
                  >
                </div>

                <div class="inputForm">
                  <p>รหัสวิชา</p>
                  <input
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุรหัสวิชา"
                    v-model="subjectId"
                  />
                   <sup
                    v-show="inputSubjectId"
                    class="text-red-500 flex justify-center mt-4"
                    >กรอกรหัสวิชา</sup
                  >
                </div>

                <div class="inputForm">
                  <p>ชื่อวิชา</p>
                  <input
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุปีการศึกษา"
                    v-model="subject"
                  />
                   <sup
                    v-show="inputSubjectName"
                    class="text-red-500 flex justify-center mt-4"
                    >กรอกชื่อวิชา</sup
                  >
                </div>

                <div class="inputForm">
                  <p>ชั้นปีที่</p>
                  <input
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุชั้นปีที่สอน"
                    v-model="grade"
                  />
                   <sup
                    v-show="inputClass"
                    class="text-red-500 flex justify-center mt-4"
                    >กรอกชั้นปี</sup
                  >
                </div>
              </div>

              <h3 class="flex justify-start text-primary font-bold mt-5">
                เพิ่มห้องเรียน
              </h3>

              <div class="my-2">ห้องเรียน</div>
              <div class="absolute w-1/3">
                <VueMultiselect
                  placeholder="กรุณากรอกห้องเรียนที่สอน (กรอกได้หลายห้อง)"
                  v-model="tags"
                  :multiple="true"
                  :options="tags"
                  :taggable="true"
                  @tag="addTag"
                />
              </div>
              <div class="flex justify-center">
                <button
                  class="px-16 py-2 mt-16 bg-primary rounded-md text-white"
                  @click="submitFrom"
                >
                  สร้าง
                </button>
              </div>
            </form>
          </div>

          <div class="bg-white"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueMultiselect from "vue-multiselect";
export default {
  components: {
    VueMultiselect,
  },
  data() {
    return {
      url: "https://helioscore.sytes.net/backend/api/helio",
      tags: [],
      inputSemester: false,
      inputAcademicYear: false,
      inputSubjectId: false,
      inputSubjectName: false,
      inputClass: false,
      inputRoom: false,
      semester: "",
      academic: "",
      subjectId: "",
      grade: "",
      subject: "",
    };
  },
  methods: {
    addTag(newTag) {
      this.tags.push(newTag);
    },

    submitFrom() {
      this.inputSemester = this.semester === "" ? true : false;
      this.inputAcademicYear = this.academic === "" ? true : false;
      this.inputSubjectId = this.subjectId === "" ? true : false;
      this.inputSubjectName = this.subject === "" ? true : false;
      this.inputClass = this.grade === "" ? true : false;
      this.inputRoom = this.tags === "" ? true : false;
      if (
        this.inputSemester ||
        this.inputAcademicYear ||
        this.inputSubjectId ||
        this.inputSubjectName ||
        this.inputClass ||
        this.inputRoom
      ) {
        return;
      }
      this.addSubject();
    },

    addSubject() {
      const formData = new FormData();
      let data = {
        semester: this.semester,
        grade: this.grade,
        subjectCode: this.subjectId,
        subjectName: this.subject,
        academicYear: this.academic,
        class: this.tags,
      };
      const json = JSON.stringify(data);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("data", blob);
      axios
        .post(`${this.url}/subject`, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            this.subject = "";
            this.subjectId = "",
            this.academic = "",
            this.semester = "",
            this.grade = "",
            this.tags = "",
            alert("เพิ่มวิชาสำเร็จ");
            return this.$router.push("/helioscore");
          }
          // alert("Error");
        })
        .catch((err) => {
          alert(err.res.data.message);
        })
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
}
select {
  font-weight: 700;
  line-height: 29px;
  @apply md:text-base;
}
.title {
  @apply text-sm font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.semes {
  @apply text-secondary text-xs
md:text-base;
}
.data {
  @apply md:pl-40 mt-24 w-screen lg:pl-60;
}
input {
  @apply border border-gray50 rounded-md px-2 py-1 pt-1;
}
.inputForm {
  @apply my-1;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
