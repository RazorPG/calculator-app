<template>
  <div
    class="mb-4 text-start mx-auto max-w-[30rem] bg-color-primary p-4 rounded-lg shadow-lg"
  >
    <h2 class="text-center mb-5 text-3xl text-white">HISTORY</h2>
    <div class="text-lg text-start flex flex-col gap-2">
      <div
        v-for="(historyItem, index) in historyLayout"
        :key="index"
        class="text-white bg-color-secondary w-full p-3 rounded-lg flex justify-between items-center"
      >
        <span
          class="bg-color-third text-black py-3 px-5 rounded-lg me-2 shrink-0"
          >{{ index + 1 }}</span
        >
        <div class="w-full">
          <div class="inline-block text-sm">
            <template
              v-for="(calculationItem, subIndex) in historyItem.format
                .calculation"
              :key="subIndex"
            >
              <component
                class="mx-2"
                :is="calculationItem.component"
                :icon="calculationItem.icon"
                v-if="calculationItem.isIcon"
              />
              <span v-else>{{ calculationItem.value }}</span>
            </template>
          </div>
          <div class="block font-bold">
            <template
              v-for="(resultItem, resIndex) in historyItem.format.result"
              :key="resIndex"
            >
              <component
                :is="resultItem.component"
                :icon="resultItem.icon"
                v-if="resultItem.isIcon"
              />
              <span>{{ resultItem.value }}</span>
            </template>
          </div>
        </div>
        <button
          class="bg-color-third text-black py-3 px-5 rounded-lg me-2 hover:text-white hover:bg-slate-700 shadow-xl"
          @click="copyHistory(index)"
        >
          <font-awesome-icon icon="clone" size="sm" />
        </button>
        <button
          class="bg-color-third text-black py-3 px-5 rounded-lg me-2 hover:text-white hover:bg-slate-700 shadow-xl"
          @click="openModal(index)"
        >
          <font-awesome-icon icon="trash-can" size="sm" />
        </button>
      </div>
    </div>
  </div>
  <router-link to="/">
    <button class="btn-3d">back to app</button>
  </router-link>
  <div>
    <div
      v-if="open"
      class="fixed bg-modal inset-0 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p class="text-lg">Are you sure you want to delete?</p>
        <button
          class="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 mr-2"
          @click="confirmRemoveHistory"
        >
          Confirm
        </button>
        <button
          class="bg-gray-500 text-white py-2 px-4 rounded-lg mt-4"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'history',
    components: FontAwesomeIcon,
    data() {
      return {
        open: false,
        deleteIndex: null,
      }
    },
    props: ['historyLayout'],
    emits: ['updateDisplayValueApp'],
    methods: {
      openModal(index) {
        this.open = true
        this.deleteIndex = index
      },
      closeModal() {
        this.open = false
        this.deleteIndex = null
      },
      confirmRemoveHistory() {
        this.removeHistory(this.deleteIndex)
        this.closeModal()
      },
      removeHistory(index) {
        let history = this.historyLayout
        history.splice(index, 1)
      },
      async copyHistory(index) {
        try {
          let history = this.historyLayout[index]
          let calculationItems = history.format.calculation
          let result = history.format.result

          // Gabungkan nilai dan simbol
          let calculationString = calculationItems
            .map(item => {
              if (item.isIcon) {
                return item.symbol
              } else {
                return item.value
              }
            })
            .join(' ')

          let resultString = ''
          console.log(result)
          if (result.length > 1) {
            let resultSymbol = result[1].symbol
            let resultValue = result[2].value
            resultString = `${resultSymbol}${resultValue}`
          } else {
            resultString = result[0].value
          }

          console.log('copyHistory called with index:', index)
          // Buat string lengkap dengan hasil
          let finalString = `${calculationString} = ${resultString}`

          // Menyalin ke clipboard
          await navigator.clipboard.writeText(finalString)
          // Menampilkan notifikasi atau feedback kepada pengguna jika diinginkan
          alert('History copied to clipboard!')
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      },
      // this.emitUpdateDisplay(result)
      emitUpdateDisplay(newVal) {
        this.$emit('updateDisplayValueApp', newVal)
      },
    },
  }
</script>
