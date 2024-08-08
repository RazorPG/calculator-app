<template>
  <div id="app">
    <Transition name="route">
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
    </Transition>
    <Footer />
  </div>
</template>

<script>
  import { onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import Footer from './components/Footer.vue'
  export default {
    name: 'App',
    components: {
      Footer,
    },
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
    },
  }
</script>

<style>
  body {
  text-align: center;
  background-size: 100% 200%;
  background-repeat: no-repeat;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
  transition: background 1s ease-in;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.route-enter-from, .route-leave-to {
  opacity: 0;
  transform: scale(0);
}
.route-enter-to, .route-leave-from {
  opacity: 1;
  transform: scale(1);
}
.route-enter-active, .route-leave-active {
  transition: all 0.5s 1s ease
}
</style>
