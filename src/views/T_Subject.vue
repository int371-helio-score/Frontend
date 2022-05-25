<template>
  <div class="bg-light w-full h-screen">
    <navTeacher />

    <div class="bg-white mt-10 mx-20 h-screen rounded-t-2xl">
      <div class="grid grid-cols-2 mx-10">
        <div class="mt-10 text-xl font-semibold">HELIO SCORE</div>
        <div class="mt-10 flex justify-end self-center text-seccondary">
          <p class="">ปีการศึกษา</p>
          <select v-model="selected" class=" ml-4 bg-white">
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
              <img :src="getPicture()" class="h-20 flex justify-center"/><br />
              <div>
                {{ subject.subjectCode }} {{ subject.subjectName }} <br />
              </div>
              <div class="classroom">
                <div>ชั้นมัธยมศึกษาปีที่ {{ subject.grade }}</div>
                <div class="mt-4">ทั้งหมด {{ totalRoom }} ห้องเรียน</div>
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
      url: "http://localhost:3000/api/helio/subject",
      subjects: null,
      totalRoom: "",
      academic: "http://localhost:3000/api/helio/academic",
      academics: [],
      picture: "",
      selected: "62812b3e40d44e57e4e24a34",
      term: [
      {
        name: 'Please Select an Option',
        id: ''
      }
    ]
    };
  },
  
  async created() {
    await this.getSubjects();
    await this.getAcademics();
    console.log(this.totalRoom);
    // this.selectTerm = this.academics[0];
    // this.selected = this.academics[0].id;
  },

  // computed:{
  //   selectedTerm() {
  //     var self = this,
  //         name = "";

  //     this.selectedTerm.filter(function(semester) {
  //       if(semester.id == self.selected) {
  //         name = semester.academicYear
  //         return;
  //       }
  //     })

  //     return name;
  //   }
  // },

  watch: {
    selected() {
      this.getSubjects();
      console.log(
        "selectTerm",
        this.selected.semester,
        "year",
        this.selected.academicYear
      );
    },
  },
  methods: {
    getSubjects() {
      console.log(this.selected);
      console.log(
        "from lodash",
        _.get(this.selected, "semester"),
        "year",
        _.get(this.selected, "academicYear")
      );
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
            console.log(res.data.data.total);
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

    async getAcademics() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/helio/academic",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        this.academics = response.data.data.results;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
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
label {
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
}
select {
  font-weight: 700;
  font-size: 18px;
  line-height: 29px;
}
</style>
