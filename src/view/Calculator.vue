<template>
  <div
    ref="container"
    class="py-16 z-30 flex flex-col items-center gap-5 min-h-[100vh]"
  >
    <div
      class="container relative p-4 pb-10 bg-color-primary mx-auto max-w-[20rem] md:max-w-[25rem] rounded-xl shadow-inner-calc mb-2 after:w-28 after:absolute after:h-28 after:rounded-full after:bg-glassInput overflow-hidden after:blur-[80px] after:left-12 after:top-32"
    >
      <div
        class="my-2 mb-4 h-full columns-1 overflow-x-hidden overflow-hidden relative z-50 shadow-inner-input rounded-lg"
      >
        <div
          ref="input"
          class="text-[1.7rem] md:text-4xl uppercase w-full h-16 md:h-18 px-3 py-3 rounded-lg resize-none bg-input overflow-y-auto text-start font-calculator font-bold tracking-wider scrollbar-input relative"
        >
          <span
            v-for="(char, index) in formattedDisplayLayout"
            :key="index"
            :class="{
              'animation-cursor': index === formattedDisplayLayout.length - 1,
            }"
            class="relative"
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
        <span
          class="w-full absolute h-full bg-glassInput rotate-45 blur-3xl right-0 top-0 pointer-events-none"
        ></span>
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

    <router-link
      to="/history"
      @click="handleRouteChange"
      v-show="historyLayout.length"
    >
      <font-awesome-icon
        icon="angles-down"
        class="text-white font-bold uppercase size-16 md:size-20 lg:size-24 animate-bounce"
      />
    </router-link>
  </div>
</template>

<script>
  import CalcControlPanel from '@/components/CalcControlPanel.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  export default {
    name: 'Calculator',
    components: {
      CalcControlPanel,
      FontAwesomeIcon,
    },
    data() {
      return {
        animationDuration: 500,
      }
    },
    beforeRouteLeave(to, from, next) {
      const container = this.$refs.container

      // Tambahkan kelas animasi
      document.body.classList.add('overflow-hidden')
      container.classList.add('animate__animated', 'animate__bounceOut')

      // Tunggu animasi selesai sebelum melanjutkan navigasi
      setTimeout(() => {
        next()
        document.body.classList.remove('overflow-hidden')
      }, this.animationDuration)
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
      handleRouteChange() {
        const container = this.$refs.container
        document.body.classList.add('overflow-hidden')
        container.classList.add('animate__animated', 'animate__bounceOut')

        setTimeout(() => {
          // Lanjutkan navigasi setelah animasi selesai
          this.$router.push('/history')
          document.body.classList.remove('overflow-hidden')
        }, this.animationDuration)
      },
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

<style scoped>
  @keyframes holeCalc {
  from {
    opacity: 0;
    transform: scale(0) rotate(35deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

.animate-calculator {
  animation: holeCalc 1s ease forwards;
}

  /* width */
  .scrollbar-input::-webkit-scrollbar {
    width: 10px;
    height: 100%;
  }
  /* Track */
  .scrollbar-input::-webkit-scrollbar-track {
    background: transparent; 
    border-radius: 10px;
  }
  /* Handle */
  .scrollbar-input::-webkit-scrollbar-thumb:focus {
    background: #888; 
    border-radius: 10px;
  }
  /* Handle on hover */
  .scrollbar-input::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
</style>
