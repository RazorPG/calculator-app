<template>
  <header
    class="absolute inset-0 flex flex-col justify-center items-center text-white font-head font-bold"
  >
    <h1
      ref="header"
      data-content="MY CALCULATOR APP"
      class="after:opacity-50 text-stroke-1 md:text-stroke-2 lg:text-stroke-3 relative after:z-40 after:text-transparent after:absolute after:top-0 after:left-0 tracking-[0.2em] lg:tracking-[0.5em] text-4xl md:text-6xl xl:text-7xl pointer-events-none"
    >
      MY CALCULATOR APP
    </h1>
  </header>

  <div class="absolute flex flex-col justify-center w-full z-30">
    <div
      class="container p-4 mt-20 pb-10 bg-color-primary mx-auto max-w-[20rem] md:max-w-[25rem] rounded-xl shadow-inner-calc mb-2"
    >
      <div class="my-2 mb-4 h-full overflow-y-auto overflow-x-hidden">
        <div
          class="text-[1.7rem] md:text-4xl uppercase w-full h-16 md:h-18 px-3 py-3 rounded-lg resize-none bg-input overflow-y-auto text-start font-calculator font-bold tracking-wider scrollbar-input relative shadow-inner-input"
        >
          <span
            v-for="(char, index) in formattedDisplayLayout"
            :key="index"
            :class="{
              'animation-cursor': index === formattedDisplayLayout.length - 1,
            }"
          >
            <component
              :is="char.component"
              :icon="char.icon"
              class="mx-2"
              size="md"
              v-if="char.isIcon"
            />
            <span v-else>{{ char.value }}</span>
          </span>
        </div>
      </div>
      <calc-control-panel
        @updateDisplayValue="emitUpdateDisplayValue"
        @updateNextClear="emitUpdateNextInput"
        @updateStatusCalculation="emitUpdateStatusCalculation"
        @allClearValuesPanel="emitClearAllValue"
        @watchFormattedDisplayValue="emitUpdateFormattedDisplayValue"
        :sendHistory="historyLayout"
        :calcDisplayValue="displayValueLayout"
        :clearInputExp="nextInputLayout"
        :statusCalculation="statusCalculationLayout"
      />
    </div>
    <router-link to="/history">
      <button class="btn-3d">go to History</button>
    </router-link>
  </div>
</template>

<script>
  import CalcControlPanel from '@/components/CalcControlPanel.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'Layout',
    components: {
      CalcControlPanel,
      FontAwesomeIcon,
    },
    emits: [
      'updateDisplayValueApp',
      'updateStatusCalculationApp',
      'updateNextInputApp',
      'clearAllValuesApp',
      'updateFormattedDisplayApp',
    ],
    props: {
      displayValueLayout: String,
      historyLayout: Array,
      statusCalculationLayout: Boolean,
      nextInputLayout: Boolean,
      formattedDisplayLayout: Array,
    },
    methods: {
      emitUpdateDisplayValue(newVal) {
        this.$emit('updateDisplayValueApp', newVal)
      },
      emitUpdateStatusCalculation(newVal) {
        this.$emit('updateStatusCalculationApp', newVal)
      },
      emitUpdateNextInput(newVal) {
        this.$emit('updateNextInputApp', newVal)
      },
      emitClearAllValue() {
        this.$emit('clearAllValuesApp')
      },
      emitUpdateFormattedDisplayValue(newVal) {
        this.$emit('updateFormattedDisplayApp', newVal)
      },
    },
  }
</script>

<style scoped>
  h1::after {
  content: attr(data-content)
}
  /* width */
.scrollbar-input::-webkit-scrollbar {
  width: 10px;
  height: 100%;
}
/* Track */
.scrollbar-input::-webkit-scrollbar-track {
  background: transparent; 
  border-radius: 10px;
}
 
/* Handle */
.scrollbar-input::-webkit-scrollbar-thumb:focus {
  background: #888; 
  border-radius: 10px;
}

/* Handle on hover */
.scrollbar-input::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>
