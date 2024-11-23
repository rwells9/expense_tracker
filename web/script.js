const db = firebase.firestore();

let expenses = [];
let income = [];
let totalExpenses = 0;
let totalIncome = 0;

const typeSelect = document.getElementById('type-select');
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const commentInput = document.getElementById('comment-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const incomeTableBody = document.getElementById('income-table-body');
const totalExpensesCell = document.getElementById('total-expenses');
const totalIncomeCell = document.getElementById('total-income');

function renderRecord(record, id, isExpense) {
    const tableBody = isExpense ? expensesTableBody : incomeTableBody;
    const newRow = tableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const commentCell = newRow.insertCell();
    const actionsCell = newRow.insertCell();

    categoryCell.textContent = record.category;
    amountCell.textContent = record.amount.toFixed(2);
    dateCell.textContent = record.date;
    commentCell.textContent = record.comment || '';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', function () {
        typeSelect.value = isExpense ? 'Expense' : 'Income';
        categorySelect.value = record.category;
        amountInput.value = record.amount;
        dateInput.value = record.date;
        commentInput.value = record.comment;

        deleteRecord(id, isExpense);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteRecord(id, isExpense);
    });

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);
}

function renderRecords() {
    expensesTableBody.innerHTML = '';
    incomeTableBody.innerHTML = '';
    totalExpenses = 0;
    totalIncome = 0;

    expenses.forEach(({ id, data }) => {
        totalExpenses += data.amount;
        renderRecord(data, id, true);
    });

    income.forEach(({ id, data }) => {
        totalIncome += data.amount;
        renderRecord(data, id, false);
    });

    totalExpensesCell.textContent = totalExpenses.toFixed(2);
    totalIncomeCell.textContent = totalIncome.toFixed(2);
}

function fetchRecordsRealTime() {
    db.collection('expenses')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
            expenses = snapshot.docs.filter(doc => doc.data().type === 'Expense').map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            income = snapshot.docs.filter(doc => doc.data().type === 'Income').map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            renderRecords();
        });
}

async function addRecord(record) {
    try {
        await db.collection('expenses').add(record);
    } catch (error) {
        console.error("Error adding record: ", error);
    }
}

async function deleteRecord(id, isExpense) {
    try {
        await db.collection('expenses').doc(id).delete();
    } catch (error) {
        console.error("Error deleting record: ", error);
    }
}

addBtn.addEventListener('click', function () {
    const type = typeSelect.value;
    const category = categorySelect.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const comment = commentInput.value.trim();

    if (!amount || !date) return;

    const record = {
        type,
        category,
        amount,
        date,
        comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    addRecord(record);
    typeSelect.value = 'Expense';
    amountInput.value = '';
    dateInput.value = '';
    categorySelect.value = '';
    commentInput.value = '';
});

fetchRecordsRealTime();
