<template>
  <div class="bg-light h-screen">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-10 mx-5 divide-y divide-gray10">
          <div class="title">
            เพิ่มห้องเรียน ชั้นมัธยมศึกษาปีที่ {{ grade }}
          </div>

          <div class="my-5 pt-10 py-5">
            <div class="bg-white rounded-lg py-5 xl:px-52 md:px-20 h-96">
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
              <sup
                v-show="inputRoom"
                class="text-red-500 flex justify-center mt-4"
              >
                กรุณาระบุห้องเรียนที่ต้องการเพิ่ม
              </sup>

              <div class="flex justify-center">
                <button
                  @click="checkInput()"
                  class="px-16 py-2 mt-32 bg-primary rounded-md text-white"
                >
                  สร้าง
                </button>
              </div>
            </div>
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
  name: "ClassInSubject",
  props: ["subjectName", "subject", "grade"],

  data() {
    return {
      tags: [],
      inputRoom: false,
      url: "helio/subject",
      urlClass: "helio/class",
      subjectId: null,
      classroom: [],
      classId: null,
    };
  },

  created() {
  },

  methods: {
    addTag(newTag) {
      this.tags.push(newTag);
    },

    checkInput() {
      this.inputRoom = this.tags === "" ? true : false;
      if (this.inputRoom) {
        return;
      }
      this.addClassroom();
    },

    addClassroom() {
      console.log("Hi");
      console.log(this.inputRoom);
      let data = {
        class: this.tags,
        subjectId: this.subject,
      };
      axios
        .post(this.urlClass, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            this.tags = "";
            alert("เพิ่มห้องเรียนสำเร็จ");
            // this.$router.go(1);
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
