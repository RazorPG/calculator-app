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
      @updateExecution="updateBoolExecution"
      :sendHistory="history"
      :calcDisplayValue="displayValue"
      :clearInputExp="clearNextInput"
      :boolExecution="isExecution"
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
        isExecution: true,
      }
    },
    computed: {
      formattedDisplayValue() {
        let display = this.displayValue
        let displayPart = display.split(/([+\-*/])/)
        return displayPart.map(char => {
          let result = {}
          // jika charnya adalah operator (+ - * / )
          if (['+', '-', '*', '/'].includes(char)) {
            result.isIcon = true
            result.component = 'font-awesome-icon'
            result.icon =
              char === '+'
                ? 'plus'
                : char === '-'
                ? 'minus'
                : char === '/'
                ? 'divide'
                : 'xmark'
          }
          // jika charnya bukanlah operator
          else {
            let [integerPart, dote, floatPart] = char.split(/([.])/)
            if (char.includes('.')) {
              dote = ','
            }
            if (integerPart.length > 16) {
              integerPart = integerPart.slice(0, 16)
            }

            integerPart = integerPart
              ? integerPart
                  .split('')
                  .reverse()
                  .map((char, index) =>
                    index % 3 === 0 && index !== 0 ? char + '.' : char
                  )
                  .reverse()
                  .join('')
              : ''

            result.isIcon = false
            result.value = floatPart
              ? `${integerPart}${dote}${floatPart}`
              : dote
              ? `${integerPart}${dote}`
              : integerPart
          }
          if (!this.isExecution) {
            this.updateBoolExecution(true)
            this.history.push(result)
            console.log(this.history)
          }
          return result
        })
      },
    },
    methods: {
      updateDisplayValue(newVal) {
        this.displayValue = newVal
      },
      addNewHistory(newVal) {
        this.history.push(newVal)
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
    },
  }
</script>
