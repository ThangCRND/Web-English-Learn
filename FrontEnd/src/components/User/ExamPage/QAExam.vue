<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
    <div>
        <div class="bg-primaryLightColor md:max-w-xl lg:max-w-4xl lg:max-h-3xl mb-8 rounded-md">
            <div class="p-5">
                <h2 class="text-white font-bold mb-3">Question 1</h2>
                <p class="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. A pariatur asperiores sint
                    minus
                    distinctio ab in, rerum labore atque, quae, omnis tenetur? Eaque natus iste eius amet molestiae, nesciun

                    neque.</p>
            </div>
        </div>

        <div class=" bg-primaryLightColor h-72 md:max-w-xl lg:max-w-4xl rounded-md">
            <div class="p-5 ">
                <div class="flex items-center mb-4">
                    <span class="h-10 w-10 rounded-full bg-gray flex items-center justify-center text-white">A</span>
                    <p class="text-white ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eius.
                        Temporibus, atque.</p>
                </div>
                <div class="flex items-center mb-4">
                    <span class="h-10 w-10 rounded-full bg-gray flex items-center justify-center  text-white">B</span>
                    <p class="text-white ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eius.
                        Temporibus, atque.</p>
                </div>
                <div class="flex items-center mb-4">
                    <span class="h-10 w-10 rounded-full bg-gray flex items-center justify-center text-white">C</span>
                    <p class="text-white ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eius.
                        Temporibus, atque.</p>
                </div>
                <div class="flex items-center mb-4">
                    <span class="h-10 w-10 rounded-full bg-gray flex items-center justify-center text-white">D</span>
                    <p class="text-white ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eius.
                        Temporibus, atque.</p>
                </div>

            </div>
        </div>
        <div class="flex justify-center items-center mt-6">
            <button class="bg-gray hover:bg-blue-600 text-white font-medium py-2 w-40 px-4 rounded">
                <font-awesome-icon icon="chevron-left" class="mr-4"/> Previous
            </button>
            <button class="ml-8 bg-blueColor hover:bg-blue-600 text-white font-medium py-2 w-40 px-4 rounded">
                Next <font-awesome-icon icon="chevron-right" class="ml-4"/> 
            </button>
        </div>
    </div>
</template>
