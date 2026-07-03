
const form = document.getElementById("expenseForm");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
const expenseList = document.getElementById("expenseList");

//localStorage

let expenses = JSON.parse(localStorage.getItem("expenses"))||[];

showExpenses();

//add expenseForm
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const expense = {
        id: Date.now(),
        amount:amount.value,
        description:description.value,
        category:category.value
    };

    expenses.push(expense);

    localStorage.setItem("expenses",JSON.stringify(expenses));

    showExpenses();

    form.reset();
});

//display

function showExpenses(){
    expenseList.innerHTML = "";

    expenses.forEach((expense)=>{
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-item-center";

        li.innerHTML = `<span>Rs.${expense.amount} - ${expense.category} - ${expense.description}</span>
        <div>
           <button class="btn btn-warning btn-sm me-2" onclick="editExpense(${expense.id})">
              Edit 
           </button>

           <button class="btn btn-danger btn-sm" onclick="deleteExpense(${expense.id})">
              Delete
           </button>
        </div>`;

        expenseList.appendChild(li);
    });
}

//delete 
function deleteExpense(id){
    expenses = expenses.filter((expense)=> expense.id !== id);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    showExpenses();
}

//edit

function editExpense(id){
    const expense = expenses.find((expense)=> expense.id === id);

    amount.value = expense.amount;
    description.value = expense.description;
    category.value = expense.category;

    deleteExpense(id);
}
