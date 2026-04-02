let container = document.getElementById("trackers");

// Add new calculator
function addTracker() {
    let calc = document.createElement("div");
    calc.className = "tracker";

    calc.innerHTML = `
        <div class="multiple-list"></div>

        <button onclick="addAmount(this)">+ Add Amount</button>
        <button onclick="removeTracker(this)">Delete Tracker</button>

        <h4>Total: <span class="multiple-total">0</span></h4>
        <hr>
    `;

    container.appendChild(calc);

    // Add first row by default
    addAmount(calc.querySelector("button"));
}

// Remove calculator
function removeTracker(btn) {
    btn.closest(".tracker").remove();
}

// Add row inside specific calculator
function addAmount(btn, name = "", amount = "") {
    let calc = btn.closest(".tracker");
    let multipleList = calc.querySelector(".multiple-list");

    let row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
        <input type="text" class="name" placeholder="Name" value="${name}">
        <input type="number" class="multiple-amount" placeholder="Amount" value="${amount}">
        <button onclick="removeTracker(this)">X</button>
    `;

    multipleList.appendChild(row);

    let amountInput = row.querySelector(".multiple-amount");

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
function removeTracker(btn) {
    let calc = btn.closest(".tracker");
    btn.parentElement.remove();
    updateTotal(calc);
}

// Update total for specific calculator
function updateTotal(calc) {
    let amounts = calc.querySelectorAll(".multiple-amount");
    let total = 0;

    amounts.forEach(input => {
        let val = parseInt(input.value);
        if (!isNaN(val)) {
            total += val;
        }
    });

    calc.querySelector(".multiple-total").textContent = total.toLocaleString();
}

// Initialize first calculator
addTracker();