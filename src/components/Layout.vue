<template>
  <div
    class="container p-4 bg-color-primary mx-auto max-w-[19rem] md:max-w-[25rem] border-orange-950 border-2 rounded-xl shadow-inner-calc mb-2"
  >
    <div class="my-2 mb-4 h-full overflow-y-auto overflow-x-hidden">
      <div
        class="text-4xl w-full h-[3.8rem] px-3 py-2 rounded-lg resize-none bg-[rgba(1,167,143,255)] overflow-y-auto text-end font-calculator font-bold shadow-2xl tracking-[0.08em]"
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
      @allClearValuesPanel="emitClearAllValue"
      @watchFormattedDisplayValue="emitUpdateFormattedDisplayValue"
      :sendHistory="historyLayout"
      :calcDisplayValue="displayValueLayout"
      :clearInputExp="nextInputLayout"
      :statusCalculation="statusCalculationLayout"
    />
  </div>
  <router-link to="/history">
    <button class="btn-link">go to History</button>
  </router-link>
</template>

<script>
  import CalcControlPanel from './CalcControlPanel.vue'
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
