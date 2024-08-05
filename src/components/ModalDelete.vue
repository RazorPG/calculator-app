<template>
  <div
    v-if="modal"
    class="fixed bg-modal inset-0 flex items-center justify-center z-50"
  >
    <div
      class="bg-white min-w-[25rem] lg:min-w-[30rem] p-6 rounded-lg shadow-lg"
    >
      <h2 class="font-bold text-2xl lg:text-3xl py-2">Confirm</h2>
      <hr />
      <p class="text-lg mt-2">Are you sure you want to delete?</p>
      <button
        class="bg-color-secondary text-white py-2 px-6 rounded-lg mt-4 me-4"
        @click="confirmRemoveHistory"
      >
        YES
      </button>
      <button
        class="bg-color-third text-black py-2 px-6 rounded-lg mt-4"
        @click="closeModal"
      >
        NO
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal-delete',
    props: {
      modal: Boolean,
      indexModal: Number,
      historyModal: Array,
    },
    methods: {
      emitUpdateIsOpen(newVal) {
        this.$emit('updateIsOpen', newVal)
      },
      emitIndexDeleteHistory(newVal) {
        this.$emit('indexDeleteHistory', newVal)
      },
      emitUpdateHistory(newVal) {
        this.$emit('updateHistory', newVal)
      },
      closeModal() {
        let open = this.modal
        let i = this.indexModal
        open = false
        i = null
        this.emitUpdateIsOpen(open)
        this.emitIndexDeleteHistory(i)
      },
      confirmRemoveHistory() {
        this.removeHistory(this.indexModal)
        this.closeModal()
      },
      removeHistory(index) {
        let history = this.historyModal
        history.splice(index, 1)
        this.emitUpdateHistory(history)
      },
    },
  }
</script>
