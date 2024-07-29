<template>
  <div class="grid grid-cols-4 gap-2 text-xl md:text-2xl font-bold">
    <button class="btn-cal" @click="allClearValuesPanel">AC</button>
    <div class="col-span-2"></div>
    <button
      class="btn-cal"
      @click="removeLastValue"
      @mousedown="startRepeating('removeLastValue')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      <font-awesome-icon icon="delete-left" size="xl" />
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('1')"
      @mousedown="startRepeating('inputValuePanel', '1')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      1
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('2')"
      @mousedown="startRepeating('inputValuePanel', '2')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      2
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('3')"
      @mousedown="startRepeating('inputValuePanel', '3')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      3
    </button>
    <button class="btn-cal" @click="applyOperationPanel('multiply')">
      <font-awesome-icon icon="xmark" />
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('4')"
      @mousedown="startRepeating('inputValuePanel', '4')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      4
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('5')"
      @mousedown="startRepeating('inputValuePanel', '5')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      5
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('6')"
      @mousedown="startRepeating('inputValuePanel', '6')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      6
    </button>
    <button class="btn-cal" @click="applyOperationPanel('divide')">
      <font-awesome-icon icon="divide" />
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('7')"
      @mousedown="startRepeating('inputValuePanel', '7')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      7
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('8')"
      @mousedown="startRepeating('inputValuePanel', '8')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      8
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('9')"
      @mousedown="startRepeating('inputValuePanel', '9')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      9
    </button>
    <button class="btn-cal" @click="applyOperationPanel('sum')">
      <font-awesome-icon icon="plus" />
    </button>
    <button
      class="btn-cal"
      @click="inputValuePanel('0')"
      @mousedown="startRepeating('inputValuePanel', '0')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      0
    </button>
    <button class="btn-cal" @click="equal">=</button>
    <button class="btn-cal" @click="inputValuePanel('.')">,</button>
    <button class="btn-cal" @click="applyOperationPanel('subtract')">
      <font-awesome-icon icon="minus" />
    </button>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import Decimal from 'decimal.js'

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
      statusCalculation: {
        type: Boolean,
        required: true,
      },
      sendHistory: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        repeatInterval: null,
      }
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeyInputValue)
    },
    computed: {
      formattedDisplayValue() {
        let display = this.calcDisplayValue
        let displayPart = display.split(/([+\-*/])/)
        return displayPart.map(char => {
          let result = {}
          // jika charnya adalah operator (+ - * / )
          if (['+', '-', '*', '/'].includes(char)) {
            result.isIcon = true
            result.component = 'font-awesome-icon'
            result.icon =
              char === '+'
                ? 'plus'
                : char === '-'
                ? 'minus'
                : char === '/'
                ? 'divide'
                : 'xmark'
          }
          // jika charnya adalah 'Infinity'
          else if (char.includes('Infinity')) {
            result.isIcon = false
            result.value = char
          }
          // jika charnya bukanlah operator
          else {
            let [integerPart, dote, floatPart] = char.split(/([.])/)
            if (char.includes('.')) {
              dote = ','
            }
            if (integerPart.length > 16) {
              integerPart = integerPart.slice(0, 16)
            }

            integerPart = integerPart
              ? integerPart
                  .split('')
                  .reverse()
                  .map((char, index) =>
                    index % 3 === 0 && index !== 0 ? char + '.' : char
                  )
                  .reverse()
                  .join('')
              : ''

            result.isIcon = false
            result.value = floatPart
              ? `${integerPart}${dote}${floatPart}`
              : dote
              ? `${integerPart}${dote}0`
              : integerPart
          }
          return result
        })
      },
    },
    watch: {
      formattedDisplayValue: {
        handler(newValue) {
          // let history = this.sendHistory
          let status = this.statusCalculation
          console.log(status)
          this.$emit('watchFormattedDisplayValue', newValue)
          // if (status) {
          //   status = false
          //   console.log('history berhasil di push')
          //   this.emitStatusCalculation(status)
          //   history[history.length - 1].format.result =
          //     this.formattedDisplayValue
          // }
        },
        immediate: true,
      },
    },
    methods: {
      startRepeating(method, value) {
        this.repeatInterval = setInterval(() => {
          if (value !== undefined) {
            this[method](value)
          } else {
            this[method]()
          }
        }, 100)
      },
      stopRepeating() {
        clearInterval(this.repeatInterval)
      },
      emitUpdateDisplay(newVal) {
        this.$emit('updateDisplayValue', newVal)
      },
      emitIsNextClear(newVal) {
        this.$emit('updateNextClear', newVal)
      },
      emitNewHistory(newVal) {
        this.$emit('addNewHistory', newVal)
      },
      emitClearValuesPanel() {
        this.$emit('allClearValuesPanel')
      },
      emitStatusCalculation(newVal) {
        this.$emit('updateStatusCalculation', newVal)
      },
      handleKeyInputValue(event) {
        // mengambil key dari keyboard
        const key = event.key
        if (key === ' ') {
          return
        } else if (!isNaN(key)) {
          return this.inputValuePanel(key)
        } else if (key === '=' || key === 'Enter') {
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
            case ',':
              return this.inputValuePanel('.')
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

        if (lastPart === '0' && val !== '.') {
          // Jika bagian terakhir adalah 0 dan val bukan koma, return
          return
        }

        if (val === '.') {
          // cek bagian terakhir apakah sudah mengadung koma
          newValue += !lastPart.includes('.')
            ? lastPart.length === 0
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
        let history = this.sendHistory
        let currentDisplayValue = this.calcDisplayValue
        let boolNextInput = this.clearInputExp
        let status = this.statusCalculation
        let result = null

        // Pisahkan currentDisplayValue berdasarkan operator untuk cek jumlah operand
        const operands = currentDisplayValue.split(/[+\-*/]/)
        if (operands.length == 2 && operands[0] === '') {
          return
        }

        // tes apakah ada operator di dalam currentDisplayValue
        const hasOperator = /[+\-*/]/.test(currentDisplayValue)
        if (
          currentDisplayValue !== '' &&
          !['*', '/', '+', '-'].includes(currentDisplayValue.slice(-1)) &&
          hasOperator
        ) {
          try {
            result = new Decimal(eval(currentDisplayValue))
              .toNumber()
              .toString()
            if (result.includes('e') || result === 'Infinity') {
              boolNextInput = true
            }
            currentDisplayValue = result
            console.log(currentDisplayValue, 'cek apakah Infinity')
            if (
              currentDisplayValue !== 'Infinity' &&
              !currentDisplayValue.includes('e')
            ) {
              status = true
              this.emitStatusCalculation(status)
              let emitHistory = history.push({
                value: {
                  calculation: this.calcDisplayValue,
                  result: currentDisplayValue,
                },
                format: {
                  calculation: this.formattedDisplayValue,
                  result: '',
                },
              })
              this.emitNewHistory(emitHistory)
            }
          } catch (err) {
            console.error('Error caught:', err.message)
            currentDisplayValue = 'Error'
          }
        }
        this.emitUpdateDisplay(currentDisplayValue)
        this.emitIsNextClear(boolNextInput)
      },
    },
  }
</script>
