<template>
  <div
    class="container p-4 bg-slate-600 mx-auto max-w-[23rem] md:max-w-[25rem] border-slate-700 border-2 rounded-xl shadow-inner-btn"
  >
    <div
      class="my-2 mb-4 bg-slate-400 h-full overflow-y-auto overflow-x-hidden"
    >
      <div
        class="text-3xl w-full h-[3.8rem] p-3 rounded-lg resize-none bg-white overflow-y-auto text-end"
      >
        <span
          v-for="(char, index) in formattedDisplayLayout"
          :key="index"
          class="text-end"
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
    </div>
    <calc-control-panel
      @updateDisplayValue="emitUpdateDisplayValue"
      @updateNextClear="emitUpdateNextInput"
      @updateStatusCalculation="emitUpdateStatusCalculation"
      @addNewHistory="emitUpdateHistory"
      @allClearValuesPanel="emitClearAllValue"
      @watchFormattedDisplayValue="emitUpdateFormattedDisplayValue"
      :sendHistory="historyLayout"
      :calcDisplayValue="displayValueLayout"
      :clearInputExp="nextInputLayout"
      :statusCalculation="statusCalculationLayout"
    />
  </div>
  <History :track="trackRecord" />

  <!-- @cloneDisplay="emitUpdateDisplayValue" -->
</template>

<script>
  import History from './History.vue'
  import CalcControlPanel from './CalcControlPanel.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'Layout',
    components: {
      History,
      CalcControlPanel,
      FontAwesomeIcon,
    },
    emits: [
      'updateDisplayValueApp',
      'updateHistoryApp',
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
      trackRecord: Array,
    },
    methods: {
      emitUpdateDisplayValue(newVal) {
        this.$emit('updateDisplayValueApp', newVal)
      },
      emitUpdateHistory(newVal) {
        this.$emit('updateHistoryApp', newVal)
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
