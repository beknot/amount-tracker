let list = document.getElementById("list");
let totalEl = document.getElementById("total");

// Add new row
function addRow(name = "", amount = "") {
    let row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
        <input type="text" class="name" placeholder="Name" value="${name}">
        <input type="number" class="amount" placeholder="Amount" value="${amount}" max="999999">
        <button onclick="removeRow(this)">X</button>
    `;

    list.appendChild(row);

    let amountInput = row.querySelector(".amount");

    // 🔒 Restrict input behavior
    amountInput.addEventListener("input", function () {
        // Remove non-digits (prevents e, +, -, .)
        this.value = this.value.replace(/\D/g, "");

        // Limit to 6 digits
        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
        }

        // Prevent value > 999999
        if (parseInt(this.value || 0) > 999999) {
            this.value = "999999";
        }

        updateTotal();
    });
}

// Remove row
function removeRow(btn) {
    btn.parentElement.remove();
    updateTotal();
}

// Calculate total
function updateTotal() {
    let amounts = document.querySelectorAll(".amount");
    let total = 0;

    amounts.forEach(input => {
        let val = parseInt(input.value);
        if (!isNaN(val)) {
            total += val;
        }
    });

    totalEl.textContent = total;
}

// Add first row by default
addRow();