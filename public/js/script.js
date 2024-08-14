document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', function () {
            const userNameInput = document.getElementById('userName');
            const userName = userNameInput.value.trim();

            if (userName !== "") {
                localStorage.setItem('userName', userName);
                window.location.href = 'budget.html';
            } else {
                alert("Please enter your name to get started.");
            }
        });
    }

    if (window.location.pathname.includes('budget.html')) {
        const userName = localStorage.getItem('userName');
        if (userName) {
            document.querySelector('.sidebar h2').textContent = `Welcome ${userName}`;
        }

        document.querySelectorAll('.category h3').forEach(function (element) {
            element.addEventListener('click', function () {
                const categoryDiv = this.parentElement;
                const subcategories = categoryDiv.querySelectorAll('.subcategory');
                subcategories.forEach(function (subcategory) {
                    if (subcategory.style.display === "none" || subcategory.style.display === "") {
                        subcategory.style.display = "flex";
                    } else {
                        subcategory.style.display = "none";
                    }
                });
            });
        });

        document.querySelectorAll('.add-subcategory-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                const categoryDiv = this.parentElement;
                const newSubcategoryName = prompt("Enter the name of the new subcategory:");

                if (newSubcategoryName && newSubcategoryName.trim() !== "") {
                    const newSubcategory = document.createElement('div');
                    newSubcategory.className = 'subcategory';
                    newSubcategory.innerHTML = `
                        <span>${newSubcategoryName}</span>
                        <span class="assign-amount" data-category="${categoryDiv.querySelector('h3').textContent}" data-subcategory="${newSubcategoryName}">$0.00</span>
                        <button class="remove-subcategory-btn">-</button>`;

                    newSubcategory.querySelector('.assign-amount').addEventListener('click', assignAmountHandler);
                    newSubcategory.querySelector('.remove-subcategory-btn').addEventListener('click', function () {
                        newSubcategory.remove();
                    });

                    categoryDiv.appendChild(newSubcategory);
                } else {
                    alert("Please enter a valid name for the subcategory.");
                }
            });
        });

        const addBalanceButton = document.getElementById('add-balance-button');
        if (addBalanceButton) {
            addBalanceButton.addEventListener('click', function () {
                let balance = prompt("Enter your balance:");

                if (balance !== null && !isNaN(balance) && balance.trim() !== "") {
                    balance = parseFloat(balance).toFixed(2);
                    document.getElementById('balance-amount').textContent = `$${balance}`;
                    document.getElementById('current-balance').textContent = `$${balance}`;
                } else {
                    alert("Please enter a valid amount.");
                }
            });
        }

        document.querySelectorAll('.assign-amount').forEach(function (element) {
            element.addEventListener('click', assignAmountHandler);
        });

        const addCategoryButton = document.getElementById('add-category-button');
        if (addCategoryButton) {
            addCategoryButton.addEventListener('click', function () {
                const newCategoryName = prompt("Enter the name of the new category:");

                if (newCategoryName && newCategoryName.trim() !== "") {
                    const newCategory = document.createElement('div');
                    newCategory.className = 'category';
                    newCategory.innerHTML = `
                        <h3>${newCategoryName}</h3>
                        <button class="expand-collapse-btn">+</button>
                        <button class="add-subcategory-btn">+</button>`;

                    newCategory.querySelector('h3').addEventListener('click', function () {
                        const subcategories = newCategory.querySelectorAll('.subcategory');
                        subcategories.forEach(function (subcategory) {
                            if (subcategory.style.display === "none" || subcategory.style.display === "") {
                                subcategory.style.display = "flex";
                            } else {
                                subcategory.style.display = "none";
                            }
                        });
                    });

                    newCategory.querySelector('.add-subcategory-btn').addEventListener('click', function () {
                        const newSubcategoryName = prompt("Enter the name of the new subcategory:");

                        if (newSubcategoryName && newSubcategoryName.trim() !== "") {
                            const newSubcategory = document.createElement('div');
                            newSubcategory.className = 'subcategory';
                            newSubcategory.innerHTML = `
                                <span>${newSubcategoryName}</span>
                                <span class="assign-amount" data-category="${newCategoryName}" data-subcategory="${newSubcategoryName}">$0.00</span>
                                <button class="remove-subcategory-btn">-</button>`;

                            newSubcategory.querySelector('.assign-amount').addEventListener('click', assignAmountHandler);
                            newSubcategory.querySelector('.remove-subcategory-btn').addEventListener('click', function () {
                                newSubcategory.remove();
                            });

                            newCategory.appendChild(newSubcategory);
                        } else {
                            alert("Please enter a valid name for the subcategory.");
                        }
                    });

                    document.querySelector('.category-list').appendChild(newCategory);
                } else {
                    alert("Please enter a valid name for the category.");
                }
            });
        }
    }
});

function assignAmountHandler() {
    let assignAmount = prompt("Enter amount to assign:");

    if (assignAmount !== null && !isNaN(assignAmount) && assignAmount.trim() !== "") {
        assignAmount = parseFloat(assignAmount).toFixed(2);
        let currentBalance = parseFloat(document.getElementById('balance-amount').textContent.slice(1));
        let newBalance = currentBalance - assignAmount;

        if (newBalance < 0) {
            alert("You have assigned more than your available balance!");
        } else {
            document.getElementById('balance-amount').textContent = `$${newBalance.toFixed(2)}`;
            document.getElementById('current-balance').textContent = `$${newBalance.toFixed(2)}`;
            this.textContent = `$${assignAmount}`;
        }
    } else {
        alert("Please enter a valid amount.");
    }
}

