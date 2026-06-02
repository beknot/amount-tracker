// TABS
function openTab(tabId) {

    document.querySelectorAll(".tab-content")
        .forEach(tab => tab.classList.remove("active"));

    document.querySelectorAll(".tab-btn")
        .forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId)
        .classList.add("active");

    event.target.classList.add("active");
}

/* ===================================================
   SINGLE TRACKER
=================================================== */

const singleList = document.getElementById("single-list");
const singleTotalEl = document.getElementById("single-total");

function addSingleAmount(name = "", amount = "") {

    const row = document.createElement("div");

    row.className = "row";

    row.innerHTML = `
        <input type="text" placeholder="Name" value="${name}">
        <input type="number" class="single-amount" placeholder="Amount" value="${amount}">
        <button class="delete-btn" onclick="removeSingleAmount(this)">✕</button>
    `;

    singleList.appendChild(row);

    const input = row.querySelector(".single-amount");

    input.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
        }

        updateSingleTotal();
    });

    updateSingleTotal();
}

function removeSingleAmount(btn) {

    btn.parentElement.remove();

    updateSingleTotal();
}

function updateSingleTotal() {

    let total = 0;

    document.querySelectorAll(".single-amount").forEach(input => {

        total += parseInt(input.value || 0);
    });

    singleTotalEl.textContent = total.toLocaleString();
}

/* ===================================================
   MULTIPLE TRACKER
=================================================== */

const trackersContainer = document.getElementById("trackers");

function addTracker() {

    const tracker = document.createElement("div");

    tracker.className = "tracker-card";

    tracker.innerHTML = `
        <div class="multiple-list"></div>

        <div class="tracker-actions">
            <button class="primary-btn" onclick="addAmount(this)">
                + Add Amount
            </button>

            <button class="danger-btn" onclick="removeTrackerCard(this)">
                Delete Tracker
            </button>
        </div>

        <div class="total-box">
            Total: <span class="multiple-total">0</span>
        </div>
    `;

    trackersContainer.appendChild(tracker);

    addAmount(tracker.querySelector(".primary-btn"));
}

function removeTrackerCard(btn) {

    btn.closest(".tracker-card").remove();
}

function addAmount(btn, name = "", amount = "") {

    const tracker = btn.closest(".tracker-card");

    const list = tracker.querySelector(".multiple-list");

    const row = document.createElement("div");

    row.className = "row";

    row.innerHTML = `
        <input type="text" placeholder="Name" value="${name}">
        <input type="number" class="multiple-amount" placeholder="Amount" value="${amount}">
        <button class="delete-btn" onclick="removeAmountRow(this)">✕</button>
    `;

    list.appendChild(row);

    const input = row.querySelector(".multiple-amount");

    input.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
        }

        updateTrackerTotal(tracker);
    });

    updateTrackerTotal(tracker);
}

function removeAmountRow(btn) {

    const tracker = btn.closest(".tracker-card");

    btn.parentElement.remove();

    updateTrackerTotal(tracker);
}

function updateTrackerTotal(tracker) {

    let total = 0;

    tracker.querySelectorAll(".multiple-amount").forEach(input => {

        total += parseInt(input.value || 0);
    });

    tracker.querySelector(".multiple-total").textContent =
        total.toLocaleString();
}

// Initial rows
addSingleAmount();
addTracker();