// report.js

function Report(expenses, income) {
    this.expenses = expenses; // Array of expenses
    this.income = income; // Array of income
  }
  
  // Generate a report for total expenses
  Report.prototype.generateExpenseReport = function() {
    if (!this.expenses || this.expenses.length === 0) {
      console.warn("Expenses array is empty. Returning 0.");
      return 0;
    }
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  };
  
  // Generate a report for total income
  Report.prototype.generateIncomeReport = function() {
    if (!this.income || this.income.length === 0) {
      console.warn("Income array is empty. Returning 0.");
      return 0;
    }
    return this.income.reduce((total, income) => total + income.amount, 0);
  };
  
  // Generate a spending category report
  Report.prototype.generateCategoryReport = function() {
    if (!this.expenses || this.expenses.length === 0) {
      console.warn("Expenses array is empty. Returning an empty object.");
      return {};
    }
    const categoryTotals = {};
    this.expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    return categoryTotals;
  };
  
  // Example usage:
  // Uncomment the following to test this file independently
  // const expenses = [
  //   { category: 'Food', amount: 50 },
  //   { category: 'Transport', amount: 30 },
  //   { category: 'Food', amount: 20 }
  // ];
  // const income = [
  //   { source: 'Salary', amount: 500 },
  //   { source: 'Freelance', amount: 150 }
  // ];
  // const report = new Report(expenses, income);
  // console.log("Total Expenses:", report.generateExpenseReport());
  // console.log("Total Income:", report.generateIncomeReport());
  // console.log("Category Report:", report.generateCategoryReport());
  