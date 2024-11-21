class Report {
  constructor(expenses = [], income = []) {
    this.expenses = expenses; // Array of expenses
    this.income = income; // Array of income
  }

  // Generate a report for total expenses
  generateExpenseReport() {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  // Generate a report for total income
  generateIncomeReport() {
    return this.income.reduce((total, income) => total + income.amount, 0);
  }

  // Generate a spending category report
  generateCategoryReport() {
    const categoryTotals = {};
    this.expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    return categoryTotals;
  }

  // Generate income source report
  generateIncomeSourceReport() {
    const sourceTotals = {};
    this.income.forEach(entry => {
      if (!sourceTotals[entry.source]) {
        sourceTotals[entry.source] = 0;
      }
      sourceTotals[entry.source] += entry.amount;
    });
    return sourceTotals;
  }
}

// Fetch data from Firebase and initialize the report
async function initializeReport() {
  const expensesSnapshot = await db.collection('expenses').get();
  const incomeSnapshot = await db.collection('income').get();

  const expenses = expensesSnapshot.docs.map(doc => doc.data());
  const income = incomeSnapshot.docs.map(doc => doc.data());

  const report = new Report(expenses, income);

  // Generate and display the reports
  displayExpenseReport(report);
  displayIncomeReport(report);
  displayCategoryReport(report);
  displayCharts(report);
}

// Display total expense
function displayExpenseReport(report) {
  const totalExpenses = report.generateExpenseReport();
  document.getElementById("report-expense").innerText = `Total Expenses: $${totalExpenses.toFixed(2)}`;
}

// Display total income
function displayIncomeReport(report) {
  const totalIncome = report.generateIncomeReport();
  document.getElementById("report-income").innerText = `Total Income: $${totalIncome.toFixed(2)}`;
}

// Display category report
function displayCategoryReport(report) {
  const categoryReport = report.generateCategoryReport();
  const categoryReportList = document.getElementById("report-category");
  categoryReportList.innerHTML = '';

  for (const category in categoryReport) {
    const listItem = document.createElement("li");
    listItem.innerText = `${category}: $${categoryReport[category].toFixed(2)}`;
    categoryReportList.appendChild(listItem);
  }
}

// Generate and display charts
function displayCharts(report) {
  const categoryData = report.generateCategoryReport();
  const incomeData = report.generateIncomeSourceReport();

  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  const incomeLabels = Object.keys(incomeData);
  const incomeValues = Object.values(incomeData);

  // Expense Chart
  const expenseCtx = document.getElementById('expenseChart').getContext('2d');
  new Chart(expenseCtx, {
    type: 'pie',
    data: {
      labels: categoryLabels,
      datasets: [{
        data: categoryValues,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40']
      }]
    }
  });

  // Income Chart
  const incomeCtx = document.getElementById('incomeChart').getContext('2d');
  new Chart(incomeCtx, {
    type: 'bar',
    data: {
      labels: incomeLabels,
      datasets: [{
        data: incomeValues,
        backgroundColor: ['#4bc0c0', '#36a2eb', '#ff6384', '#9966ff', '#ffcd56', '#ff9f40']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Initialize the report on page load
window.onload = initializeReport;
