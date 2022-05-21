<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-full rounded-t-2xl">
      <div class="grid grid-cols-2 mx-10">
        <div class="mt-10 text-xl font-semibold">HELIO SCORE</div>
        <div class="mt-10 flex justify-end">
          <label>ปีการศึกษา</label>
          <select>
            <option
              v-for="semester in academics"
              :value="semester.academicYear"
              :key="semester.academicYear"
            >
              {{ semester.academicYear }}
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
      url: "http://localhost:5000/Subjects",
      subjects: [],
      academic: "http://localhost:5000/Academics",
      academics: [],
      picture: "",
      countClassroom: "",
    };
  },

  methods: {
    // async getSubjects() {
    //   try {
    //     const res = await fetch(this.url);
    //     const data = await res.json();
    //     return data;
    //   } catch (error) {
    //     console.log(`Could not get! ${error}`);
    //   }
    // },

    async getSubjects() {
      try {
        axios.get(`${this.url}/`).then((res) => {
          this.subjects = res.data;
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getPicture(picture) {
      return "http://localhost:5000/Subjects" + picture;
    },

    async getAcademics() {
      try {
        const respon = await fetch(this.academic);
        const data = await respon.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },

  async created() {
    await this.getSubjects();
    // this.subjects = await this.getSubjects();
    // this.academic = await this.getAcademics();
    // this.countClassroom = await this.Count();
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
