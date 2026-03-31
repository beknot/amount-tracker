let container = document.getElementById("calculators");

// Add new calculator
function addCalculator() {
    let calc = document.createElement("div");
    calc.className = "calculator";

    calc.innerHTML = `
        <div class="list"></div>

        <button onclick="addRow(this)">+ Add Row</button>
        <button onclick="removeCalculator(this)">Delete Calculator</button>

        <h4>Total: <span class="total">0</span></h4>
        <hr>
    `;

    container.appendChild(calc);

    // Add first row by default
    addRow(calc.querySelector("button"));
}

// Remove calculator
function removeCalculator(btn) {
    btn.closest(".calculator").remove();
}

// Add row inside specific calculator
function addRow(btn, name = "", amount = "") {
    let calc = btn.closest(".calculator");
    let list = calc.querySelector(".list");

    let row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
        <input type="text" class="name" placeholder="Name" value="${name}">
        <input type="number" class="amount" placeholder="Amount" value="${amount}">
        <button onclick="removeRow(this)">X</button>
    `;

    list.appendChild(row);

    let amountInput = row.querySelector(".amount");

    // Restrict input + update total
    amountInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
        }

        if (parseInt(this.value || 0) > 999999) {
            this.value = "999999";
        }

        updateTotal(calc);
    });
}

// Remove row
function removeRow(btn) {
    let calc = btn.closest(".calculator");
    btn.parentElement.remove();
    updateTotal(calc);
}

// Update total for specific calculator
function updateTotal(calc) {
    let amounts = calc.querySelectorAll(".amount");
    let total = 0;

    amounts.forEach(input => {
        let val = parseInt(input.value);
        if (!isNaN(val)) {
            total += val;
        }
    });

    calc.querySelector(".total").textContent = total.toLocaleString();
}

// Initialize first calculator
addCalculator();