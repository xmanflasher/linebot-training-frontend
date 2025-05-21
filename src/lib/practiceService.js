// src/lib/practiceService.js
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  const practicesRef = collection(db, 'practices');
  
  export const createPractice = async (data) => {
    const docRef = await addDoc(practicesRef, data);
    return docRef.id;
  };
  
  export const getPractices = async () => {
    const snapshot = await getDocs(practicesRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  
  export const updatePractice = async (id, data) => {
    const docRef = doc(db, 'practices', id);
    await updateDoc(docRef, data);
  };
  
  export const deletePractice = async (id) => {
    const docRef = doc(db, 'practices', id);
    await deleteDoc(docRef);
  };
  