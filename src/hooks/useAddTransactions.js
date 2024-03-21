import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config'
import { useGetUserInfo } from '../hooks/useGetUserInfo';

export const useAddTransactions = () => {
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();
    
    const addTransaction = async ({description, transactionAmount, transactionType}) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount, 
            transactionType,
            currentDate: new Date().toDateString(),
            createdAt: serverTimestamp(),
        });
    };
    
    return { addTransaction };
}