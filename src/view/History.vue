<template>
  <section ref="container" class="p-4 w-full">
    <router-link to="/" @click="handleRouteChange">
      <font-awesome-icon
        icon="angles-up"
        class="text-white animate-bounce font-bold uppercase size-16 md:size-20 lg:size-24"
      />
    </router-link>
    <div
      class="mt-4 text-start mx-auto max-w-[23rem] md:max-w-[30rem] lg:max-w-[36rem] bg-main px-4 pb-8 pt-4 rounded-lg border-2 md:border-4 border-slate-300"
    >
      <h1
        class="text-center mb-5 text-3xl md:text-4xl lg:text-5xl text-white font-head tracking-widest"
      >
        HISTORY
      </h1>
      <div class="text-lg md:text-xl text-start flex flex-col gap-2">
        <div
          v-for="(historyItem, index) in historyLayout"
          :key="index"
          :data-index="index"
          class="text-white bg-color-secondary w-full p-1 rounded-lg flex gap-1 justify-between items-center animate__animated animate__animate__fadeInRight"
        >
          <span
            class="bg-color-third text-black py-2 px-4 md:py-3 md:px-5 rounded-lg me-2 font-bold flex-shrink-0"
            >{{ index + 1 }}</span
          >
          <div class="flex-1 min-w-0">
            <div
              class="text-nowrap overflow-hidden text-[12px] md:text-lg whitespace-nowrap text-ellipsis"
            >
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
            <div
              class="block text-sm md:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis"
            >
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
            class="bg-color-third text-black py-2 px-4 md:py-3 md:px-5 rounded-lg hover:text-white hover:bg-slate-700 shadow-xl shrink-0"
            @click="copyHistory(index)"
          >
            <font-awesome-icon icon="clone" size="sm" />
          </button>
          <button
            class="bg-color-third text-black py-2 px-4 md:py-3 md:px-5 rounded-lg hover:text-white hover:bg-slate-700 shadow-xl shrink-0"
            @click="openModal(index)"
          >
            <font-awesome-icon icon="trash-can" size="sm" />
          </button>
        </div>
      </div>
    </div>
    <modal-delete
      :modal="open"
      :index-modal="deleteIndex"
      :history-modal="historyLayout"
      @updateIsOpen="openModalHistory"
      @indexDeleteHistory="indexRemoveHistory"
    />
  </section>
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
    props: ['historyLayout'],
    methods: {
      handleRouteChange() {
        const container = this.$refs.container
        document.body.classList.add('overflow-hidden')
        container.classList.add('animate__animated', 'animate__bounceOut')

        setTimeout(() => {
          // Lanjutkan navigasi setelah animasi selesai
          this.$router.push('/')
          document.body.classList.remove('overflow-hidden')
        }, this.animationDuration)
      },
      showNotivicationSuccess() {
        if (window.innerWidth >= 1024) {
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
        }
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
