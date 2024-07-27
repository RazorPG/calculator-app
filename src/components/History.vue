<template>
  <div
    class="mt-4 text-start mx-auto max-w-[30rem] bg-slate-600 p-4 rounded-lg shadow-lg"
  >
    <h2 class="text-center mb-5 text-3xl text-white">HISTORY</h2>
    <div class="text-lg text-start flex flex-col gap-2" v-if="value.length">
      <span
        v-for="(char, index) in value"
        :key="index"
        class="text-black bg-white w-full p-3 rounded-lg"
      >
        <component
          class="mx-2"
          :is="char.component"
          :icon="char.icon"
          v-if="char.isIcon"
        />
        <span v-else>{{ char.value }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'history',
    components: FontAwesomeIcon,
    props: ['value'],
    methods: {},
  }
</script>
