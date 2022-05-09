<template>
  <div class="bg-light">
    <div class="grid grid-cols-2 gap-4 h-screen">
      <div>01</div>

      <div>
        <div
          class="
            bg-white
            mr-80
            my-20
            h-3/4
            rounded-2xl
            shadow-2xl shadow-babyblue
          "
        >
          <div
            class="pt-20 text-xl font-bold text-blue-700 justify-center flex"
          >
            <H1>เข้าสู่ระบบ</H1>
          </div>

          <div class="pt-2">
            <div class="flex justify-center mt-20">
              <input
                type="text"
                placeholder="อีเมล"
                class="border-b border-babyblue"
              />
            </div>
            <div class="flex justify-center mt-10">
              <input
                type="text"
                placeholder="รหัสผ่าน"
                class="border-b border-babyblue"
              />
            </div>
          </div>

          <div class="flex justify-center mt-20" @click="login">
            <button class="bg-primary rounded-md w-40 justify-center flex">
              <p class="text-white">เข้าสู่ระบบ</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // helio: "http://localhost:3000/helioscore"
    };
  },

  methods: {
    async login() {
      return this.$router.push("/helioscore");
    },
  },
};
</script>

<style scoped>
::placeholder {
  color: #b3dbfb;
}
</style>
