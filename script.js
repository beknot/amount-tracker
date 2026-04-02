let singleList = document.getElementById("single-list");
let singleTotalEl = document.getElementById("single-total");

// Add new row
function addSingleAmount(name = "", amount = "") {
    let row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
        <input type="text" class="name" placeholder="Name" value="${name}">
        <input type="number" class="single-amount" placeholder="Amount" value="${amount}" max="999999">
        <button onclick="removeSingleAmount(this)">X</button>
    `;

    singleList.appendChild(row);

    let singleInput = row.querySelector(".single-amount");

    // Restrict input behavior
    singleInput.addEventListener("input", function () {
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

        updateSingleTotal();
    });
}

// Remove row
function removeSingleAmount(btn) {
    btn.parentElement.remove();
    updateSingleTotal();
}

// Calculate total
function updateSingleTotal() {
    let amounts = document.querySelectorAll(".single-amount");
    let total = 0;

    amounts.forEach(input => {
        let val = parseInt(input.value);
        if (!isNaN(val)) {
            total += val;
        }
    });

    singleTotalEl.textContent = total;
}

// Add first row by default
addSingleAmount();