<template>
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
    @updateHistoryApp="updateHistory"
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
      updateHistory(newVal) {
        this.history = newVal
      },
    },
  }
</script>

<style>
  #app {
    padding: 2rem 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-image: url('./assets/images/texture.jpg');
  background-size: cover;
  background-position:top;
  background-repeat: repeat;
  /* background-position: 0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px;
  background-image: radial-gradient(18% 28% at 24% 50%, #CEFAFFFF 7%, #073AFF00 100%),radial-gradient(18% 28% at 18% 71%, #FFFFFF59 6%, #073AFF00 100%),radial-gradient(70% 53% at 36% 76%, #73F2FFFF 0%, #073AFF00 100%),radial-gradient(42% 53% at 15% 94%, #FFFFFFFF 7%, #073AFF00 100%),radial-gradient(42% 53% at 34% 72%, #FFFFFFFF 7%, #073AFF00 100%),radial-gradient(18% 28% at 35% 87%, #FFFFFFFF 7%, #073AFF00 100%),radial-gradient(31% 43% at 7% 98%, #FFFFFFFF 24%, #073AFF00 100%),radial-gradient(21% 37% at 72% 23%, #D3FF6D9C 24%, #073AFF00 100%),radial-gradient(35% 56% at 91% 74%, #8A4FFFF5 9%, #073AFF00 100%),radial-gradient(74% 86% at 67% 38%, #6DFFAEF5 24%, #073AFF00 100%),linear-gradient(125deg, #4EB5FFFF 1%, #4C00FCFF 100%); */
  min-height: 100vh;
  max-width: 100%;
}
</style>
