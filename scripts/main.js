let buttonNumbers = document.querySelectorAll(
  ".remittance-calculator__numbers, .remittance-calculator__cero"
);

buttonNumbers.forEach(function (buttonNumber) {
  buttonNumber.addEventListener(
    "click",
    function () {
      addNumberToRemittance(buttonNumber);
    },
    false
  );
});

function addNumberToRemittance(buttonNumber) {
  let number = buttonNumber.getAttribute("data-target");
  let accountNumberBox = document.getElementById("remittanceAccountNumber");
  let accountNumber = accountNumberBox.innerHTML + number;

  if (accountNumber.length > 8) {
    alert("La remesa no puede ser mayor a 8 digitos");
    accountNumberBox.textContent = "";
  } else {
    accountNumberBox.innerHTML = accountNumber;
  }
}

let delateButton = document.getElementById("deleteButton");
delateButton.addEventListener("click", removeNumberFromRemittance);

function removeNumberFromRemittance() {
  let accountNumberBox = document.getElementById("remittanceAccountNumber");
  let accountNumberBoxStr = accountNumberBox.innerHTML.slice(0, -1);
  accountNumberBox.innerHTML = accountNumberBoxStr;
}

const remittances = [
  {
    id: "29939310",
    company: "Western Union",
    amount: 5000,
    created_at: "20240701",
    charged_at: "20240702",
  },
  {
    id: "29939311",
    company: "Western Union",
    amount: 6000,
    created_at: "20240703",
    charged_at: "20240704",
  },
  {
    id: "29939312",
    company: "Western Union",
    amount: 7000,
    created_at: "20240705",
    charged_at: "20240706",
  },
  {
    id: "29939313",
    company: "Western Union",
    amount: 8000,
    created_at: "20240707",
    charged_at: "20240708",
  },
  {
    id: "29939314",
    company: "Western Union",
    amount: 9000,
    created_at: "20240709",
    charged_at: "20240710",
  },
  {
    id: "29939315",
    company: "Western Union",
    amount: 10000,
    created_at: "20240711",
    charged_at: "20240712",
  },
  {
    id: "29939316",
    company: "Western Union",
    amount: 11000,
    created_at: "20240713",
    charged_at: "20240714",
  },
  {
    id: "29939317",
    company: "Western Union",
    amount: 12000,
    created_at: "20240715",
    charged_at: "20240716",
  },
  {
    id: "29939318",
    company: "Western Union",
    amount: 13000,
    created_at: "20240717",
    charged_at: "20240718",
  },
  {
    id: "29939319",
    company: "Western Union",
    amount: 14000,
    created_at: "20240719",
    charged_at: "20240720",
  },
  {
    id: "29939320",
    company: "Western Union",
    amount: 15000,
    created_at: "20240721",
    charged_at: "20240722",
  },
  {
    id: "29939321",
    company: "Western Union",
    amount: 16000,
    created_at: "20240723",
    charged_at: "20240724",
  },
  {
    id: "29939322",
    company: "Western Union",
    amount: 17000,
    created_at: "20240725",
    charged_at: "20240726",
  },
];

localStorage.setItem("remittances", JSON.stringify(remittances));

function fillUpTable() {
  let remittancesTable = document
    .getElementById("remittancesTable")
    .getElementsByTagName("tbody")[0];

  remittancesTable.innerHTML = "";

  let remittancesData = localStorage.getItem("remittances");
  if (remittancesData) {
    let remittancesArray = JSON.parse(remittancesData);
    remittancesArray.forEach(function (remittance) {
      let row = remittancesTable.insertRow();
      let cellId = row.insertCell(0);
      let cellCompany = row.insertCell(1);
      let cellAmount = row.insertCell(2);
      cellId.textContent = remittance.id;
      cellCompany.textContent = remittance.company;
      cellAmount.textContent = remittance.amount;
    });
  }
}
fillUpTable();

let enterButton = document.getElementById("enterButton");
enterButton.addEventListener("click", createAccountNumber);

function createAccountNumber() {
  let accountNumberBox = document.getElementById("remittanceAccountNumber");
  let remittancesData = localStorage.getItem("remittances");
  let remittancesArray = JSON.parse(remittancesData);
  let dataJson = {
    id: accountNumberBox.innerHTML,
    company: "Western Union",
    amount: 12000,
  };
  if (accountNumberBox.innerHTML.length < 8) {
    alert("La remesa no puede ser menor a 8 digitos");
    accountNumberBox.textContent = "";
  } else {
    remittancesArray.unshift(dataJson);
    localStorage.setItem("remittances", JSON.stringify(remittancesArray));
    fillUpTable();
  }
}

let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchAccountNumber);

function searchAccountNumber() {
  let popupSearchAccountNumber = document.getElementById("searchInput");
  popupSearchAccountNumber.style.display = "block";
  let popupClose = document.getElementById("popupSearchclose");
  popupClose.style.display = "block";
  let popupSearchFilter = document.getElementById("searchButtonFilter");
  popupSearchFilter.style.display = "block";
}

let searchButtonClose = document.getElementById("popupSearchclose");
searchButtonClose.addEventListener("click", closePopupSearch);

function closePopupSearch() {
  let popupsearchAccountNumber = document.getElementById("searchInput");
  popupsearchAccountNumber.style.display = "none";
  let popupForm = document.getElementById("popupSearchclose");
  popupForm.style.display = "none";
  let popupSearchFilter = document.getElementById("searchButtonFilter");
  popupSearchFilter.style.display = "none";
}

function searchInfo() {
  // Obtener el valor de entrada y convertirlo a minúsculas para la búsqueda
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  // Obtener los datos de localStorage
  const searchData = JSON.parse(localStorage.getItem("remittances"));

  // Filtrar los datos según el valor de entrada
  const resultados = datos.filter((remittances) =>
    persona.nombre.toLowerCase().includes(input)
  );
}
let searchDataFilter = document.getElementById("searchButtonFilter");
searchDataFilter.addEventListener("click", searchDataLocalStorage);

function searchDataLocalStorage() {
  let infoTableRemittances = document.getElementById("searchInput");
  let searchValue = infoTableRemittances.value;
  let searchData = localStorage.getItem("remittances");
  let searchDataArray = JSON.parse(searchData);
  let searchResult = searchDataArray.filter((item) => item.id === searchValue);

  if (searchResult.length === 0) {
    alert("La remesa no existe");
    fillUpTable();
    infoTableRemittances.value = "";
  } else {
    let clearSearchTable = document
      .getElementById("remittancesTable")
      .getElementsByTagName("tbody")[0];
    clearSearchTable.innerHTML = "";
    searchResult.forEach((item) => {
      const row = clearSearchTable.insertRow();
      const cellId = row.insertCell(0);
      const cellCompany = row.insertCell(1);
      const cellAmount = row.insertCell(2);
      cellId.textContent = item.id;
      cellCompany.textContent = item.company;
      cellAmount.textContent = item.amount;
    });
  }
}
