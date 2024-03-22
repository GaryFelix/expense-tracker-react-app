import { useState } from "react";
import "./style.css";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useAddBalance } from "../../hooks/useAddBalance";
import siteLogo from "../../images/logo.png";

export const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const navigate = useNavigate();

  const { addTransaction } = useAddTransactions();
  const { addBalance } = useAddBalance();
  const { transactions, transactionTotals } = useGetTransactions();
  // const { name } = useGetUserInfo();
  const { name, profilePhoto } = useGetUserInfo();

  const { balance, income, expenses } = transactionTotals;

  let updateBalance = 0;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0);

    if (transactionType === "income") {
      updateBalance = Number(balance) + Number(transactionAmount);
    } else {
      updateBalance = balance - transactionAmount;
    }

    addBalance({
      updateBalance,
      description,
    });
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  let createdDate = new Date().toDateString();

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          {/* navbar content */}
          <nav className="navbar-content">
            <div className="site-logo">
              <img src={siteLogo} alt="site-logo" draggable="false" />
            </div>
            <div className="nav-links">
              <ul>
                <li>
                  <Link to="#" style={{ color: "#00a700" }}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={signOutUser}>
                    Signout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="display-name">
            <div className="name">
              <h1>
                HOWDY
                <span className="userName"> {name},</span>
              </h1>
              <div>
                <h2 className="current-time">{createdDate}</h2>
              </div>
            </div>
            <div className="profile-img">
              <img src={profilePhoto} alt="profile-pic" draggable='false' />
            </div>
          </div>
          <div className="dashboard-content1">
            <div className="balance">
              <h4>Your Balance</h4>
              {balance >= 0 ? <p>$ {balance}</p> : <p>-$ {balance * -1}</p>}
            </div>
            <div className="income">
              <h4>Total Income</h4>
              <p>$ {income}</p>
            </div>
            <div className="expenses">
              <h4>Total Expenses</h4>
              <p>$ {expenses}</p>
            </div>
          </div>
          <div className="add-Balance-Details">
            <h2>Add Transaction Details</h2>
            <div className="add-transaction">
              <form onSubmit={onSubmit}>
                <label htmlFor="description">
                  <span className="mandatory">*</span>&nbsp;Enter Your
                  Transaction Name:
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={description}
                  className="form-detail"
                  required
                  autoComplete="off"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <label htmlFor="amount">
                  <span className="mandatory">*</span>&nbsp;Manually Enter Your
                  Transaction Amount:
                </label>
                <br />
                <input
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  className="form-detail amount"
                  value={transactionAmount}
                  required
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
                <br />
                <label htmlFor="type" className="transaction-type">
                  <span className="mandatory">*</span>&nbsp;Select Your
                  Transaction Type:
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  id="expense"
                  name="expense"
                  className="radio-btn"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="expense"> Expense</label>
                &nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  id="income"
                  value="income"
                  name="income"
                  className="radio-btn"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="income"> Income</label>
                <br />
                <button type="submit"> Add Transaction</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="transactions">
        <h3>{name} &nbsp;Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const {
              description,
              transactionAmount,
              transactionType,
              currentDate,
            } = transaction;
            return (
              <li key={transaction.id}>
                <h4 className="transaction-description">{description}</h4>&nbsp;
                <div className="transaction-details">
                  <h4 className="transaction-amount">$ {transactionAmount}</h4>
                  <h4 className="transaction-type">{transactionType}</h4>
                  <h4 className="transaction-date">{currentDate}</h4>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
