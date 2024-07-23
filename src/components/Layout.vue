<template>
  <div class="container p-4 bg-slate-500 mx-auto max-w-[23rem] md:max-w-[25rem] border-slate-700 border-2 rounded-xl shadow-lg">
    <div class="w-full my-2  mb-4">
      <input type="text" class="text-3xl w-full p-3 rounded-lg" disabled v-model="formattedDisplayValue">
    </div>
      <div class="grid grid-cols-4 gap-2 text-xl md:text-2xl font-bold">
        <button class="btn-cal" @click="allClearValues">AC</button>
        <div class="col-span-2"></div>
        <button class="btn-cal" @click="removeValue"><font-awesome-icon icon="delete-left" size="xl"></font-awesome-icon></button>
        <button class="btn-cal" @click="inputValue('1')">1</button>
        <button class="btn-cal" @click="inputValue('2')">2</button>
        <button class="btn-cal" @click="inputValue('3')">3</button>
        <button class="btn-cal" @click="operasi('multiply')"  ><font-awesome-icon icon="xmark"></font-awesome-icon></button>
        <button class="btn-cal" @click="inputValue('4')">4</button>
        <button class="btn-cal" @click="inputValue('5')">5</button>
        <button class="btn-cal" @click="inputValue('6')">6</button>
        <button class="btn-cal" @click="operasi('divide')"><font-awesome-icon icon="divide"></font-awesome-icon></button>
        <button class="btn-cal" @click="inputValue('7')">7</button>
        <button class="btn-cal" @click="inputValue('8')">8</button>
        <button class="btn-cal" @click="inputValue('9')">9</button>
        <button class="btn-cal" @click="operasi('sum')"><font-awesome-icon icon="plus"></font-awesome-icon></button>
        <button class="btn-cal" @click="inputValue('0')">0</button>
        <button class="btn-cal" @click="assignOperation">=</button>
        <button class="btn-cal" @click="inputValue('.')">,</button>
        <button class="btn-cal" @click="operasi('sub')"><font-awesome-icon icon="minus"></font-awesome-icon></button>
      </div>
  </div>
</template> 

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  name: 'Layout',
  components: {
    FontAwesomeIcon,
  },
  data: function () {
    return {
      displayValue: "",
      operation: null,
      operationFull: "",
      result: null,
    }
  },
  computed: {
    formattedDisplayValue :function () {
      let [integerPart, decimalPart] = (this.displayValue).toString().split('.');
      integerPart = integerPart ? Number(integerPart).toLocaleString() : "";
      return decimalPart ? `${integerPart},${decimalPart}` : `${integerPart}`;
    }
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyInputValue);
  },
  methods: {
    handleKeyInputValue(event) {
       switch (event.key) {
        case '0' : 
        this.inputValue('0');
        break;
        case '1' : 
        this.inputValue('1');
        break;
        case '2' : 
        this.inputValue('2');
        break;
        case '3' : 
        this.inputValue('3');
        break;
        case '4' : 
        this.inputValue('4');
        break;
        case '5' : 
        this.inputValue('5');
        break;
        case '6' : 
        this.inputValue('6');
        break;
        case '7' : 
        this.inputValue('7');
        break;
        case '8' : 
        this.inputValue('8');
        break;
        case '9' : 
        this.inputValue('9');
        break;
        case 'Backspace' : 
        this.removeValue();
        break;
        case '*' : 
        this.operasi('multiply');
        break;
        case '/' : 
        this.operasi('divide');
        break;
        case '+' : 
        this.operasi('sum');
        break;
        case '-' : 
        this.operasi('sub');
        break;
        case '=' : 
        this.assignOperation();
        break;
        case ',' : 
        this.inputValue('.');
        break;
        default: 
        console.log(`${event.key}: bukanlah input yang seharusnya`);
      }
    },
    inputValue(val) {
      this.displayValue += val;
    },
    allClearValues() {
      this.displayValue = "";
      this.operationFull = "";
    },
    removeValue() {
      this.displayValue = (this.displayValue).toString().slice(0, -1);
    },
    operasi(op) {
      if(this.displayValue != "") {
        // mengubah  semua operasi yang telah diinputkan menjadi operasi machine
        try {
          let opMachine = (op === 'multiply') ? '*' : (op === 'divide') ? '/' : (op === 'sum') ? '+' : (op === "sub") ?  '-' : null ; 
          this.operationFull += (this.displayValue).toString() + opMachine;
          this.displayValue = "";
        }
        // kalau error muncul peringatan ini
        catch(err){
          console.error(err, "sepertinya operasi ada kesalahan");
        }
      }
    },
    assignOperation() {
      if(this.displayValue !== ''){
        (this.operationFull += this.displayValue).toString();
        console.log(this.operationFull);
        this.displayValue = this.calculate(this.operationFull);
        this.operationFull = "";
      }
    },
    calculate(expression) {
      if (/^[\d+\-*/.\s]+$/.test(expression)) {
        try {
          return new Function (`return ${expression}`)();
        } catch (error) {
          console.error('expression ada yang salah', error);
          return null;
        }
      } else {
        console.error('calculate tidak sesuai yang diinginkan');
        return null;
      }
    }
  },
}
</script>