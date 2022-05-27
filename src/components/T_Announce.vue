<template>
  <div class="grid grid-cols-4 mt-20 mx-10 gap-8">
    <div v-for="score in scores" :key="score.id">
      <div
        class="content md:w-60 md:h-60 bg-white px-10 pt-10 pb-2 text-sm text-center"
      >
        <div class="stitle mb-5">{{}}</div>
        <div class="flex justify-center">
          <button class="md:w-36 md:h-24" id="custom-btn">ประกาศ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  methods: {},

  async created() {},
};
</script>
<style scoped>
#custom-btn {
  margin-top: 30px;
  display: block;
  height: 50px;
  outline: none;
  border-radius: 10px;
  color: #42a5f5;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  background: #ecf6fe;
}
.content {
  border: 3px solid #f7f7f7;
  border-radius: 10px;
}
.stitle {
  font-weight: 700;
  font-size: 18px;
  line-height: 29px;
  text-align: center;
}
</style>
