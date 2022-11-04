<template>
    <div name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container relative">
            <img src="../../src/assets/Background.png" class="w-full relative" />
            <!-- <div>
              <div class="mx-20 mt-5 flex justify-center">
                <p class="text-secondary font-bold my-2">
                  แก้ไขคะแนน {{ scores.title }}
                </p>
              </div>
  
              <div
                v-for="student in scores.scores"
                :key="student.no"
                class="lg:mx-32 my-4 flex justify-between items-center"
              >
                <div class="">เลขที่   {{ student.no }}</div>
                {{ student.firstName }} {{ student.lastName }}
                <input
                  v-model="student.score"
                  class="border px-2 py-1"
                />
              </div>
            </div> -->
  
            <div class="flex justify-center place-content-end mt-12">
              <div class="absolute bottom-8 grid grid-cols-2 gap-4">
                <button
                  class="bg-light text-secondary2 border border-secondary2 rounded-md px-6 py-1 ml-2"
                  @click="cancel()"
                >
                  ออก
                </button>
                <button
                  class="bg-secondary2 text-white rounded-md px-6 py-1 ml-2"
                  @click="submitForm()"
                >
                  บันทึก
                </button>
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
    props: {
      scoreComp: {
        type: Object,
      },
    },
    data() {
      return {
        newScore: "",
        firstname: null,
        lastname: null,
        title: null,
        scores: [],
        score: [],
        url: "helio/score",
      };
    },
  
    methods: {
      cancel() {
        this.$emit("showEdit");
      },
  
      submitForm() {
        let student = [];
        for (const each of this.scores.scores) {
          let obj = {
            studentId: each.studentId,
            score: each.score,
          };
          student.push(obj);
        }
        var data = {
          scoreId: this.scores._id,
          std: student,
        };
        axios
          .patch(this.url, data, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.statusCode === 200) {
              alert("แก้ไขคะแนนสำเร็จ");
              this.$emit("showEdit");
            }
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      },
    },
  
    created() {
      this.scores = this.scoreComp;
    },
  };
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 721px;
    height: 531px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 25px;
    overflow-y: auto;
    @apply w-3/4 md:w-96 lg:w-1/2;
  }
  
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  
  .modal-body {
    margin: 20px 0;
  }
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  </style>
  