import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '../firebase/firebase';


export const saveUser = async (uid,data) => {

    return setDoc(doc(db, 'usuarios', uid), data);


};

export const getUser = async (uid) => {
    const snapshot = await getDoc(doc(db, 'usuarios', uid));

    return snapshot.exists() ? snapshot.data() : null;
};
