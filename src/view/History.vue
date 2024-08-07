<template>
  <section
    class="mb-4 text-start mx-auto max-w-[30rem] bg-color-primary px-4 pb-8 pt-4 rounded-lg shadow-inner-calc"
  >
    <h1 class="text-center mb-5 text-3xl text-white font-head tracking-widest">
      HISTORY
    </h1>
    <div class="text-lg text-start flex flex-col gap-2">
      <div
        v-for="(historyItem, index) in historyLayout"
        :key="index"
        class="text-white bg-color-secondary w-full p-3 rounded-lg flex justify-between items-center"
      >
        <span
          class="bg-color-third text-black py-3 px-5 rounded-lg me-2 shrink-0 font-bold"
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
  </section>
  <router-link
    to="/"
    class="bg-color-primary uppercase rounded-lg text-white p-6"
  >
    <button aria-label="to-home">back to app</button>
  </router-link>
  <modal-delete
    :modal="open"
    :index-modal="deleteIndex"
    :history-modal="historyLayout"
    @updateIsOpen="openModalHistory"
    @indexDeleteHistory="indexRemoveHistory"
  />
</template>
<script>
  import Swal from 'sweetalert2'
  import ModalDelete from '@/components/ModalDelete.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'history',
    components: {
      FontAwesomeIcon,
      ModalDelete,
    },
    data() {
      return {
        open: false,
        deleteIndex: null,
      }
    },
    props: ['historyLayout'],
    methods: {
      showNotivicationSuccess() {
        Swal.fire({
          icon: 'success',
          title: `History copied successfully`,
          showConfirmButton: false,
          timer: 1800,
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
          },
        })
      },
      openModal(index) {
        this.open = true
        this.deleteIndex = index
      },
      openModalHistory(newVal) {
        this.open = newVal
      },
      indexRemoveHistory(newVal) {
        this.deleteIndex = newVal
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
          if (result.length > 1) {
            let resultSymbol = result[1].symbol
            let resultValue = result[2].value
            resultString = `${resultSymbol}${resultValue}`
          } else {
            resultString = result[0].value
          }

          // Buat string lengkap dengan hasil
          let finalString = `${calculationString} = ${resultString}`

          // Menyalin ke clipboard
          await navigator.clipboard.writeText(finalString)
          // Menampilkan notifikasi atau feedback kepada pengguna jika diinginkan
          this.showNotivicationSuccess()
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      },
    },
  }
</script>
