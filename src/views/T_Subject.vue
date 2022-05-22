<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-full rounded-t-2xl">
      <div class="grid grid-cols-2 mx-10">
        <div class="mt-10 text-xl font-semibold">HELIO SCORE</div>
        <div class="mt-10 flex justify-end">
          <label>ปีการศึกษา</label>
          <select class="w-48" v-model="selectTerm">
            <option
              v-for="semester in academics"
              :value="semester"
              :key="semester._id"
            >
              {{ semester.semester }} / {{ semester.academicYear }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb"></div>

      <div class="grid grid-cols-5 mt-20 mx-10 gap-8">
        <div v-for="subject in subjects" :key="subject.subject_id">
          <router-link
            :to="{
              name: 'class',
              params: {
                subjectName: subject.subjectName,
                classId: subject.grade,
              },
              query: { subjectId: subject.subject_id, classId: subject.grade },
            }"
          >
            <div class="subject bg-white px-10 pt-10 py-2 text-sm text-center">
              <div><img :src="getPicture(subject.picture)" /><br /></div>
              <div>
                {{ subject.subjectCode }} {{ subject.subjectName }} <br />
              </div>
              <div class="classroom">
                <div>ชั้นมัธยมศึกษาปีที่ {{ subject.grade }}</div>
                <div class="mt-4">ห้องเรียน</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // url: "http://localhost:3000/api/helio/subject",
      url: " http://localhost:5000/Subjects",
      subjects: [],
      academic: "http://localhost:3000/api/helio/academic",
      academics: [],
      picture: "",
      selectTerm: null,
    };
  },
  watch: {
    selectTerm() {
      this.getSubjects();
    },
  },
  methods: {
    getSubjects() {
      try {
        axios
          .get(this.url, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            params: {
              semester: this.selectTerm.semester,
              academicYear: this.selectTerm.academicYear,
            },
          })
          .then((res) => {
            console.log(res.data);
            this.subjects = res.data;
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getPicture(picture) {
      return "http://localhost:3000/Subjects" + picture;
    },

    async getAcademics() {
      try {
        axios
          .get(this.academic, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res.data.data.results);
            this.academics = res.data.data.results;
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },

  async created() {
    await this.getSubjects();
    await this.getAcademics();
  },
};
</script>

<style scoped>
.subject {
  border: 3px solid #f7f7f7;
  border-radius: 10px;
  @apply xl:justify-center;
}
.classroom {
  color: #797979;
}
</style>
