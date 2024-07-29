<template>
  <div
    class="my-4 text-start mx-auto max-w-[30rem] bg-slate-600 p-4 rounded-lg shadow-lg"
    v-if="track.length"
  >
    <h2 class="text-center mb-5 text-3xl text-white">HISTORY</h2>
    <div class="text-lg text-start flex flex-col gap-2">
      <div
        v-for="(historyItem, index) in track"
        :key="index"
        class="text-black bg-white w-full p-3 rounded-lg flex justify-between items-center"
      >
        <span
          class="bg-slate-500 text-slate-300 py-3 px-5 rounded-lg me-2 shrink-0"
          >{{ index + 1 }}</span
        >
        <div class="w-full">
          <div class="inline-block text-sm">
            <template
              v-for="(calculationItem, subIndex) in historyItem.format
                .calculation"
              :key="subIndex"
            >
              <component
                class="mx-2"
                :is="calculationItem.component"
                :icon="calculationItem.icon"
                v-if="calculationItem.isIcon"
              />
              <span v-else>{{ calculationItem.value }}</span>
            </template>
          </div>
          <div class="block">
            <template
              v-for="(resultItem, resIndex) in historyItem.format.result"
              :key="resIndex"
            >
              <component
                :is="resultItem.component"
                :icon="resultItem.icon"
                v-if="resultItem.isIcon"
              />
              <span>{{ resultItem.value }}</span>
            </template>
          </div>
        </div>
        <button
          class="bg-slate-500 text-slate-300 py-3 px-5 rounded-lg me-2 hover:text-slate-700 hover:bg-slate-300 shadow-xl"
          @click="copyHistory(index)"
        >
          <font-awesome-icon icon="clone" size="sm" />
        </button>
        <button
          class="bg-slate-500 text-slate-300 py-3 px-5 rounded-lg me-2 hover:text-slate-700 hover:bg-slate-300 shadow-xl"
          @click="removeHistory(index)"
        >
          <font-awesome-icon icon="trash-can" size="sm" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'history',
    components: FontAwesomeIcon,
    props: ['track'],
    emits: ['cloneDisplay'],
    methods: {
      removeHistory(index) {
        let track = this.track
        track.splice(index, 1)
      },
      copyHistory(index) {
        let history = this.track[index]
        let result = history.value.result
        this.emitUpdateDisplay(result)
      },
      emitUpdateDisplay(newVal) {
        this.$emit('cloneDisplay', newVal)
      },
    },
  }
</script>
