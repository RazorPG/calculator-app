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
          v-for="(char, index) in formattedDisplayValue"
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
      @updateDisplayValue="updateDisplayValue"
      @addNewHistory="addNewHistory"
      @updateNextClear="updateNextInput"
      @allClearValuesPanel="clearAllValues"
      @watchFormattedDisplayValue="updateFormattedDisplayValue"
      :sendHistory="history"
      :calcDisplayValue="displayValue"
      :clearInputExp="clearNextInput"
    />
  </div>
  <History :value="history" />
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
    data: function () {
      return {
        displayValue: '',
        history: [],
        clearNextInput: false,
        formattedDisplayValue: [],
      }
    },
    methods: {
      updateDisplayValue(newVal) {
        this.displayValue = newVal
      },
      addNewHistory(newVal) {
        const historyItem = {
          value: newVal,
          formatted: this.formattedDisplayValue,
        }
        this.history.push(historyItem)
      },
      updateNextInput(newVal) {
        this.clearNextInput = newVal
      },
      clearAllValues() {
        this.displayValue = ''
        this.clearNextInput = false
      },
      updateBoolExecution(newVal) {
        this.isExecution = newVal
      },
      updateFormattedDisplayValue(newVal) {
        this.formattedDisplayValue = newVal
      },
    },
  }
</script>
