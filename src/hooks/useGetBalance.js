import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo";
import { useEffect, useState } from "react";


export const useGetBalance = () => {
    const balanceCollectionRef = collection(db, "balances");

    const[lastTransaction, setLastTransaction] = useState(0);

    const { userID } = useGetUserInfo();
    
    let todayDate = new Date().toDateString();
    const [closingBalance, setClosingBalance] = useState(0);

    const getBalance = async () => {
        let unsubscribe;
        try {
            const queryBalance = query(
                balanceCollectionRef,
                where("userID", "==", userID),
                orderBy("currentDate", 'desc'),
                limit(1),
            );

            unsubscribe = onSnapshot(queryBalance, (snapshot) => {
                let docs3 = [];

                snapshot.forEach((doc) => {
                    let data = doc.data();
                    let id = doc.id;
                    let cB = 0;
                    docs3.push({ ...data, id });
                    

                    if(data.currentDate === todayDate){
                        cB = Number(data.updateBalance);
                    }

                    setClosingBalance(cB);
                });


                setLastTransaction(docs3);
            })
        } catch (error) {
            console.error(error);
        }
        return () => unsubscribe();
    }

    useEffect(()=>{
        getBalance();
    })

    return { lastTransaction, closingBalance };
}