import React, { useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { get, getDatabase, ref, set } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
export const firebaseConfig = {
 apiKey: "AIzaSyBZ9sJZeji6lYLbvkstmJLFkss7bI1Uhc8",
  authDomain: "ride-2-school.firebaseapp.com",
  databaseURL: "https://ride-2-school-default-rtdb.firebaseio.com",
  projectId: "ride-2-school",
  storageBucket: "ride-2-school.appspot.com",
  messagingSenderId: "309273170745",
  appId: "1:309273170745:web:6d5cbe5c640e3aa4d58ee8",
  measurementId: "G-W0CRK6V93C"
};
const app = initializeApp(firebaseConfig);


// Constante pour realtime Database 
export const db = getDatabase(app);
//Constante pour authentification
export  const auth = getAuth(app);
export const  storage  = getStorage(app);
export const database = getFirestore(app);










