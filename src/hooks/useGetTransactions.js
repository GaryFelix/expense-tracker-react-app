import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });
  
  // const [cB, setCB] = useState(0);
  // const [oB, setOB] = useState(0);

  // let todayDate = new Date().toDateString();

  const transactionCollectionRef = collection(db, "transactions");

  const { userID } = useGetUserInfo();

  const getTransactions = async () => {

    let unsubscribe;
    try {
      //to get the transactions
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      
      

      //to save the changes when the query changes and to loop through all the data that is stored on the document
      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = []; //storing the data(document) and id
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          let data = doc.data();
          let id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });

        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          income: totalIncome,
          expenses: totalExpenses,
        });
      });

    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  });

  return { transactions, transactionTotals };
};
