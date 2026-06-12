// ── TAB SWITCHING ──────────────────────────────────────
function switchTab(tab, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + tab).classList.add('active');
}

// ── SINGLE TRACKER ─────────────────────────────────────
const singleList = document.getElementById('single-list');
const singleTotalEl = document.getElementById('single-total');
const singleEmpty = document.getElementById('single-empty');
let singleCount = 0;

function addSingleAmount(name = '', amount = '') {
    singleCount++;
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
    <span class="row-num">${String(singleCount).padStart(2,'0')}</span>
    <input type="text" class="name" placeholder="Label…" value="${name}">
    <input type="number" class="single-amount" placeholder="0" value="${amount}">
    <button class="btn-del" onclick="removeSingleRow(this)" title="Remove">×</button>
    `;
    singleList.appendChild(row);
    checkSingleEmpty();

    const inp = row.querySelector('.single-amount');
    inp.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length > 7) this.value = this.value.slice(0, 7);
        if (parseInt(this.value || 0) > 9999999) this.value = '9999999';
        updateSingleTotal();
    });
    inp.focus();
}

function removeSingleRow(btn) {
    btn.closest('.row').remove();
    checkSingleEmpty();
    updateSingleTotal();
    renumberRows(singleList, '.row-num');
}

function clearSingle() {
    singleList.innerHTML = '';
    singleCount = 0;
    checkSingleEmpty();
    updateSingleTotal();
}

function checkSingleEmpty() {
    singleEmpty.style.display = singleList.children.length === 0 ? 'block' : 'none';
}

function updateSingleTotal() {
    let total = 0;
    singleList.querySelectorAll('.single-amount').forEach(i => {
    const v = parseInt(i.value);
    if (!isNaN(v)) total += v;
    });
    animateTotal(singleTotalEl, total);
}

// ── MULTIPLE TRACKERS ──────────────────────────────────
const trackersContainer = document.getElementById('trackers-container');
let trackerCount = 0;

function addTracker() {
    trackerCount++;
    const tc = trackerCount;
    const card = document.createElement('div');
    card.className = 'tracker-card';
    card.dataset.id = tc;
    card.innerHTML = `
    <div class="tracker-header">
        <div class="tracker-title">
        <div class="tracker-index">${tc}</div>
        <input type="text" class="tracker-name-input" placeholder="Tracker name…">
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
        <span class="tracker-total-mini">Total: <strong>0</strong></span>
        <button class="btn-del-tracker" onclick="removeTracker(this)" title="Delete tracker">×</button>
        </div>
    </div>
    <div class="section-label" style="margin-bottom:12px;">Entries</div>
    <div class="multi-list"></div>
    <div class="actions" style="margin-top:12px;">
        <button class="btn-add" style="font-size:10px;padding:7px 14px;" onclick="addMultiAmount(this)">+ Add Entry</button>
    </div>
    `;
    trackersContainer.appendChild(card);
    addMultiAmount(card.querySelector('.btn-add'));
    updateGrandTotal();
}

function removeTracker(btn) {
    btn.closest('.tracker-card').remove();
    renumberTrackers();
    updateGrandTotal();
}

function renumberTrackers() {
    document.querySelectorAll('.tracker-card').forEach((c, i) => {
    c.querySelector('.tracker-index').textContent = i + 1;
    });
}

function addMultiAmount(btn, name = '', amount = '') {
    const card = btn.closest('.tracker-card');
    const list = card.querySelector('.multi-list');
    const rowNum = list.children.length + 1;

    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
    <span class="row-num">${String(rowNum).padStart(2,'0')}</span>
    <input type="text" class="name" placeholder="Label…" value="${name}">
    <input type="number" class="multi-amount" placeholder="0" value="${amount}">
    <button class="btn-del" onclick="removeMultiRow(this)" title="Remove">×</button>
    `;
    list.appendChild(row);

    const inp = row.querySelector('.multi-amount');
    inp.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length > 7) this.value = this.value.slice(0, 7);
        if (parseInt(this.value || 0) > 9999999) this.value = '9999999';
        updateTrackerTotal(card);
        updateGrandTotal();
    });
    inp.focus();
}

function removeMultiRow(btn) {
    const card = btn.closest('.tracker-card');
    btn.closest('.row').remove();
    renumberRows(card.querySelector('.multi-list'), '.row-num');
    updateTrackerTotal(card);
    updateGrandTotal();
}

function updateTrackerTotal(card) {
    let total = 0;
    card.querySelectorAll('.multi-amount').forEach(i => {
    const v = parseInt(i.value);
    if (!isNaN(v)) total += v;
    });
    const mini = card.querySelector('.tracker-total-mini strong');
    mini.textContent = total.toLocaleString();
}

function updateGrandTotal() {
    let grand = 0;
    document.querySelectorAll('.multi-amount').forEach(i => {
    const v = parseInt(i.value);
    if (!isNaN(v)) grand += v;
    });
    animateTotal(document.getElementById('grand-total'), grand);
}

// ── HELPERS ────────────────────────────────────────────
function renumberRows(list, selector) {
    list.querySelectorAll(selector).forEach((el, i) => {
    el.textContent = String(i + 1).padStart(2, '0');
    });
}

function animateTotal(el, val) {
    el.textContent = val.toLocaleString();
    el.classList.add('changed');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('changed'), 400);
}

// ── INIT ───────────────────────────────────────────────
addSingleAmount();
addTracker();