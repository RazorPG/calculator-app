<template>
  <div class="text-4xl md:text-5xl font-bold pt-5 mb-6 md:mb-8">
    <h1>MY CALCULATOR APP</h1>
  </div>
  <router-view
    :displayValueLayout="displayValue"
    :historyLayout="history"
    :statusCalculationLayout="statusCalculation"
    :nextInputLayout="clearNextInput"
    :formattedDisplayLayout="formattedDisplayValue"
    @updateDisplayValueApp="updateDisplayValueApp"
    @updateStatusCalculationApp="updateStatusCalculation"
    @updateNextInputApp="statusNextInput"
    @clearAllValuesApp="clearAllValues"
    @updateFormattedDisplayApp="updateFormattedDisplayValue"
  />
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {
        displayValue: '',
        history: [],
        statusCalculation: false,
        clearNextInput: false,
        formattedDisplayValue: [],
      }
    },
    methods: {
      updateDisplayValueApp(newVal) {
        this.displayValue = newVal
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
  color:#005a48;
  background-image: url("@/assets/images/texture.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
}
</style>
