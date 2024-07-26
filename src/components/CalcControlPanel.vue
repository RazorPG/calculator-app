<template>
  <div class="grid grid-cols-4 gap-2 text-xl md:text-2xl font-bold">
    <button class="btn-cal" @click="allClearValuesPanel">AC</button>
    <div class="col-span-2"></div>
    <button class="btn-cal" @click="removeLastValue">
      <font-awesome-icon icon="delete-left" size="xl" />
    </button>
    <button class="btn-cal" @click="inputValuePanel('1')">1</button>
    <button class="btn-cal" @click="inputValuePanel('2')">2</button>
    <button class="btn-cal" @click="inputValuePanel('3')">3</button>
    <button class="btn-cal" @click="applyOperationPanel('multiply')">
      <font-awesome-icon icon="xmark" />
    </button>
    <button class="btn-cal" @click="inputValuePanel('4')">4</button>
    <button class="btn-cal" @click="inputValuePanel('5')">5</button>
    <button class="btn-cal" @click="inputValuePanel('6')">6</button>
    <button class="btn-cal" @click="applyOperationPanel('divide')">
      <font-awesome-icon icon="divide" />
    </button>
    <button class="btn-cal" @click="inputValuePanel('7')">7</button>
    <button class="btn-cal" @click="inputValuePanel('8')">8</button>
    <button class="btn-cal" @click="inputValuePanel('9')">9</button>
    <button class="btn-cal" @click="applyOperationPanel('sum')">
      <font-awesome-icon icon="plus" />
    </button>
    <button class="btn-cal" @click="inputValuePanel('0')">0</button>
    <button class="btn-cal" @click="equal">=</button>
    <button class="btn-cal" @click="inputValuePanel('.')">,</button>
    <button class="btn-cal" @click="applyOperationPanel('subtract')">
      <font-awesome-icon icon="minus" />
    </button>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  export default {
    name: 'calc-control-panel',
    components: {
      FontAwesomeIcon,
    },
    props: {
      calcDisplayValue: {
        type: String,
        required: true,
      },
      clearInputExp: {
        type: Boolean,
        required: true,
      },
      sendHistory: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeyInputValue)
    },
    methods: {
      emitUpdateDisplay(newVal) {
        this.$emit('updateDisplayValue', newVal)
      },
      emitIsNextClear(newVal) {
        this.$emit('updateNextClear', newVal)
      },
      emitNewHistory(newVal) {
        this.$emit('addNewhistory', newVal)
      },
      emitClearValuesPanel() {
        this.$emit('allClearValuesPanel')
      },
      handleKeyInputValue(event) {
        // mengambil key dari keyboard
        const key = event.key
        if (key === ' ') {
          return
        } else if (!isNaN(key) || key === '.') {
          return this.inputValuePanel(key)
        } else if (key == '=' || key == 'Enter') {
          return this.equal()
        } else {
          switch (key) {
            case 'Backspace':
              return this.removeLastValue()
            case '*':
              return this.applyOperationPanel('multiply')
            case '/':
              return this.applyOperationPanel('divide')
            case '+':
              return this.applyOperationPanel('sum')
            case '-':
              return this.applyOperationPanel('subtract')
            default:
              break
          }
        }
      },
      inputValuePanel(val) {
        let newValue = this.calcDisplayValue
        let boolNextInput = this.clearInputExp
        if (boolNextInput) {
          boolNextInput = false
          return this.emitClearValuesPanel()
        }
        // pisahkan berdasarkan operator
        let parts = newValue.split(/[+\-*/]/)
        let lastPart = parts[parts.length - 1]

        if (val == '.') {
          // cek bagian terakhir apakah sudah mengadung koma
          newValue += !lastPart.includes('.')
            ? lastPart.length == 0
              ? `0.`
              : val
            : ''
        } else if (val == '0') {
          newValue +=
            lastPart.includes('.') || !['.', '0'].includes(lastPart) ? val : ''
        } else {
          newValue += val
        }
        this.emitUpdateDisplay(newValue)
        this.emitIsNextClear(boolNextInput)
      },
      allClearValuesPanel() {
        this.emitClearValuesPanel()
        this.emitUpdateDisplay('')
        this.emitIsNextClear(false)
      },
      removeLastValue() {
        let boolNextInput = this.clearInputExp
        if (boolNextInput) {
          boolNextInput = false
          return this.emitClearValuesPanel()
        }
        let newValueDisplay = this.calcDisplayValue
        newValueDisplay = newValueDisplay.toString().slice(0, -1)
        this.emitUpdateDisplay(newValueDisplay)
        this.emitIsNextClear(boolNextInput)
      },
      applyOperationPanel(op) {
        let boolNextInput = this.clearInputExp
        if (boolNextInput) {
          boolNextInput = false
          return this.emitClearValuesPanel()
        }
        let newValue = this.calcDisplayValue
        // Mengubah semua operasi yang telah diinputkan menjadi operasi machine
        try {
          let opMachine =
            op === 'multiply'
              ? '*'
              : op === 'divide'
              ? '/'
              : op === 'sum'
              ? '+'
              : op === 'subtract'
              ? '-'
              : null
          let lastChar = newValue.slice(-1)
          if (opMachine !== null && newValue !== '') {
            if (
              !['*', '/', '+', '-'].includes(lastChar) ||
              (opMachine === '-' && lastChar === '*') ||
              (opMachine === '-' && lastChar === '/')
            ) {
              newValue += opMachine
            }
          } else if (opMachine === '-' && !['-', '/', '+'].includes(lastChar)) {
            newValue += opMachine
          }
          this.emitUpdateDisplay(newValue)
          this.emitIsNextClear(boolNextInput)
        } catch (err) {
          // kalau error muncul peringatan ini
          console.error(err, 'sepertinya operasi ada kesalahan')
        }
      },
      equal() {
        let newVal = this.calcDisplayValue
        let newHistory = this.sendHistory
        let boolNextInput = this.clearInputExp
        const hasOperator = /[+\-*/]/.test(newVal)
        if (
          newVal !== '' &&
          !['*', '/', '+', '-'].includes(newVal.slice(-1)) &&
          hasOperator
        ) {
          try {
            console.log('Before eval:', typeof newVal, newVal)
            const result = eval(newVal).toString()
            console.log('after eval:', typeof newVal, newVal)
            if (result.includes('e')) {
              boolNextInput = true
            }
            newHistory.push(`${newVal} = ${result}`)
            newVal = result
          } catch (err) {
            console.error('Error caught:', err.message)
            newVal = 'Error'
          }
        } else {
          newVal = 'Error'
        }
        this.emitUpdateDisplay(newVal)
        this.emitNewHistory(newHistory)
        this.emitIsNextClear(boolNextInput)
      },
    },
  }
</script>
