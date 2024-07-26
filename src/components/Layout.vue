<template>
  <div
    class="container p-4 bg-slate-600 mx-auto max-w-[23rem] md:max-w-[25rem] border-slate-700 border-2 rounded-xl shadow-inner-btn"
  >
    <div
      class="my-2 mb-4 bg-slate-400 h-full overflow-y-auto overflow-x-hidden"
    >
      <input
        type="text"
        class="text-3xl w-full h-[3.8rem] p-3 rounded-lg resize-none"
        disabled
        :value="formattedDisplayValue"
      />
    </div>
    <calc-control-panel
      @updateDisplayValue="updateDisplayValue"
      @addNewHistory="addNewHistory"
      @updateNextClear="updateNextInput"
      @allClearValuesPanel="clearAllValues"
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

  export default {
    name: 'Layout',
    components: {
      History,
      CalcControlPanel,
    },
    data: function () {
      return {
        displayValue: '',
        history: [],
        clearNextInput: false,
      }
    },
    computed: {
      formattedDisplayValue() {
        const parts = this.displayValue.split(/([+\-*/])/)
        const formattedParts = parts.map(part => {
          let [integerPart, dot, floatPart] = part.split(/([.])/)

          if (integerPart.length > 16) {
            integerPart = integerPart.slice(0, 16)
          }

          integerPart = integerPart
            ? integerPart
                .split('')
                .reverse()
                .map((char, index) =>
                  index % 3 === 0 && index !== 0 ? char + ',' : char
                )
                .reverse()
                .join('')
            : ''
          return floatPart
            ? `${integerPart}${dot}${floatPart}`
            : dot
            ? `${integerPart}${dot}`
            : integerPart
        })
        return this.clearNextInput
          ? formattedParts.join('')
          : formattedParts.join(' ')
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
    },
  }
</script>
