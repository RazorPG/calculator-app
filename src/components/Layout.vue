<template>
  <div
    class="container p-4 bg-slate-600 mx-auto max-w-[23rem] md:max-w-[25rem] border-slate-700 border-2 rounded-xl shadow-inner-btn"
  >
    <div
      class="my-2 mb-4 bg-slate-400 h-full overflow-y-auto overflow-x-hidden"
    >
      <input
        type="text"
        class="text-3xl w-full h-[3.8rem] p-3 rounded-lg resize-none"
        disabled
        v-model="formattedDisplayValue"
      />
    </div>
    <div class="grid grid-cols-4 gap-2 text-xl md:text-2xl font-bold">
      <button class="btn-cal" @click="allClearValues">AC</button>
      <div class="col-span-2"></div>
      <button class="btn-cal" @click="removeLastValue">
        <font-awesome-icon icon="delete-left" size="xl" />
      </button>
      <button class="btn-cal" @click="inputValue('1')">1</button>
      <button class="btn-cal" @click="inputValue('2')">2</button>
      <button class="btn-cal" @click="inputValue('3')">3</button>
      <button class="btn-cal" @click="applyOperation('multiply')">
        <font-awesome-icon icon="xmark" />
      </button>
      <button class="btn-cal" @click="inputValue('4')">4</button>
      <button class="btn-cal" @click="inputValue('5')">5</button>
      <button class="btn-cal" @click="inputValue('6')">6</button>
      <button class="btn-cal" @click="applyOperation('divide')">
        <font-awesome-icon icon="divide" />
      </button>
      <button class="btn-cal" @click="inputValue('7')">7</button>
      <button class="btn-cal" @click="inputValue('8')">8</button>
      <button class="btn-cal" @click="inputValue('9')">9</button>
      <button class="btn-cal" @click="applyOperation('sum')">
        <font-awesome-icon icon="plus" />
      </button>
      <button class="btn-cal" @click="inputValue('0')">0</button>
      <button class="btn-cal" @click="equal">=</button>
      <button class="btn-cal" @click="inputValue('.')">,</button>
      <button class="btn-cal" @click="applyOperation('subtract')">
        <font-awesome-icon icon="minus" />
      </button>
    </div>
  </div>
  <History :value="history"></History>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import History from './History.vue'
  export default {
    name: 'Layout',
    components: {
      FontAwesomeIcon,
      History,
    },
    data: function () {
      return {
        displayValue: '',
        history: [],
      }
    },
    computed: {
      formattedDisplayValue() {
        // Pisahkan berdasarkan operator, dan simpan operatornya
        const parts = this.displayValue.split(/([+\-*/])/)
        // Hanya format bagian yang bukan operator
        const formattedParts = parts.map(part => {
          let [integerPart, dote, floatPart] = part.split(/([.])/)
          // format bagian integer
          integerPart = integerPart
            .split('')
            .reverse()
            .map((char, index) =>
              index % 3 === 0 && index !== 0 ? char + ',' : char
            )
            .reverse()
            .join('')
          // gabungkan dengan float atau titik jika ada
          return floatPart
            ? `${integerPart}${dote}${floatPart}`
            : dote
            ? `${integerPart}${dote}`
            : integerPart
        })
        // Gabungkan kembali nilai yang telah diformat
        return formattedParts.join(' ')
      },
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeyInputValue)
    },
    methods: {
      handleKeyInputValue(event) {
        // mengambil key dari keyboard
        const key = event.key
        console.log(key)
        if (key === ' ') {
          return
        } else if (!isNaN(key) || key === '.') {
          return this.inputValue(key)
        } else if (key == '=' || key == 'Enter') {
          return this.equal()
        } else {
          switch (key) {
            case 'Backspace':
              return this.removeLastValue()
            case '*':
              return this.applyOperation('multiply')
            case '/':
              return this.applyOperation('divide')
            case '+':
              return this.applyOperation('sum')
            case '-':
              return this.applyOperation('subtract')
            default:
              break
          }
        }
      },
      inputValue(val) {
        // pisahkan berdasarkan operator
        let parts = this.displayValue.split(/[+\-*/]/)
        let lastPart = parts[parts.length - 1]

        if (val == '.') {
          // cek bagian terakhir apakah sudah mengadung koma
          this.displayValue += !lastPart.includes('.')
            ? lastPart.length == 0
              ? `0.`
              : val
            : ''
        } else if (val == '0') {
          this.displayValue +=
            lastPart.includes('.') || !['.', '0'].includes(lastPart) ? val : ''
        } else {
          this.displayValue += val
        }
      },
      allClearValues() {
        this.displayValue = ''
      },
      removeLastValue() {
        this.displayValue = this.displayValue.toString().slice(0, -1)
      },
      applyOperation(op) {
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
          let lastChar = this.displayValue.slice(-1)
          if (opMachine !== null && this.displayValue !== '') {
            if (
              !['*', '/', '+', '-'].includes(lastChar) ||
              (opMachine === '-' && lastChar === '*') ||
              (opMachine === '-' && lastChar === '/')
            ) {
              this.displayValue += opMachine
              this.isOperator = true
            }
          } else if (opMachine === '-' && !['-', '/', '+'].includes(lastChar))
            this.displayValue += opMachine
          this.isOperator = true
        } catch (err) {
          // kalau error muncul peringatan ini
          console.error(err, 'sepertinya operasi ada kesalahan')
        }
      },
      equal() {
        const hasOperator = /[+\-*/]/.test(this.displayValue)
        if (
          this.displayValue !== '' &&
          !['*', '/', '+', '-'].includes(this.displayValue.slice(-1)) &&
          hasOperator
        ) {
          try {
            const result = eval(this.displayValue).toString()
            this.history.push(`${this.displayValue} = ${result}`)
            console.log(this.history)
            this.displayValue = result
          } catch (err) {
            this.displayValue = 'Error'
          }
        }
      },
    },
  }
</script>
