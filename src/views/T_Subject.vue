<template>
  <div class="bg-light h-screen">
    <navTeacher />

    <div class="bg-white data">
      <div class="grid grid-cols-2 sm:mx-10 mx-5">
        <div class="title">HELIO SCORE</div>
        <div class="semes">
          <p >ปีการศึกษา</p>
          
          <select v-model="selected" class="ml-1 md:ml-4 bg-white">

            <option
              v-for="semester in academics"
              :key="semester"
              :value="semester"
            >
              {{ semester.semester }} / {{ semester.academicYear }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb"></div>

      <div class="order">
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
            <div class="subject bg-white text-center px-10 py-2">
              <img :src="getPicture()" class="flex justify-center" /><br />
              <div>
                {{ subject.subjectCode }} {{ subject.subjectName }} <br />
              </div>
              <div class="classroom">
                <div>ชั้นมัธยมศึกษาปีที่ {{ subject.grade }}</div>
                <div class="mt-4">{{ subject.totalClass }} ห้องเรียน</div>
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
import _ from "lodash";

export default {
  data() {
    return {
      url: "https://helioscore.sytes.net/backend/api/helio/subject",
      subjects: null,
      totalRoom: "",
      academic: "https://helioscore.sytes.net/backend/api/helio/academic",
      academics: [],
      picture: "",
      selected: "",
      term: [
        {
          name: "Please Select an Option",
          id: "",
        },
      ],
    };
  },

  async created() {
    await this.getSubjects();
    await this.getAcademics();
  },

  watch: {
    selected() {
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
              semester: _.get(this.selected, "semester"),
              academicYear: _.get(this.selected, "academicYear"),
            },
          })
          .then((res) => {
            this.subjects = res.data.data.results;
            this.totalRoom = res.data.data.total;
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getPicture() {
      return "https://helioscore.sytes.net/backend/public/images/pic1.png";
    },

    async getAcademics() {
      try {
        const response = await axios.get(
          "https://helioscore.sytes.net/backend/api/helio/academic",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        this.academics = response.data.data.results;
        this.selected = this.academics[0];
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },
};
</script>

<style scoped>
img {
  @apply h-28 lg:h-auto
  sm:pl-10 md:pl-0;
}
.subject {
  border: 3px solid #f7f7f7;
  border-radius: 10px;
  @apply justify-center text-xs
  lg:text-sm 
  md:px-5 md:py-2
  ;
}
.classroom {
  color: #797979;
}
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
.order {
  @apply grid mx-10 mt-10 gap-4 justify-center
  xl:grid-cols-5 xl:gap-8
  lg:grid-cols-4 lg:gap-10 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-2;
}
.title {
  @apply text-sm font-bold mt-5
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.semes {
  @apply flex justify-end self-center text-seccondary mt-5 text-xs
  md:mt-10 md:text-base;
}
.data{
  @apply rounded-md mx-1 mt-5 h-fit
  md:mt-10 md:mx-20 md:h-fit md:pb-14 md:rounded-2xl;
}
</style>
