//membuat objek untuk menggambarkan data dan kondisi dari kalkulator
const calculator = {
    displayNumber: '0', // menampilkan angka yang muncul
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
}

//fungsi untuk menupdate angka pada layar
const updateDisplay = () => {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}


//fungsi untuk menghapus data pada calculator
const clearCalculator = () => {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

//fungsi memasukkan nilai ke displayNumber
const inputDigit = (digit) => {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

const inverseNumber = () => {
    if (calculator.displayNumber === '0') {
        return
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

const handleOperator = (operator) => {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang nilai display numebr supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('operator sudah ditetapkan')
    }
}

//mengakses seluruh tombol dengan menggunakan query selector
const buttons = document.querySelectorAll(".button");
// looping untuk melakukan penambahan event handler di setiap button
for (let button of buttons) {
    button.addEventListener('click', (event) => {
        //mendapatkan objek elemen yang di klik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay;
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    })
}


const performCalculation = () => {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    //objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

// performCalculation();