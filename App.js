
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
                <td class="p-1 text-red-700 underline">${entry.type}</td>
                <td class="p-1 text-yellow-700 underline">$${parseFloat(entry.amount).toFixed(2)}</td>
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
            } else{
                    Swal.fire({
                    title: 'Successfully Submitted !',
                    text: 'Thank you for tracking !',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
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

    // 
    // 
    /**
     * Payment Tracker
     */
   const form = document.getElementById('paymentForm');
    const cardContainer = document.getElementById('paymentCards');

    function loadPayments() {
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        cardContainer.innerHTML = '';

        payments.forEach((payment, index) => {
            const card = document.createElement('div');
            card.className = "bg-gray-300 rounded shadow-xl/60 text-center ";

            card.innerHTML = `
                <p><strong>Date:</strong> ${payment.date}</p>
                <p class="text-red-500 shadow-xl"><strong>Type:</strong> ${payment.type}</p>
                <p><strong>Vendor/Client:</strong> ${payment.vendorClient}</p>
                <p><strong>Items/Service:</strong> ${payment.itemsService}</p>
                <p class="text-green-500 shadow-xl "><strong>Amount:</strong> $${parseFloat(payment.amount).toFixed(2)}</p>
                <p><strong>Method:</strong> ${payment.method}</p>
                <p class="text-yellow-600 shadow-xl "><strong>Status:</strong> ${payment.status}</p>
                <p><strong>Notes:</strong> ${payment.notes}</p>
                <button onclick="deletePayment(${index})" class="mt-2 mb-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            `;

            cardContainer.appendChild(card);
        });
    }

    function deletePayment(index) {
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.splice(index, 1);
        localStorage.setItem('payments', JSON.stringify(payments));
        loadPayments();
    }

    form.addEventListener('submit', (e) => {

        e.preventDefault();

    

        const payment = {
            date: document.getElementById('date').value,
            type: document.getElementById('paymentType').value,
            vendorClient: document.getElementById('vendorClient').value,
            itemsService: document.getElementById('itemsService').value,
            amount: document.getElementById('amount').value,
            method: document.getElementById('paymentMethod').value,
            status: document.getElementById('status').value,
            notes: document.getElementById('notes').value,
        };

       
            if (!payment.date || !payment.type || !payment.vendorClient|| !payment.itemsService || !payment.amount || !payment.method || !payment.status) {
                    alert('ERRR!')
                    return;
        } else {
                  Swal.fire({
                    title: 'Successfully Submitted !',
                    text: 'Thank you for tracking !',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
        }

        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(payments));

        form.reset();
        loadPayments();
    });

    document.addEventListener('DOMContentLoaded', loadPayments);