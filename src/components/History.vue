<template>
  <div
    class="mt-4 text-start mx-auto max-w-[30rem] bg-slate-600 p-4 rounded-lg shadow-lg"
    v-if="value.length"
  >
    <h2 class="text-center mb-5 text-3xl text-white">HISTORY</h2>
    <div class="text-lg text-start flex flex-col gap-2">
      <div
        v-for="(historyItem, index) in value"
        :key="index"
        class="text-black bg-white w-full p-3 rounded-lg"
      >
        <template
          v-for="(item, subIndex) in historyItem.formatted"
          :key="subIndex"
        >
          <component
            class="mx-2"
            :is="item.component"
            :icon="item.icon"
            v-if="item.isIcon"
          />
          <span v-else>{{ item.value }}</span>
        </template>
        <span> = {{ historyItem.value }}</span>
      </div>
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
