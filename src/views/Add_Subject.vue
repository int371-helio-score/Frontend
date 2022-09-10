<template>
  <div class="bg-light h-screen">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-10 mx-5 divide-y divide-gray10">
          <div class="title">เพิ่มวิชาที่สอน</div>

          <div class="my-5 pt-10 py-5">
            <form class="bg-white rounded-lg py-5 px-52">
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
                  />
                </div>

                <div class="inputForm">
                  <p>ภาคการศึกษา</p>
                  <input
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุภาคการศึกษา"
                  />
                </div>

                <div class="inputForm">
                  <p>รหัสวิชา</p>
                  <input
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุรหัสวิชา"
                  />
                </div>

                <div class="inputForm">
                  <p>ชื่อวิชา</p>
                  <input
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุปีการศึกษา"
                  />
                </div>

                <div class="inputForm">
                  <p>ชั้นปี</p>
                  <input
                    type="text"
                    name="academic"
                    placeholder="กรุณาระบุชั้นปีที่สอน"
                  />
                </div>
              </div>

              <h3 class="flex justify-start text-primary font-bold mt-5">
                เพิ่มห้องเรียน
              </h3>

              <div class="my-2">ห้องเรียน</div>
              <div class="absolute w-96">
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
                  class="px-16 py-2 mt-8 bg-primary rounded-md text-white"
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
import VueMultiselect from "vue-multiselect";
export default {
  components: {
    VueMultiselect,
  },
  data() {
    return {
      tags: [],
      inputSemester: false,
      inputAcademicYear: false,
      inputId: false,
      inputSubjectName: false,
      inputClass: false,
      inputRoom: false,
      semester: "",
      academic: "",
      id: "",
      class: "",
      room: "",
      subject: "",
    };
  },
  methods: {
    addTag(newTag) {
      this.tags.push(newTag);
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
  @apply pl-60 mt-24 w-screen;
}
input {
  @apply border border-gray50 rounded-md px-2 py-1 pt-1;
}
.inputForm {
  @apply my-1;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
