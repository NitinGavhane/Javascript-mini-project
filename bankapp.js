const readline = require('readline-sync');

let pendingAccounts = [];
let approvedAccounts = [];
let customers = [];

function mainMenu() {
    console.log('-----------------------------------------------------------------------');
    console.log('1. Admin');
    console.log('2. Manager');
    console.log('3. Customer');
    const choice = readline.questionInt('\nChoose your role: ');

    switch (choice) {
        case 1:
            adminLogin();
            break;
        case 2:
            managerLogin();
            break;
        case 3:
            customerMenu();
            break;
        default:
            console.log('Invalid choice!');
    }
}

function adminLogin() {
    console.log('\n-----------------------------------------------------------------------');

    const username = readline.question('Enter Admin Username: ');
    const password = readline.question('Enter Admin Password: ', { hideEchoBack: true });

    if (username === 'adminx' && password === 'Admin@123') {
        console.log('\nAdmin Login Successful');
        adminFunctions();
    } else {
        console.log('Invalid credentials.');
    }
    mainMenu();
}

function adminFunctions() {
    if (approvedAccounts.length > 0) {
        console.log('\nApproved Accounts:');
        approvedAccounts.forEach((account, index) => {
            console.log(`${index + 1}. ${account.name}`);
            if (readline.keyInYN('\nCreate credentials for this account? ')) {
                const username = generateUsername(account);
                const password = generatePassword();
                const accountNumber = generateAccountNumber(); 
                customers.push({ ...account, username, password, accountNumber, balance: 0 });
                
                
                console.log(`Customer created! Username: ${username}, Password: ${password}, Account Number: ${accountNumber}`);

            }
        });
    } else {
        console.log('No approved accounts.');
    }
    mainMenu();
}

function generateAccountNumber() {
    let accountNumber = '';
    for (let i = 0; i < 12; i++) {
        accountNumber += Math.floor(Math.random() * 10); // Generate a random number between 0-9
    }
    return accountNumber; // Ensure account number is a 12-digit number
}

function generateUsername(customer) {
    return customer.name.toLowerCase().replace(/[^a-z0-9.]/g, '').slice(0, 8);
}

function generatePassword() {
    return Math.random().toString(36).slice(-8); // Generates an 8-character password
}


function managerLogin() {
    console.log('\n-----------------------------------------------------------------------');
    const username = readline.question('Enter Manager Username: ');
    const password = readline.question('Enter Manager Password: ', { hideEchoBack: true });

    if (username === 'manager' && password === '123') {
        console.log('\nManager Login Successful');
        if (pendingAccounts.length > 0) {
            console.log('Pending Accounts:');
            pendingAccounts.forEach((account, index) => {
                console.log(`${index + 1}. ${account.name}`);
            });
            const choice = readline.questionInt('Enter account number to approve: ');
            if (choice > 0 && choice <= pendingAccounts.length) {
                approvedAccounts.push(pendingAccounts[choice - 1]);
                pendingAccounts.splice(choice - 1, 1);
                console.log('Account approved! Admin can now create credentials.');
            }
        } else {
            console.log('No pending accounts.');
        }
        mainMenu();
    } else {
        console.log('Invalid credentials.');
        mainMenu();
    }
}

function customerMenu() {
    console.log('-----------------------------------------------------------------------');
    console.log('\n1. Create Account');
    console.log('2. Customer Login');
    console.log('3. Exit');
    const choice = readline.questionInt('Choose an option: ');

    if (choice === 1) {
        // Existing code for account creation
        const name = readline.question('\nEnter Name: ');
        const address = readline.question('Enter Address: ');
        const city = readline.question('Enter City: ');
        const phone = readline.question('Enter Phone Number: ');
        const aadharCard = readline.question('Enter Aadhar Card: ');
        const panCard = readline.question('Enter PAN Card: ');

        if (isValidPhoneNumber(phone) && isValidAadharCard(aadharCard) && isValidPanCard(panCard)) {
            pendingAccounts.push({ name, address, city, phone, aadharCard, panCard });
            console.log('Account request submitted for approval.');
            mainMenu();
        } else {
            console.log('Invalid input. Please enter valid details.');
        }
    } else if (choice === 2) {
        const username = readline.question('\nEnter Username: ');
        const password = readline.question('Enter Password: ', { hideEchoBack: true });

        const customer = customers.find(c => c.username === username && c.password === password);
        if (customer) {
            console.log(`\nWelcome, ${customer.name}!`);
            if (customer.balance >= 1000) {
                console.log('-----------------------------------------------------------------------');
                console.log('\n1. Show Profile Details');
                console.log('2. Show Bank Balance');
                console.log('3. Transaction Statement');
                console.log('4. Money Transfer');
                console.log('5. Add Payee');
                console.log('6. Fixed Deposits');
                console.log('7. Recurring Deposits');
                console.log('8. Mutual Funds');
                console.log('9. Demat Account');
                console.log('10. Debit Card');
                console.log('11. Credit Card');
                console.log('12. Deposit Money'); // Option to deposit money
                console.log('13. Exit');
                const option = readline.questionInt('Choose an option: ');
                switch (option) {
                    case 1:
                        console.log(customer);
                        break;
                    case 2:
                        console.log(`Bank Balance: ₹${customer.balance}`);
                        break;
                    case 12:
                        depositMoney(customer); 
                        break;
                    case 13:
                        console.log('Exiting Customer Portal...');
                        return; 
                    default:
                        console.log('Invalid option.');
                }
            } else {
                console.log('\nYour balance is below ₹1000. Please deposit the required amount to access services.');
                depositMoney(customer);
                customerMenu();
            }
        } else {
            console.log('Invalid credentials or account not approved yet.');
        }
    } else {
        console.log('Invalid option. Please choose again.');
    }
    customerMenu();
}

function depositMoney(customer) {
    const depositAmount = readline.questionFloat('\nEnter the amount you want to deposit: ₹');
    if (depositAmount > 0) {
        customer.balance += depositAmount; // Add the deposit amount to the balance
        console.log(`Deposit successful! Your new balance is ₹${customer.balance}.`);
        
    } else {
        console.log('Invalid deposit amount. Please enter a positive amount.');
    }
}



function isValidPhoneNumber(phoneNumber) {
    if (phoneNumber.length > 10) {
        console.log('Phone number cannot exceed 10 digits.');
        return false;
    }
    return /^\d{10}$/.test(phoneNumber);
}

function isValidAadharCard(aadharCard) {
    if (aadharCard.length > 12) {
        console.log('Aadhar card number cannot exceed 12 digits.');
        return false;
    }
    return /^\d{12}$/.test(aadharCard);
}

function isValidPanCard(panCard) {
    if (panCard.length !== 10) {
        console.log('PAN card must be exactly 10 characters long.');
        return false;
    }
    return /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(panCard);
}


function generateUsername(customer) {
    return customer.name.toLowerCase().replace(/[^a-z0-9.]/g, '').slice(0, 8);
}

function generatePassword() {
    return Math.random().toString(36).slice(-8);
}

function generateBankAccountNumber(aadharCard, password) {
    return aadharCard.slice(-6) + password.slice(-6);
}

mainMenu();
