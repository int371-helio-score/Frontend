<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-full">
      <div class="grid grid-cols-2">
        <div>
          <h1>HELIO SCORE</h1>
        </div>
        <div>
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

      <div class="grid grid-cols-5 mt-20 mx-10 gap-8" @click="openSubject">
        <div
          class="bg-white border px-10 py-10 text-sm"
          v-for="subject in subjects"
          :key="subject.id"
        >
          <router-link
            :to="{
              name: 'class',
              paeams: { classId: subject.subjectId },
            }"
          >
            {{ subject.subjectCode }} {{ subject.subjectName }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "http://localhost:5000/Subjects",
      subjects: [],
      academic: "http://localhost:5000/Academics",
      academics: [],
    };
  },

  methods: {
    async getSubjects() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
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

    openSubject() {},
  },

  async created() {
    this.subjects = await this.getSubjects();
    this.academic = await this.getAcademics();
  },
};
</script>