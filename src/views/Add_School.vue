<template>
  <div class="bg-light h-screen">
    <div
      class="bg-white grid grid-cols-2 sm:py-5 sm:px-10 px-1 py-4 fixed lg:w-full w-screen"
    >
      <div class="flex self-center items-center">
        <div class="md:text-xl font-bold ml-5 text-secondary">HELIOSCORE</div>
      </div>

      <div class="flex justify-end">
        <div class="grid grid-flow-col gap-x-5">
          <div class="dropbtn sm:flex items-center border border-light hidden">
            <img :src="getImage()" class="profile rounded-full" />
            <div class="ml-4 account text-secondary">
              {{ this.account.firstName }} {{ this.account.lastName }}
            </div>
          </div>
          <div
            class="dropbtn rounded-sm flex items-center border broder-light cursor-pointer"
          >
            <a href="#" @click="logout()" class="px-2 lg:text-base md:text-sm text-xs">ออกจากระบบ</a>
          </div>
        </div>
      </div>
    </div>

    <div class="inline-flex">
      <div class="data">
        <div class="sm:mx-10 mx-5">
          <div class="title flex justify-center">กรุณาเลือกโรงเรียน</div>

          <div class="md:my-5 py-5">
            <div class="sm:bg-white rounded-lg py-5 sm:pb-14 lg:px-10">
              <div class="flex justify-center mt-10">
                <span class="material-symbols-outlined self-center text-primary mr-2 ">
                  school
                </span>
                <v-select
                  class="select bg-white md:w-3/5 w-4/5 placeholder-opacity-60 placeholder-gray-400 md:text-sm text-sm lg:text-base"
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
              <sup
                v-show="inputSchool"
                class="text-red-500 flex justify-center mt-4"
              >
                กรุณาเลือกโรงเรียน
              </sup>
              <div class="flex justify-center">
                <button
                  @click="addSchool"
                  class="md:px-10 px-12 lg:px-16 lg:mt-8 md:py-2 py-1 mt-4 bg-primary rounded-md text-white lg:text-base md:text-sm text-xs "
                >
                  ต่อไป
                </button>
              </div>
            </div>
          </div>
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
      account: [],
      getInfoUrl: "helio/account/info",
      addSchoolUrl: "helio/account/school",
      getSchoolUrl: "helio/school",
      school: "",
      test: "",
      schools: [],
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  methods: {
    async getAccount() {
      try {
        const response = await axios.get(this.getInfoUrl, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        this.account = response.data.data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    async getSchool() {
      axios
        .get(this.getSchoolUrl, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.schools = response.data.data.results;
        });
    },
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },
    getImage() {
      return this.account.image;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("school");
      return this.$router.push("/");
    },

    async addSchool() {
      let data = {
        schoolId: this.test,
      };

      axios
        .patch(this.addSchoolUrl, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            localStorage.removeItem("school");
            return this.$router.push("/helioscore");
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  async created() {
    await this.getAccount();
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
  @apply text-base font-bold mt-20 text-secondary
  lg:text-xl lg:font-semibold
  md:mt-10 md:text-lg md:font-bold;
}
.semes {
  @apply text-secondary text-xs
md:text-base;
}
.data {
  @apply lg:px-40 xl:px-56 md:px-32 mt-24 w-screen;
}
input {
  @apply border border-gray50 rounded-md px-2 py-1 pt-1;
}
.inputForm {
  @apply my-1;
}
.profile {
  @apply lg:w-10 lg:h-10 sm:w-9 sm:h-9 w-8 h-8;
}
.dropbtn {
  @apply px-4 py-2 rounded-md;
  padding: 4px;
  /* font-size: 16px; */
}
</style>
