import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';

import { db } from '../firebase/firebase';

export const saveTask = async (task) => {
    return addDoc(collection(db, 'tareas'), task);
};

export const getTasks = async (userId) => {
    const tasksQuery = query(
        collection(db, 'tareas'),
        where('userId', '==', userId),
    );
    const snapshot = await getDocs(tasksQuery);

    return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
    }));
};

export const updateTaskStatus = async (taskId, completada) => {
    const taskRef = doc(db, 'tareas', taskId);
    return updateDoc(taskRef, { completada });
};

export const deleteTask = async (taskId) => {
    const taskRef = doc(db, 'tareas', taskId);
    return deleteDoc(taskRef);
};