const colorPalette = ['#f08080', '#90ee90', '#add8e6', '#ffdead', '#fafad2'];
let colorIndex = 0; 
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let nextId = expenses.length ? Math.max(...expenses.map(ex => ex.id)) + 1 : 1;

document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('add-expense').addEventListener('click', addExpense);
    document.getElementById('clear-expenses').addEventListener('click', clearAllExpenses);
    renderExpenses(); 
    calculateTotal();
}); 

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && amount > 0) {
        expenses.push({ id: nextId++, description, amount });
        saveExpenses();
        renderExpenses();
        clearForm();

        document.body.style.backgroundColor = colorPalette[colorIndex];
        colorIndex = (colorIndex + 1) % colorPalette.length;

        calculateTotal(); // Update total after adding 
    }
}

function deleteExpense(id) {
    expenses = expenses.filter(item => item.id !== id);
    saveExpenses();
    renderExpenses();
    calculateTotal(); // Update total after deleting
}

function editExpense(id) {
    const expenseToEdit = expenses.find(item => item.id === id);
    if (expenseToEdit) {
        const listItem = document.querySelector(`[data-expense-id="${id}"]`);
        if (listItem) {
            listItem.innerHTML = `
                <input type="text" class="edit-description" value="${expenseToEdit.description}">
                <input type="number" class="edit-amount" value="${expenseToEdit.amount}">
                <button onclick="updateExpense(${expenseToEdit.id})">Save</button>
                <button onclick="cancelEdit(${expenseToEdit.id})">Cancel</button>
            `; 
        }
    }
}

function updateExpense(id) {
    const index = expenses.findIndex(item => item.id === id);
    if (index > -1) {
        const descriptionInput = document.querySelector(`[data-expense-id="${id}"] .edit-description`);
        const amountInput = document.querySelector(`[data-expense-id="${id}"] .edit-amount`);

        expenses[index].description = descriptionInput.value;
        expenses[index].amount = parseFloat(amountInput.value);

        saveExpenses();
        renderExpenses(); 
        calculateTotal(); // Update total after editing 
    }
}

function cancelEdit(id) {
    renderExpenses(); 
}


function renderExpenses() {
    const itemsList = document.getElementById('items');
    itemsList.innerHTML = ''; 

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${expense.description}</span> = ₹${expense.amount}  
            <button onclick="deleteExpense(${expense.id})">Delete</button>
            <button onclick="editExpense(${expense.id})">Edit</button> 
        `;
        listItem.setAttribute('data-expense-id', expense.id); 
        itemsList.appendChild(listItem);
    });
}

function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function clearAllExpenses() {
    if (confirm("Are you sure you want to clear all expenses?")) {
        expenses = [];
        saveExpenses();
        renderExpenses();
        calculateTotal(); // Update total after clearing 
    }
}

function calculateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total').textContent = total; 
} 
