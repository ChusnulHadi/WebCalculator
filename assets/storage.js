const CACHE_KEY = 'calculation_history'; //variabel key yang digunakan untuk mengakses dan menyimpan data pada localStorage

//fungsi pengecekan fitur storage pada browser
//fungsi ini akan digunakan dalam if statement setiap transaksi pada local storage
const checkForStorage = () => {
    return typeof(Storage) !== "undefined"
}


//fungsi menyimpan data pada local storage
const putHistory = (data) => {
    if (checkForStorage()) { // pengecekan fitur storage
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = []; //membuat data
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY)); //membaca data
        }
        historyData.unshift(data); //menambahkan nilai baru pada array di awal index

        if (historyData.length > 5) { //data lebih dari 5
            historyData.pop(); //menghapus data terakhir
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData)); //menuliskan data ke localstorage
    }
}

//fungsi fetching data dari local storage
const showHistory = () => {
    if (checkForStorage()) { //pengecekan fitur storage
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || []; //membaca data dari local storage
    } else {
        return []; //menampilkan array kosong
    }
}

//fungsi untuk merender data riwatay kalkulasi ke dalam tabel
const renderHistory = () => {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    //selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    //menampilkan setiap data ke dalam tabel
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();