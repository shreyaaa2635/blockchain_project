import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "./contract";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [balance, setBalance] = useState("0");

  // 🔹 CONNECT WALLET
  useEffect(() => {
    const init = async () => {
      try {
        if (!window.ethereum) {
          alert("Install MetaMask");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const contractInstance = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );

        setContract(contractInstance);
        setAccount(address);

        // 🔥 Fetch balance directly (no external dependency)
        const bal = await contractInstance.getBalance();
        setBalance(ethers.formatEther(bal));

      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, []);

  // 🔹 GET BALANCE
  const getBalance = async () => {
    try {
      if (!contract) return;

      const bal = await contract.getBalance();
      setBalance(ethers.formatEther(bal));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 CREATE ACCOUNT
  const createAccount = async () => {
    try {
      const tx = await contract.createAccount();
      await tx.wait();
      alert("Account created!");
      await getBalance();
    } catch (err) {
      console.error(err);
      alert(err.reason || "Error creating account");
    }
  };

  // 🔹 DEPOSIT
  const deposit = async () => {
    try {
      if (!amount) return alert("Enter amount");

      const tx = await contract.deposit({
        value: ethers.parseEther(amount),
      });

      await tx.wait();
      alert("Deposit successful!");
      await getBalance();
    } catch (err) {
      console.error(err);
      alert(err.reason || "Deposit failed");
    }
  };

  // 🔹 TRANSFER
  const transfer = async () => {
    try {
      if (!amount || !receiver)
        return alert("Enter amount & receiver");

      const tx = await contract.transfer(
        receiver,
        ethers.parseEther(amount)
      );

      await tx.wait();
      alert("Transfer successful!");
      await getBalance();
    } catch (err) {
      console.error(err);
      alert(err.reason || "Transfer failed");
    }
  };

  // 🔹 WITHDRAW
  const withdraw = async () => {
    try {
      if (!amount) return alert("Enter amount");

      const tx = await contract.withdraw(
        ethers.parseEther(amount)
      );

      await tx.wait();
      alert("Withdraw successful!");
      await getBalance();
    } catch (err) {
      console.error(err);
      alert(err.reason || "Withdraw failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏦 Bank Ledger</h2>

        <p style={styles.label}>
          <strong>Account:</strong> {account}
        </p>

        <p style={styles.balance}>
          Balance: {balance} ETH
        </p>

        <button style={styles.primaryBtn} onClick={createAccount}>
          Create Account
        </button>

        <input
          style={styles.input}
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Receiver Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />

        <div style={styles.buttonRow}>
          <button style={styles.btn} onClick={deposit}>
            Deposit
          </button>

          <button style={styles.btn} onClick={transfer}>
            Transfer
          </button>

          <button style={styles.btnDanger} onClick={withdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "#fff",
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "16px",
    width: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    fontSize: "12px",
    wordBreak: "break-all",
    color: "#94a3b8",
  },
  balance: {
    fontSize: "20px",
    margin: "15px 0",
    color: "#22c55e",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  btn: {
    flex: 1,
    margin: "5px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#3b82f6",
    color: "#fff",
  },
  btnDanger: {
    flex: 1,
    margin: "5px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#ef4444",
    color: "#fff",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    marginBottom: "10px",
    cursor: "pointer",
  },
};

export default App;