const form = document.getElementById("financeForm");
const date = document.getElementById("dateFT");
const amount = document.getElementById("amountFT");
const typeFT = document.getElementById("typeFT");
const tableBody = document.getElementById("financeTableBody");
const totalInc = document.getElementById("totalIncome");
const totalEx = document.getElementById("totalExpense");
const balance = document.getElementById("balance");

let financeData = JSON.parse(localStorage.getItem("businessFinanceLog")) || [];

function renderTable() {
    tableBody.innerHTML = "";
    let income = 0;
    let expense = 0;

    financeData.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.typeFT}</td>
            <td>${entry.amount.toFix(2)}</td>   
        `;
        tableBody.appendChild(row);

        if(entry.typeFT === "income") income += entry.amount;
        else expense += entry.amount;
    });

    totalInc.textContent = income.toFixed(2);
    totalEx.textContent = expense.toFixed(2);
    balance.textContent = (income - expense).toFixed(2);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const entry = {
        date: date.value,
        amount: parseFloat(amount.value),
        type: type.value,
        date: new Date().toLocaleDateString(),
    };

    financeData.push(entry);
    localStorage.setItem("businessFinanceLog", JSON.stringify(financeData));
    renderTable();
    form.reset();
});
renderTable();