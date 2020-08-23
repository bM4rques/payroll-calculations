window.addEventListener('load', start);

var salary = null;
var otherDeductions = null;
var dependents = null;
var clearTextFields = document.querySelector('#clearTextFields');
var calculatePayroll = document.querySelector('#calculatePayroll');
var payroll_salary = null;
var payroll_inssDeduction = null;
var payroll_irrfDeduction = null;
var payroll_otherDeductions = null;
var payroll_totalEarnings = null;
var payroll_totalDeductions = null;
var payroll_netSalary = null;

function start() {
  preventFormSubmit();
  clearTextFields.addEventListener('click', clear);
  calculatePayroll.addEventListener('click', generatePayroll);
}

function preventFormSubmit() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

function clear() {
  getFields();

  salary.value = '';
  otherDeductions.value = '';
  dependents.value = '';
  payroll_salary.textContent = '-';
  payroll_inssDeduction.textContent = '-';
  payroll_irrfDeduction.textContent = '-';
  payroll_otherDeductions.textContent = '-';
  payroll_totalEarnings.textContent = '-';
  payroll_totalDeductions.textContent = '-';
  payroll_netSalary.textContent = '-';

  salary.focus();
}

function getFields() {
  salary = document.querySelector('#salary');
  otherDeductions = document.querySelector('#otherDeductions');
  dependents = document.querySelector('#dependents');
  payroll_salary = document.querySelector('#payroll_salary');
  payroll_inssDeduction = document.querySelector('#payroll_inssDeduction');
  payroll_irrfDeduction = document.querySelector('#payroll_irrfDeduction');
  payroll_otherDeductions = document.querySelector('#payroll_otherDeductions');
  payroll_totalEarnings = document.querySelector('#payroll_totalEarnings');
  payroll_totalDeductions = document.querySelector('#payroll_totalDeductions');
  payroll_netSalary = document.querySelector('#payroll_netSalary');
}

function generatePayroll() {
  getFields();

  var totalDeductions =
    parseInt(otherDeductions.value) +
    inssDeduction(salary.value) +
    irrfDeduction(salary.value, dependents.value);

  payroll_salary.textContent = 'R$ ' + salary.value;
  payroll_inssDeduction.textContent =
    'R$ ' + Math.round(inssDeduction(salary.value) * 100) / 100; // Rounding the number to two decimal places
  payroll_irrfDeduction.textContent =
    'R$ ' +
    Math.round(irrfDeduction(salary.value, dependents.value) * 100) / 100;
  payroll_otherDeductions.textContent = 'R$ ' + otherDeductions.value;
  payroll_totalEarnings.textContent = 'R$ ' + salary.value;
  payroll_totalDeductions.textContent =
    'R$ ' + Math.round(totalDeductions * 100) / 100;
  payroll_netSalary.textContent =
    'R$ ' + Math.round(netSalary(salary.value, totalDeductions) * 100) / 100;
}

function inssDeduction(grosssalary) {
  if (grosssalary > 6101.06) {
    return 713.1;
  } else {
    if (grosssalary > 3134.4) {
      return 297.77 + (grosssalary - 3134.4) * 0.14;
    } else {
      if (grosssalary > 2089.6) {
        return 172.39 + (grosssalary - 2089.6) * 0.12;
      } else {
        if (grosssalary > 1045) {
          return 78.38 + (grosssalary - 1045) * 0.09;
        } else {
          return grosssalary * 0.075;
        }
      }
    }
  }
}

function irrfDeduction(grossSalary, dependentsQuantity) {
  var baseIrrf =
    grossSalary - dependentsQuantity * 189.59 - inssDeduction(grossSalary);

  if (baseIrrf > 4664.68) {
    return baseIrrf * 0.275 - 869.36;
  } else {
    if (baseIrrf > 3751.05) {
      return baseIrrf * 0.225 - 636.13;
    } else {
      if (baseIrrf > 2826.65) {
        return baseIrrf * 0.15 - 354.8;
      } else {
        if (baseIrrf > 1903.98) {
          return baseIrrf * 0.075 - 142.8;
        } else {
          return 0;
        }
      }
    }
  }
}

function netSalary(grossSalary, totalDeductions) {
  return grossSalary - totalDeductions;
}
