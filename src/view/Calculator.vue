<template>
  <section class="w-full z-30">
    <div
      class="container relative p-4 pb-10 bg-color-primary mx-auto max-w-[20rem] md:max-w-[25rem] rounded-xl shadow-inner-calc mb-2"
    >
      <div
        class="my-2 mb-4 h-full overflow-x-hidden overflow-hidden relative z-50 shadow-inner-input rounded-lg"
      >
        <div
          ref="input"
          class="text-[1.7rem] md:text-4xl uppercase w-full h-16 md:h-18 px-3 py-3 rounded-lg resize-none bg-input overflow-y-auto text-start font-calculator font-bold tracking-wider scrollbar-input relative"
        >
          <span
            v-for="(char, index) in formattedDisplayLayout"
            :key="index"
            :class="{
              'animation-cursor': index === formattedDisplayLayout.length - 1,
            }"
            class="relative"
          >
            <component
              :is="char.component"
              :icon="char.icon"
              class="mx-2"
              v-if="char.isIcon"
            />
            <span v-else>{{ char.value }}</span>
          </span>
        </div>
        <!-- <span
          class="w-full absolute h-full bg-glassInput rotate-45 blur-3xl right-0 top-0 pointer-events-none"
        ></span> -->
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
    <router-link to="/history" v-show="historyLayout.length">
      <button
        class="bg-slate-700 uppercase rounded-lg text-white p-6"
        aria-label="go-to-history"
      >
        go to History
      </button>
    </router-link>
  </section>
</template>

<script>
  import CalcControlPanel from '@/components/CalcControlPanel.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'Calculator',
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
