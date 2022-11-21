<template>
  <div class="background sm:h-screen h-full">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data w-screen">
        <div class="divide-y divide-gray10">
          <div class="title">เพิ่มวิชาที่สอน</div>

          <div class="flex justify-center mt-5 pt-5 md:pt-10 lg:py-5">
            <div class="">
              <form
                @submit.prevent="submitForm"
                class="rounded-lg md:text-sm bg-white mb-10 py-5 lg:px-40 md:px-20 sm:px-10 px-2"
              >
                <div class="flex justify-start text-primary font-bold">
                  รายระเอียดวิชา
                </div>

                <div class="grid sm:grid-cols-2 mt-2">
                  <div class="inputForm">
                    <label>ปีการศึกษา</label>
                    <input
                      type="number"
                      name="academic"
                      placeholder="กรุณาระบุปีการศึกษา"
                      v-model="academic"
                      maxlength="4"
                    />
                    <sup v-show="inputAcademicYear" class="text-red-500 mt-4"
                      >กรอกปีการศึกษา</sup
                    >
                  </div>

                  <div class="inputForm">
                    <label>ภาคการศึกษา</label>
                    <input
                      type="text"
                      name="academic"
                      placeholder="กรุณาระบุภาคการศึกษา"
                      v-model="semester"
                    />
                    <sup v-show="inputSemester" class="text-red-500 mt-4"
                      >กรอกภาคการศึกษา</sup
                    >
                  </div>

                  <div class="inputForm">
                    <label>รหัสวิชา</label>
                    <input
                      type="text"
                      name="academic"
                      placeholder="กรุณาระบุรหัสวิชา"
                      v-model="subjectId"
                    />
                    <sup v-show="inputSubjectId" class="text-red-500 mt-4"
                      >กรอกรหัสวิชา</sup
                    >
                  </div>

                  <div class="inputForm">
                    <label>ชื่อวิชา</label>
                    <input
                      type="text"
                      name="academic"
                      placeholder="กรุณาระบุปีการศึกษา"
                      v-model="subject"
                    />
                    <sup v-show="inputSubjectName" class="text-red-500 mt-4"
                      >กรอกชื่อวิชา</sup
                    >
                  </div>

                  <div class="inputForm">
                    <label>ชั้นปีที่</label>
                    <input
                      type="text"
                      name="academic"
                      placeholder="กรุณาระบุชั้นปีที่สอน"
                      v-model="grade"
                    />
                    <sup v-show="inputClass" class="text-red-500 mt-4"
                      >กรอกชั้นปี</sup
                    >
                  </div>
                </div>

                <h3 class="flex justify-start text-primary font-bold mt-5">
                  เพิ่มห้องเรียน
                </h3>

                <div class="my-2">ห้องเรียน</div>
                <div class="w-full">
                  <VueMultiselect
                    placeholder="กรุณากรอกห้องเรียนที่สอน (กรอกได้หลายห้อง)"
                    v-model="tags"
                    :multiple="true"
                    :options="tags"
                    :taggable="true"
                    @tag="addTag"
                  />
                  <sup v-show="inputRoom" class="text-red-500 mt-4"
                    >กรุณากรอกห้องเรียน</sup
                  >
                </div>

                <div class="flex justify-center">
                  <button
                    class="px-16 py-2 mt-5 bg-primary rounded-md text-white"
                    @click="submitFrom"
                  >
                    สร้าง
                  </button>
                </div>
              </form>
            </div>
          </div>
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
      url: "helio",
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
      // this.inputRoom = this.tags.length == 0 ? true : false;
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
            (this.subjectId = ""),
              (this.academic = ""),
              (this.semester = ""),
              (this.grade = ""),
              (this.tags = ""),
              alert("เพิ่มวิชาสำเร็จ");
            return this.$router.push("/helioscore");
          }
        })
        .catch((err) => {
          alert(err.res.data.message);
        });
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 400;
  font-size: 18px;
  /* line-height: 29px; */
  @apply md:text-sm text-xs lg:text-base items-end flex pb-1;
}
select {
  font-weight: 700;
  line-height: 29px;
  @apply md:text-base;
}
.data {
  @apply w-screen px-4
  sm:px-10 sm:pt-8 
  md:pt-0 md:pl-10 mt-20
  lg:pl-60 lg:mt-24;
}
.title {
  @apply text-base font-bold mt-5 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.semes {
  @apply text-secondary text-xs
md:text-base;
}
input {
  @apply border border-gray50 rounded-md px-2 py-1;
}
.inputForm {
  @apply my-1 grid grid-rows-2 mx-2;
}
sup {
  @apply flex justify-end;
}
.background {
  background: #ecf6fe;
  /* background-size: cover;
  width: 100vw;
  height: 100vh; */
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
