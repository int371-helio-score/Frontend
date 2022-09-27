<template>
  <div class="bg-light h-screen">
    <navTeacher />
    <div class="inline-flex">
      <sidebarTeacher />

      <div class="data">
        <div class="sm:mx-10 mx-5 divide-y divide-gray10">
          <div class="title">หน้าหลัก</div>

          <div class="my-5 pt-10 py-5 grid grid-cols-2">
            <div class="flex justify-start">
              <p>วิชาทั้งหมด</p>
            </div>

            <div class="semes flex justify-end">
              <p>ปีการศึกษา</p>
              <select
                v-model="selected"
                class="ml-1 md:ml-4 bg-light text-secondary"
              >
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
        </div>

        <div class="order">
          <div v-for="subject in subjects" :key="subject.subject_id">
            <router-link
              :to="{
                name: 'class',
                params: {
                  subjectName: subject.subjectName,
                  classId: subject.grade,
                },
                query: {
                  subjectId: subject.subject_id,
                  classId: subject.grade,
                },
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
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import SidebarTeacher from "@/components/SidebarTeacher.vue";

export default {
  components: { SidebarTeacher },
  data() {
    return {
      url: "helio/subject",
      subjects: null,
      totalRoom: "",
      academic: "helio/academic",
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
    await this.getAcademics();
  },

  watch: {
    selected() {
      this.getSubjects();
    },
  },
  methods: {
    async getAcademics() {
      try {
        const response = await axios.get(
          "helio/academic",
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
      return "http://localhost:3000/public/images/pic1.png";
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
  md:px-5 md:py-2;
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
  @apply grid mx-10 gap-4 justify-center
  xl:grid-cols-5 xl:gap-8
  lg:grid-cols-4 lg:gap-10 lg:mb-20
  md:grid-cols-3 md:gap-4
  sm:grid-cols-1;
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
  @apply pl-36 sm:pl-36 w-screen
  md:pl-44 mt-20
  lg:pl-60 lg:mt-24 
  ;
}
</style>
