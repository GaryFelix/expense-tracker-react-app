import { useState } from 'react';
import './style.css';
import { useAddTransactions } from '../../hooks/useAddTransactions'
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

export const ExpenseTracker = () => {

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const navigate = useNavigate();
  
  const { addTransaction } = useAddTransactions();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();

  const {balance, income, expenses} = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({
      description,
      transactionAmount,
      transactionType, 
    });

    setDescription("");
    setTransactionAmount(0);
  }

  const signOutUser = async () => {
    try{
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    }
    catch (err){
      console.error(err);
    }
  }

  

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1><span className='userName'>{name}</span>'s EXPENSE TRACKER</h1>
          <div className="balance">
            <h2>Your Balance</h2>
            {balance >= 0 ? (
              <h2>${balance}</h2>
            ):(
              <h2>-${balance * -1}</h2>
            )}
          </div>
          <div className="summary">
            <div className="income">
              <h4> Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4> Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense"> Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income</label>

            <button type="submit"> Add Transaction</button>
          </form>
        </div>
        {profilePhoto && <div className='profile-photo'>
            <img src={profilePhoto} alt='profilePicture' />
            <button className='sign-out-button' onClick={signOutUser}>Sign Out</button>
          </div>}

      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction)=>{
            const {description, transactionAmount, transactionType} = transaction;
            return (
              <li>
                <h4>{description}</h4>
                <p>${transactionAmount} | <label>{transactionType}</label></p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
};
