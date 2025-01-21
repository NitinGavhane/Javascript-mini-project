# **Banking Management System**

### **Overview**
This repository contains a **JavaScript-based Banking Management System**, simulating core banking functionalities such as role-based access, account creation, customer management, and basic banking operations.

---

### **Features**
1. **Role-Based Access**:
   - **Admin**: Approve accounts, create user credentials.
   - **Manager**: Approve pending accounts for Admin action.
   - **Customer**: Manage accounts, deposit money, and check balances.

2. **Account Management**:
   - Customer account creation with validation for phone, Aadhar, and PAN details.
   - Workflow for account approval.
   - Auto-generated usernames, passwords, and account numbers.

3. **Banking Operations**:
   - Deposit money to activate account services.
   - Access additional banking features when balance ≥ ₹1000.

---

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/).
2. Install the required Node.js module:
   ```bash
   npm install readline-sync
   ```

---

### **How to Run**
1. Clone this repository:
   ```bash
   git clone https://github.com/NitinGavhane/Javascript-mini-project.git
   cd Javascript-mini-project
   ```

2. Run the application using Node.js:
   ```bash
   node <filename>.js
   ```
   Replace `<filename>` with the name of the main file (e.g., `bankapp.js`).

---

### **Usage Instructions**
1. **Run the Program**: A menu will appear allowing you to select a role:
   - **1. Admin**
   - **2. Manager**
   - **3. Customer**

2. **Admin Operations**:
   - Login with credentials:
     - **Username**: `adminx`
     - **Password**: `Admin@123`
   - Approve accounts and create user credentials.

3. **Manager Operations**:
   - Login with credentials:
     - **Username**: `manager`
     - **Password**: `123`
   - Approve pending account requests.

4. **Customer Operations**:
   - Create a new account or log in with existing credentials.
   - Deposit money, check balances, and manage account.

---

### **Technical Details**
- **Programming Language**: JavaScript
- **Node.js Module**: `readline-sync` for interactive user input.
- **Dynamic Features**:
  - Auto-generated credentials (username, password).
  - Validation for Aadhar, PAN, and phone details.

---

### **Future Enhancements**
- Add persistent data storage (e.g., databases).
- Include advanced banking operations like:
  - Transaction history.
  - Money transfers.
  - Payee management.
- Improve security using encryption and password hashing.

---

### **Contributing**
Feel free to contribute to this project by submitting issues or pull requests. Please ensure any new feature is well-tested and documented.

