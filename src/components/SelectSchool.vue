<template>
  <div class="flex justify-center mt-10">
    <span class="material-symbols-outlined self-center"> school </span>
    <v-select
      class="select lg:w-56 placeholder-opacity-60 placeholder-gray-400"
      placeholder="กรุณาเลือกโรงเรียน"
      label="schoolName"
      v-model="test"
      :filterable="false"
      :options="paginated"
      :reduce="(school) => school.schoolId"
      @open="onOpen"
      @close="onClose"
      @search="(query) => (school = query)"
    >
      <template #list-footer>
        <li v-show="hasNextPage" ref="load" class="loader">
          Loading more options...
        </li>
      </template>
    </v-select>
  </div>

  <div class="flex justify-center lg:mt-10">
    <button class="bg-primary rounded text-white lg:text-base lg:px-2 lg:py-1">
      ถัดไป
    </button>
  </div>

  <div class="flex justify-center mt-10 md:text-sm text-xs">
    <p class="inline-block text-gray100">หากคุณเป็นสมาชิกใหม่</p>
    <p class="inline-block text-primary underline">
      <a href="/helioscore/signup"> สร้างบัญชี</a>
    </p>
    <p class="inline-block text-gray100">ที่นี่</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      urlSchool: "helio/school",
      url: "helio",
      school: "",
      schools: [],
    };
  },

  methods: {
    async getSchool() {
      axios
        .get(this.urlSchool, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.schools = response.data.data.results;
        });
    },

    // addSchool() {
    //   const formData = new FormData();
    //   let data = {
    //     schoolId: this.test,
    //   };
    //   const json = JSON.stringify(data);
    //   const blob = new Blob([json], {
    //     type: "application/json",
    //   });
    //   formData.append("data", blob);
    //   axios
    //     .post(`${this.url}/account/register`, data, {
    //       headers: {
    //         Authorization: localStorage.getItem("token"),
    //       },
    //     })
    //     .then((res) => {
    //       if (res.data.statusCode === 200) {
    //         localStorage.setItem("token", res.data.data.token);
    //         return (
    //           this.$router.push("/helioscore") && alert("สร้างบัญชีสำเร็จ")
    //         );
    //       }
    //     })
    //     .catch((err) => {
    //       alert(err.response.data.message);
    //     });
    // },

    checkSelectSchool() {},
  },

  async created() {
    await this.getSchool();
  },

  computed: {
    filtered() {
      return this.schools.filter((results) => {
        return results.schoolName
          .toLocaleLowerCase()
          .includes(this.school.toLocaleLowerCase());
      });
    },
    paginated() {
      return this.filtered.slice(0, this.limit);
    },
    hasNextPage() {
      return this.paginated.length < this.filtered.length;
    },
  },
};
</script>

<style scoped>
span {
  color: #b3dbfb;
  @apply xl:mr-1 xl:text-base;
}
</style>
