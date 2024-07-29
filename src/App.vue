<template>
  <div class="text-4xl md:text-5xl font-bold mb-6 md:mb-8">
    <h1>MY CALCULATOR APP</h1>
  </div>
  <Layout
    @updateDisplayValueApp="updateDisplayValueApp"
    @updateHistoryApp="addNewHistory"
    @updateStatusCalculationApp="updateStatusCalculation"
    @updateNextInputApp="statusNextInput"
    @clearAllValuesApp="clearAllValues"
    @updateFormattedDisplayApp="updateFormattedDisplayValue"
    :displayValueLayout="displayValue"
    :historyLayout="history"
    :statusCalculationLayout="statusCalculation"
    :nextInputLayout="clearNextInput"
    :formattedDisplayLayout="formattedDisplayValue"
    :trackRecord="history"
  />
</template>

<script>
  import Layout from './components/Layout.vue'

  export default {
    name: 'App',
    data() {
      return {
        displayValue: '',
        history: [],
        statusCalculation: false,
        clearNextInput: false,
        formattedDisplayValue: [],
      }
    },
    components: {
      Layout,
    },
    methods: {
      updateDisplayValueApp(newVal) {
        this.displayValue = newVal
      },
      addNewHistory(newVal) {
        const historyItem = {
          value: {
            calculation: this.displayValue,
            result: newVal,
          },
          format: {
            calculation: this.formattedDisplayValue,
          },
        }
        this.history.push(historyItem)
        console.log('data history di panggil', this.history)
      },
      updateStatusCalculation(newVal) {
        this.statusCalculation = newVal
      },
      statusNextInput(newVal) {
        this.clearNextInput = newVal
      },
      clearAllValues() {
        this.displayValue = ''
        this.clearNextInput = false
      },
      updateFormattedDisplayValue(newVal) {
        this.formattedDisplayValue = newVal
      },
    },
  }
</script>

<style>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
