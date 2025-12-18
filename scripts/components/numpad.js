// ================================
// Numpad Component
// ================================

class Numpad {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      return;
    }
    this.maxDigits = 8;
    this.value = "";
    this.render();
    this.init();
  }

  render() {
    this.container.innerHTML = `
            <div class="numpad-container">
                <input
                    type="text"
                    id="numpad-input"
                    class="numpad-input"
                    placeholder="Id de la remesa"
                    readonly
                />
                <div class="numpad-grid">
                    <button class="numpad-btn" data-value="1">1</button>
                    <button class="numpad-btn" data-value="2">2</button>
                    <button class="numpad-btn" data-value="3">3</button>
                    <button class="numpad-btn numpad-btn-delete" data-action="delete">
                        <i class="fa-solid fa-delete-left"></i>
                    </button>

                    <button class="numpad-btn" data-value="4">4</button>
                    <button class="numpad-btn" data-value="5">5</button>
                    <button class="numpad-btn" data-value="6">6</button>

                    <button class="numpad-btn" data-value="7">7</button>
                    <button class="numpad-btn" data-value="8">8</button>
                    <button class="numpad-btn" data-value="9">9</button>
                    <button class="numpad-btn numpad-btn-enter" data-action="enter">
                        ↵
                    </button>

                    <button class="numpad-btn numpad-btn-zero" data-value="0">0</button>

                    <button class="numpad-btn numpad-btn-decimal" data-value="." disabled>.</button>

                </div>
                <div id="numpad-error" class="numpad-error" style="display: none"></div>
            </div>
        `;

    this.input = this.container.querySelector("#numpad-input");
    this.errorDisplay = this.container.querySelector("#numpad-error");
  }

  init() {
    const buttons = this.container.querySelectorAll(".numpad-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => this.handleButtonClick(button));
    });

    this.input.addEventListener("click", () => {
      this.input.removeAttribute("readonly");
    });

    this.input.addEventListener("blur", () => {
      this.input.setAttribute("readonly", "true");
      this.validateAndFormat();
    });

    this.input.addEventListener("input", (e) => {
      this.handleManualInput(e);
    });

    this.input.addEventListener("keydown", (e) => {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];
      const isNumber = /^[0-9]$/.test(e.key);

      if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === "Enter") {
        this.handleEnter();
        e.preventDefault();
      }
    });

    this.updateDisplay();
  }

  handleButtonClick(button) {
    const value = button.getAttribute("data-value");
    const action = button.getAttribute("data-action");

    if (action === "delete") {
      this.handleDelete();
    } else if (action === "enter") {
      this.handleEnter();
    } else if (value) {
      this.handleInput(value);
    }
  }

  handleInput(digit) {
    if (digit === ".") {
      return;
    }

    const rawValue = this.value.replace(/[^0-9]/g, "");

    if (rawValue.length >= this.maxDigits) {
      this.showError("El ID debe tener exactamente 8 dígitos");
      return;
    }

    this.value = rawValue + digit;
    this.updateDisplay();
  }

  handleDelete() {
    const rawValue = this.value.replace(/[^0-9]/g, "");

    if (rawValue.length > 0) {
      this.value = rawValue.slice(0, -1);
      this.updateDisplay();
    }
  }

  handleEnter() {
    const rawValue = this.value.replace(/[^0-9]/g, "");

    this.clearError();

    if (rawValue.length !== this.maxDigits) {
      this.showError("El ID debe tener exactamente 8 dígitos");
      return;
    }

    const item = itemsData.find((item) => item.id === rawValue);

    if (!item) {
      this.showError(`No encontrado: ${rawValue}`);
      return;
    }

    if (item.status === "COBRADO") {
      this.showError(`Ya cobrado: ${rawValue}`);
      return;
    }

    item.status = "COBRADO";

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    item.charged_at = `${year}${month}${day}`;

    if (window.itemsList) {
      window.itemsList.addChargedItem(item);
    }
  
    this.input.style.borderColor = "#16a34a";
    this.input.style.backgroundColor = "#dcfce7";

    setTimeout(() => {
      this.input.style.borderColor = "";
      this.input.style.backgroundColor = "";
      this.reset();
    }, 1000);
  }

  handleManualInput(e) {
    let inputValue = e.target.value;

    // Remove any non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Enforce max digits limit
    if (inputValue.length > this.maxDigits) {
      inputValue = inputValue.slice(0, this.maxDigits);
      this.showError("ID must be exactly 8 digits");
    }

    this.value = inputValue;
    this.updateDisplay();
  }

  handlePaste(pastedText) {

    let cleanedText = pastedText.replace(/[^0-9]/g, "");

    // Enforce max digits limit
    if (cleanedText.length > this.maxDigits) {
      cleanedText = cleanedText.slice(0, this.maxDigits);
    }

    this.value = cleanedText;
    this.updateDisplay();
  }

  validateAndFormat() {
    const rawValue = this.value.replace(/[^0-9]/g, "");
    if (rawValue === "") {
      this.value = "";
    } else {
      this.value = rawValue;
    }

    this.updateDisplay();
  }

  updateDisplay() {
    const rawValue = this.value.replace(/[^0-9]/g, "");

    if (rawValue === "") {
      this.input.value = "";
      this.input.placeholder = "ID de la remesa";
      return;
    }
    this.input.value = rawValue;
  }

  getNumericValue() {
    const rawValue = this.value.replace(/[^0-9]/g, "");
    return rawValue;
  }

  showError(message) {
    // Visual feedback for input field
    this.input.style.borderColor = "#dc2626";
    this.input.style.backgroundColor = "#fee2e2";

    // Show error message below numpad
    if (this.errorDisplay) {
      this.errorDisplay.textContent = message;
      this.errorDisplay.style.display = "block";
    }


    setTimeout(() => {
      this.input.style.borderColor = "";
      this.input.style.backgroundColor = "";
    }, 1000);
  }

  clearError() {
    if (this.errorDisplay) {
      this.errorDisplay.style.display = "none";
      this.errorDisplay.textContent = "";
    }
  }

  reset() {
    this.value = "";
    this.updateDisplay();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const numpad = new Numpad("numpad-container");

  window.numpad = numpad;
});
