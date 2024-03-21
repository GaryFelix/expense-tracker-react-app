import { db } from "../config/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddBalance = () => {
    const balanceCollectionRef = collection(db, 'balances');
    const { userID } = useGetUserInfo();

    const addBalance = async ({updateBalance, description}) => {
        await addDoc(balanceCollectionRef, {
            userID, 
            updateBalance,
            description,
            currentDate: new Date().toDateString(),
            createdAt: serverTimestamp(),
        });
    };

    return { addBalance };
}