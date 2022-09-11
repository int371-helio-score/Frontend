<template>
  <div class="bg-light h-screen">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-10 mx-5 divide-y divide-gray10">
          <div class="title">
            เพิ่มห้องเรียน ชั้นมัธยมศึกษาปีที่ {{ subjectName }}
          </div>

          <div class="my-5 pt-10 py-5">
            <form class="bg-white rounded-lg py-5 px-52 h-96">
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
                <button @click="addClassroom()"
                  class="px-16 py-2 mt-32 bg-primary rounded-md text-white"
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
  name: "ClassInSubject",
  props: ["subjectName", "subject", "grade"],

  data() {
    return {
      tags: [],
      inputRoom: false,
      url: "http://localhost:3000/api/helio/subject",
      urlClass: "http://localhost:3000/api/helio/class",
      subjectId: null,
      classroom: [],
      classId: null,
    };
  },
  async created() {
    this.subjectId = this.$route.params.subject;
    this.classId = this.$route.params.grade;
    console.log(this.subjectName)
    console.log(this.subject)
  },

  methods: {
    addTag(newTag) {
      this.tags.push(newTag);
    },

    checkInput() {
      this.inputRoom = this.tags === " " ? true : false;
      if (this.inputRoom) {
        return this.addClassroom();
      }
    },

    addClassroom() {
      let data = {
        class: this.tags,
        subjectId: this.subjectId,
        // grade: this.classId,
      };
      axios
        .post(this.url, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            (this.tags = ""), alert("เพิ่มห้องเรียนสำเร็จ");
            return this.$router.go();
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
