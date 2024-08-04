<template>
  <div class="grid grid-cols-4 gap-x-3 gap-y-4 text-xl md:text-2xl font-bold">
    <button
      data-key="7"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '7')"
      @mousedown="startRepeating('inputValuePanel', '7')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      7
    </button>
    <button
      data-key="8"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '8')"
      @mousedown="startRepeating('inputValuePanel', '8')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      8
    </button>
    <button
      data-key="9"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '9')"
      @mousedown="startRepeating('inputValuePanel', '9')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      9
    </button>
    <button
      data-key="Backspace"
      class="btn-cal btn-secondary shadow-btn-secondary"
      @click="handleClick('remove', 'removeLastValue')"
      @mousedown="startRepeating('removeLastValue')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      <font-awesome-icon icon="delete-left" size="xl" />
    </button>
    <button
      data-key="4"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '4')"
      @mousedown="startRepeating('inputValuePanel', '4')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      4
    </button>
    <button
      data-key="5"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '5')"
      @mousedown="startRepeating('inputValuePanel', '5')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      5
    </button>
    <button
      data-key="6"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '6')"
      @mousedown="startRepeating('inputValuePanel', '6')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      6
    </button>
    <button
      data-key="x"
      class="btn-cal btn-secondary shadow-btn-secondary"
      @click="handleClick('operator', 'applyOperationPanel', 'multiply')"
    >
      <font-awesome-icon icon="xmark" />
    </button>
    <button
      data-key="1"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '1')"
      @mousedown="startRepeating('inputValuePanel', '1')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      1
    </button>
    <button
      data-key="2"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '2')"
      @mousedown="startRepeating('inputValuePanel', '2')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      2
    </button>
    <button
      data-key="3"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '3')"
      @mousedown="startRepeating('inputValuePanel', '3')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      3
    </button>
    <button
      data-key="/"
      class="btn-cal btn-secondary shadow-btn-secondary"
      @click="handleClick('operator', 'applyOperationPanel', 'divide')"
    >
      <font-awesome-icon icon="divide" />
    </button>
    <button
      class="btn-cal btn-primary shadow-btn-primary col-span-2 tracking-[0.08em] text-3xl"
      @click="handleClick('operand', 'inputValuePanel', '00')"
      @mousedown="startRepeating('inputValuePanel', '00')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      00
    </button>
    <button
      data-key="0"
      class="btn-cal btn-primary shadow-btn-primary"
      @click="handleClick('operand', 'inputValuePanel', '0')"
      @mousedown="startRepeating('inputValuePanel', '0')"
      @mouseup="stopRepeating"
      @mouseleave="stopRepeating"
    >
      0
    </button>
    <button
      data-key="+"
      class="btn-cal btn-secondary shadow-btn-secondary"
      @click="handleClick('operator', 'applyOperationPanel', 'sum')"
    >
      <font-awesome-icon icon="plus" />
    </button>
    <button
      data-key="c"
      class="btn-cal btn-secondary tracking-[0.08em] shadow-btn-secondary"
      @click="handleClick('allclear', 'allClearValuesPanel')"
    >
      AC
    </button>
    <button
      data-key="Enter"
      class="btn-cal btn-secondary shadow-btn-secondary"
      @click="handleClick('equal', 'equal')"
    >
      =
    </button>
    <button
      data-key=","
      class="btn-cal btn-secondary shadow-btn-secondary"
      @click="handleClick('operand', 'inputValuePanel', '.')"
    >
      ,
    </button>
    <button
      data-key="-"
      class="btn-cal btn-secondary shadow-btn-secondary"
      @click="handleClick('operator', 'applyOperationPanel', 'subtract')"
    >
      <font-awesome-icon icon="minus" />
    </button>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { soundMixin } from '@/mixins/soundMixin'

  export default {
    name: 'calc-control-panel',
    components: {
      FontAwesomeIcon,
    },
    mixins: [soundMixin],
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
        beginHistory: {},
      }
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeyInputValue)
      window.addEventListener('keyup', this.soundKeyInputValue)
    },
    beforeUnmount() {
      window.removeEventListener('keydown', this.handleKeyInputValue)
      window.removeEventListener('keyup', this.soundKeyInputValue)
    },
    computed: {
      formattedDisplayValue() {
        console.log(this.sendHistory)
        let display = this.calcDisplayValue
        let displayPart = display.split(/([+\-*/])/)
        return displayPart.map(char => {
          let result = {}
          // jika charnya adalah operator (+ - * / )
          if (['+', '-', '*', '/'].includes(char)) {
            result.isIcon = true
            result.component = 'font-awesome-icon'
            if (char === '+') {
              result.icon = 'plus'
              result.symbol = '+'
            } else if (char === '-') {
              result.icon = 'minus'
              result.symbol = '−'
            } else if (char === '/') {
              result.icon = 'divide'
              result.symbol = '÷'
            } else {
              result.icon = 'xmark'
              result.symbol = '×'
            }
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
          console.log('panjang format', this.formattedDisplayValue)
          let history = this.sendHistory
          let status = this.statusCalculation
          this.$emit('watchFormattedDisplayValue', newValue)
          if (status) {
            status = false
            const updateHistory = this.beginHistory
            this.emitStatusCalculation(status)
            updateHistory.format.result = this.formattedDisplayValue
            updateHistory.format.result.symbol
            history.push(updateHistory)
          }
        },
        immediate: true,
      },
    },
    methods: {
      // untuk memberikan sfx ketika tombol kalkulator di klik
      handleClick(sound, method, ...args) {
        this.playClickSound(sound)
        this[method](...args)
      },
      // ketika masih di press buttonnya maka fungsinya terus di ulang
      startRepeating(method, value) {
        this.repeatInterval = setInterval(() => {
          value !== undefined ? this[method](value) : this[method]()
        }, 100)
      },
      // memberhentikan event yang ada di button ketika di klik tahan berhenti
      stopRepeating() {
        clearInterval(this.repeatInterval)
      },
      // peremit emitan
      emitUpdateDisplay(newVal) {
        this.$emit('updateDisplayValue', newVal)
      },
      emitIsNextClear(newVal) {
        this.$emit('updateNextClear', newVal)
      },
      emitClearValuesPanel() {
        this.$emit('allClearValuesPanel')
      },
      emitStatusCalculation(newVal) {
        this.$emit('updateStatusCalculation', newVal)
      },
      // ngehandle semua key dari keyboard
      handleKeyInputValue(event) {
        // mengambil key dari keyboard
        const key = event.key
        console.log(key)
        const buttons = document.querySelectorAll(`[data-key='${key}']`)
        buttons.forEach(button => {
          button.classList.remove('shadow-btn-primary', 'shadow-btn-secondary')
          button.classList.add('translate-y-2')
        })
        if (key === ' ') {
          return
        } else if (key === 'c') {
          return this.allClearValuesPanel()
        } else if (!isNaN(key)) {
          return this.inputValuePanel(key)
        } else if (key === 'Enter') {
          return this.equal()
        } else {
          switch (key) {
            case 'Backspace':
              return this.removeLastValue()
            case 'x':
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
      soundKeyInputValue(event) {
        const key = event.key
        const buttons = document.querySelectorAll(`[data-key='${key}']`)
        buttons.forEach(button => {
          button.classList.add(
            button.classList.contains('btn-secondary')
              ? 'shadow-btn-secondary'
              : 'shadow-btn-primary'
          )
          button.classList.remove('translate-y-2')
        })

        return this.playClickSound(
          key === ' '
            ? null
            : !isNaN(key) || key === ','
            ? 'operand'
            : key === 'Enter'
            ? 'equal'
            : key === 'c'
            ? 'allclear'
            : key === 'x' || key === '/' || key === '+' || key === '-'
            ? 'operator'
            : key === 'Backspace'
            ? 'remove'
            : null
        )
      },
      inputValuePanel(val) {
        let newValue = this.calcDisplayValue
        let boolNextInput = this.clearInputExp

        // jika terdapat e atau infinity maka boolNextInput akan true sehingga fungsi clearvalue otomatis di jalankan mau apapun yang di klik
        if (boolNextInput) {
          boolNextInput = false
          return this.emitClearValuesPanel()
        }
        // pisahkan berdasarkan operator
        let parts = newValue.split(/[+\-*/]/)
        let lastPart = parts[parts.length - 1]

        // Jika bagian terakhir adalah 0  atau panjang operand lebih dari 16 dan val bukan koma
        if ((lastPart.length > 16 || lastPart === '0') && val !== '.') {
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
        } else if (val == '00') {
          newValue += lastPart.includes('.') || lastPart.length ? val : ''
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
            result = eval(currentDisplayValue).toString()
            if (result.includes('e') || result === 'Infinity') {
              boolNextInput = true
            }
            currentDisplayValue = result
            if (
              currentDisplayValue !== 'Infinity' &&
              !currentDisplayValue.includes('e')
            ) {
              status = true
              this.emitStatusCalculation(status)
              let emitHistory = {
                value: {
                  calculation: this.calcDisplayValue,
                  result: currentDisplayValue,
                },
                format: {
                  calculation: this.formattedDisplayValue,
                },
              }
              this.beginHistory = emitHistory
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
