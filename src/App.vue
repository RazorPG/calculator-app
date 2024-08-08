<template>
  <transition
    name="fade"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
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
  </transition>
</template>

<script>
  import { defineComponent } from 'vue'
  import { onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  export default defineComponent({
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
    setup() {
      const route = useRoute()

      const updateBodyClass = path => {
        document.body.classList.remove('bg-default', 'bg-history')

        if (path === '/') {
          document.body.classList.add('bg-default')
        } else if (path === '/history') {
          document.body.classList.add('bg-history')
        }
      }

      watch(
        route,
        to => {
          updateBodyClass(to.path)
        },
        { immediate: true }
      )

      onMounted(() => {
        updateBodyClass(route.path)
      })
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
      beforeEnter(el) {
        el.classList.add('animate__animated', 'animate__fadeIn')
      },
      enter(el, done) {
        el.classList.add('animate__animated', 'animate__fadeIn')
        done()
      },
      leave(el, done) {
        el.classList.add('animate__animated', 'animate__fadeOut')
        done()
      },
    },
  })
</script>

<style>
  body {
  padding: 2rem 0;
  text-align: center;
  background-size: 100% 200%;
  background-repeat: no-repeat;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
  transition: background 1s ease-in;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
