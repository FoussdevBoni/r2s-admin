import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Importe le moteur de stockage que tu veux utiliser
import userSlice from './userSlice';
import flottesSlice  from './flottesSlice';
import  ecolesSlice  from './ecolesSlice';
import  driversSlice  from './driversSlice';


const persistConfig = {
  key: 'root', 
  storage: storage, 
};

const persistedReducer = persistReducer(persistConfig, userSlice);
const persistedReducer1 = persistReducer(persistConfig, flottesSlice);

const persistedReducer2 = persistReducer(persistConfig, ecolesSlice);
const persistedReducer3 = persistReducer(persistConfig, driversSlice);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    flottes: persistedReducer1,
    ecoles: persistedReducer2,
    drivers: persistedReducer3

  },
});

export const persistor = persistStore(store);
