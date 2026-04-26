# 🏦 Bank Ledger (Decentralized App)

A simple **Web3 banking dApp** built using **Solidity, Hardhat, React, and Ethers.js**.
Users can create accounts, deposit ETH, transfer funds, and withdraw — all powered by a smart contract.

---

## 🚀 Features

* 🔐 Connect wallet using MetaMask
* 🧾 Create on-chain bank account
* 💰 Deposit ETH into contract
* 🔁 Transfer ETH to another user
* 💸 Withdraw ETH

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Blockchain:** Solidity
* **Development Environment:** Hardhat
* **Library:** Ethers.js
* **Wallet:** MetaMask
* **Deployment:** Vercel

---

## 📂 Project Structure

```
bank-ledger/
│
├── contracts/        # Solidity smart contracts
├── scripts/          # Deployment scripts
├── test/             # Contract tests
├── frontend/         # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── hardhat.config.js
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repo

```
git clone https://github.com/shreyaaa2635/Bank-Ledger.git
cd Bank-Ledger
```

---

### 2. Install dependencies

```
npm install
cd frontend
npm install
```

---

### 3. Run local blockchain

```
npx hardhat node
```

---

### 4. Deploy contract (local)

```
npx hardhat run scripts/deploy.js --network localhost
```

👉 Copy deployed contract address

---

### 5. Update frontend

Edit:

```
frontend/src/contract.js
```

Replace contract address with your deployed address.

---

### 6. Run frontend

```
cd frontend
npm start
```

👉 App runs at:

```
http://localhost:3000
```

---
