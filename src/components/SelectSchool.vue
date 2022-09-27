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
  <div class="flex justify-center">
    <button class="bg-primary rounded text-white">ถัดไป</button>
  </div>
</template>

<script>
export default {
    data(){
      return{

      }
    }

}
</script>

<style scoped>
span {
  color: #b3dbfb;
  @apply xl:mr-1 xl:text-base;
}
</style>
