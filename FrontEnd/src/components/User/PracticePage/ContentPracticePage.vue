<template>
  <!-- Giao diện trong phần Practice -->
  <div>
    <!-- Intro page -->
    <div class="bg-primaryMediumBlue">
      <div class="mx-4 md:mx-12 lg:mx-16 xl:mx-32 flex flex-col md:flex-row">
        <div class="flex justify-center items-center flex-1 text-center p-4">
          <div>
            <h1 class="text-black text-4xl font-bold">Platform</h1>
            <h1 class="text-primaryBlue text-4xl font-bold">
              Learn English Online
            </h1>
            <h1 class="text-black text-4xl font-bold">Easy and Useful</h1>
          </div>
        </div>
        <div class="flex-1 text-center py-8 md:py-20">
          <div>
            <img
              src="../../../assets/images/introstudy.svg"
              alt=""
              class="mx-auto my-auto"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Practice skills items -->
    <div>
      <div
        class="bg-primaryLightBlue left-1/2 transform -translate-x-1/2 rounded-3xl relative mt-[-20px] shadow-[10px_15px_20px_-15px_rgba(0,0,0,0.8)] w-full md:w-1/2"
      >
        <!-- Thanh ngang 4 items: ALL skill, Reading, Listening, Writing -->
        <div
          class="p-6 flex flex-wrap items-center justify-around md:flex-row flex-col"
        >
        <div
            class="flex items-center space-x-4 cursor-pointer mt-4 md:mt-8 lg:mt-0 md:w-1/2 lg:w-auto"
          >
            <img
              src="../../../assets/images/bookstack.png"
              alt=""
              class="w-10 h-10"
            />
            <h2 class="ml-6 font-bold">All Skills</h2>
          </div>
          <div
            class="flex items-center space-x-4 cursor-pointer mt-4 md:mt-8 lg:mt-0 md:w-1/2 lg:w-auto"
          >
            <img
              src="../../../assets/images/book.png"
              alt=""
              class="w-10 h-10"
            />
            <h2 class="ml-6 font-bold">Reading</h2>
          </div>
          <div
            class="flex items-center space-x-4 cursor-pointer mt-4 md:mt-8 lg:mt-0 md:w-1/2 lg:w-auto"
          >
            <img
              src="../../../assets/images/headphones.png"
              alt=""
              class="w-10 h-10"
            />
            <h2 class="ml-6 font-bold">Listening</h2>
          </div>
          <div
            class="flex items-center space-x-4 cursor-pointer mt-4 md:mt-8 lg:mt-0 md:w-1/2 lg:w-auto"
          >
            <img
              src="../../../assets/images/pen.png"
              alt=""
              class="w-10 h-10"
            />
            <h2 class="ml-6 font-bold">Writing</h2>
          </div>
        </div>

        <!-- Bộ đề Reading -->
        <div class="px-4 md:px-8 lg:px-12">
          <!-- Phần Reading -->
          <div
            class="bg-white rounded-2xl p-2 md:p-4 lg:p-5 mt-4 mb-5 xl:mb-8"
          >
            <div class="flex flex-wrap relative">
              <div
                class="cursor-pointer w-full md:w-28 mb-5 md:mb-0 max-h-60 mr-5 overflow-hidden flex justify-center items-center"
              >
                <img
                  src="../../../assets/images/TOEICReading.jpg"
                  alt=""
                  class="object-cover min-h-full w-full"
                />
              </div>
              <div class="flex-1 overflow-hidden flex items-start">
                <div class="flex-1">
                  <div class="cursor-pointer inline-block">
                    <h4
                      class="pt-1 text-xl font-bold mb-1 multiline-ellipsis ml-0"
                    >
                      <strong
                        class="mr-2 min-w-max bg-red text-white rounded-md text-sm py-1 px-2 font-semibold"
                      >
                        <img
                          class="mr-0.5 -mt-0.5 inline w-3"
                          src="../../../assets/images/flame.png"
                          alt=""
                        />
                        HOT
                      </strong>
                      The newest set TOEIC Reading exam !!!
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-wrap mt-5 -mx-2.5 items-stretch"
            >
            <div class="w-full sm:w-6/12 xl:w-4/12 p-2.5" v-for="exam in examStore.filteredExam('Listening')"
              :key="exam.examID">
                <div
                  class="border-2 border-none rounded-2xl p-5 flex items-center cursor-pointer"
                >
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-100 bg-blue-50"
                  >
                    <img src="../../../assets/images/book.png" alt="" />
                  </div>
                  <div class="flex-1 ml-3 overflow-hidden">
                    <h4 class="font-bold text-clip md:truncate">
                      Smart Reading - 1
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--Phần Listening -->
          <div
            class="bg-white rounded-2xl p-5 mt-4 mb-5 xl:mb-8"
          >
            <div class="flex flex-wrap relative">
              <div
                class="cursor-pointer w-full md:w-28 mb-5 md:mb-0 max-h-60 mr-5 overflow-hidden flex justify-center items-center"
              >
                <img
                  src="../../../assets/images/TOEICListening.jpg"
                  alt=""
                  class="object-cover min-h-full w-full"
                />
              </div>
              <div class="flex-1 overflow-hidden flex items-start">
                <div class="flex-1">
                  <div class="cursor-pointer inline-block">
                    <h4
                      class="pt-1 text-xl font-bold mb-1 multiline-ellipsis ml-0"
                    >
                      <strong
                        class="mr-2 min-w-max bg-red text-white rounded-md text-sm py-1 px-2 font-semibold"
                      >
                        <img
                          class="mr-0.5 -mt-0.5 inline w-3"
                          src="../../../assets/images/flame.png"
                          alt=""
                        />
                        HOT
                      </strong>
                      The newest set TOEIC Reading exam !!!
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-wrap mt-5 -mx-2.5 items-stretch"
            >
            <div class="w-full sm:w-6/12 xl:w-4/12 p-2.5">
                <div
                  class="border-2 border-none rounded-2xl p-5 flex items-center cursor-pointer"
                >
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-100 bg-blue-50"
                  >
                    <img src="../../../assets/images/headphones.png" alt="" />
                  </div>
                  <div class="flex-1 ml-3 overflow-hidden">
                    <h4 class="font-bold truncate">Smart Listening - 1</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Writing -->
          <div
            class="bg-white rounded-2xl p-5 mt-4 mb-5 xl:mb-8"
          >
            <div class="flex flex-wrap relative">
              <div
                class="cursor-pointer w-full md:w-28 mb-5 md:mb-0 max-h-60 mr-5 overflow-hidden flex justify-center items-center"
              >
                <img
                  src="../../../assets/images/TOEICWriting.jpg"
                  alt=""
                  class="object-cover min-h-full w-full"
                />
              </div>
              <div class="flex-1 overflow-hidden flex items-start">
                <div class="flex-1">
                  <div class="cursor-pointer inline-block">
                    <h4
                      class="pt-1 text-xl font-bold mb-1 multiline-ellipsis ml-0"
                    >
                      <strong
                        class="mr-2 min-w-max bg-red text-white rounded-md text-sm py-1 px-2 font-semibold"
                      >
                        <img
                          class="mr-0.5 -mt-0.5 inline w-3"
                          src="../../../assets/images/flame.png"
                          alt=""
                        />
                        HOT
                      </strong>
                      The newest set TOEIC Reading exam !!!
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-wrap mt-5 -mx-2.5 items-stretch"
            >
            <div class="w-full sm:w-6/12 xl:w-4/12 p-2.5">
                <div
                  class="border-2 border-none rounded-2xl p-5 flex items-center cursor-pointer"
                >
                  <div
                    class="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-100 bg-blue-50"
                  >
                    <img src="../../../assets/images/pen.png" alt="" />
                  </div>
                  <div class="flex-1 ml-3 overflow-hidden">
                    <h4 class="font-bold truncate">Smart Writing - 1</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

</style>