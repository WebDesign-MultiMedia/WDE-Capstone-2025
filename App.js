
    /*** FINANCE TRACKER ***/
    const financeForm = document.getElementById('financeForm');
    const financeTableBody = document.getElementById('financeTableBody');
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpenseEl = document.getElementById('totalExpense');
    const balanceEl = document.getElementById('balance');

    let financeData = JSON.parse(localStorage.getItem('financeData')) || [];

    function renderFinanceData() {
        financeTableBody.innerHTML = '';
        let totalIncome = 0;
        let totalExpense = 0;

        financeData.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-1">${entry.date}</td>
                <td class="p-1">${entry.notes}</td>
                <td class="p-1">${entry.type}</td>
                <td class="p-1">$${parseFloat(entry.amount).toFixed(2)}</td>
                <td class="p-1">
                    <button class="bg-red-500 text-white px-2 rounded delete-btn" data-index="${index}">D</button>
                </td>
            `;
            financeTableBody.appendChild(row);

            if (entry.type === 'income') {
                totalIncome += parseFloat(entry.amount);
            } else {
                totalExpense += parseFloat(entry.amount);
            }
        });

        totalIncomeEl.textContent = totalIncome.toFixed(2);
        totalExpenseEl.textContent = totalExpense.toFixed(2);
        balanceEl.textContent = (totalIncome - totalExpense).toFixed(2);

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                financeData.splice(index, 1);
                localStorage.setItem('financeData', JSON.stringify(financeData));
                renderFinanceData();
            });
        });
    }

    if (financeForm) {
        financeForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const type = document.getElementById('typeFT').value;
            const amount = document.getElementById('amountFT').value;
            const date = document.getElementById('dateFT').value;
            const category = document.getElementById('categoryTF').value;
            const notes = document.getElementById('notesFT').value;

            if (!type || !amount || !date) {
                alert('Please fill out required fields');
                return;
            }

            const newEntry = { type, amount, date, category, notes };
            financeData.push(newEntry);
            localStorage.setItem('financeData', JSON.stringify(financeData));
            renderFinanceData();
            financeForm.reset();
        });

        renderFinanceData();
    }


//**
// 
// 
//  */

/** Tracker Options **/
const trackerOptions = document.getElementById('BusinessTrackerChoices');

const financeOpt = document.getElementById('finance');
const finanForm = document.getElementById('financeTracker');

const purchaseOpt = document.getElementById('purchase');
const PTform = document.getElementById('purchaseTracker');

const paymentOpt = document.getElementById('payments')
const paymentForm = document.getElementById('PaymentTracker');

const inventoryOpt = document.getElementById('inventory')
const InventoryTrackerForm = document.getElementById('InventoryTracker');

const salesOpt = document.getElementById('sales')
const SalesTrackerForm = document.getElementById('SalesTracker');

const taskManagersOpt = document.getElementById('taskManager')
const TaskManagerForm = document.getElementById('To-Do_TaskManager');

const clientVendorLogOpt = document.getElementById('clientVendorLog')
const ClientVendorLogForm = document.getElementById('ClientVendorLog');

const serviceLogOpt = document.getElementById('serviceLog')
const ServiceLogForm = document.getElementById('ServiceLog');


    const formsMap = {
        finance: document.getElementById("financeTracker"),
        purchase: document.getElementById("purchaseTracker"),
        payments: document.getElementById("PaymentTracker"),
        inventory: document.getElementById("InventoryTracker"),
        sales: document.getElementById("SalesTracker"),
        taskManager: document.getElementById("To-Do_TaskManager"),
        clientVendorLog: document.getElementById("ClientVendorLog"),
        serviceLog: document.getElementById("ServiceLog")
    };

    // Hide all forms
    function hideAllForms() {
        Object.values(formsMap).forEach(form => form.style.display = "none");
    }

    // Show form when clicked
    Object.keys(formsMap).forEach(id => {
        const option = document.getElementById(id);
        if (option) {
            option.addEventListener("click", () => {
                hideAllForms();
                trackerOptions.style.display = "none";
                formsMap[id].style.display = "block";
            });
        }
    });

    // Optionally create a "Back" button in each form
    Object.values(formsMap).forEach(form => {
        const backBtn = document.createElement("button");
        backBtn.innerText = "← Back";
        backBtn.className = "bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mb-3";
        backBtn.addEventListener("click", () => {
            form.style.display = "none";
            trackerOptions.style.display = "block";
        });
        form.prepend(backBtn);
    });

    // Initial state
    hideAllForms();
