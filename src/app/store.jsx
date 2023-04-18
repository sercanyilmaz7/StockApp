import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";



import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
//? buna gerek yok çünkü bizim reducerımız autRedcuer ı import ettık.
// import rootReducer from "./reducers";
//? Bunları import ettik.
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";





const persistConfig = {
  key: "root",
  storage,
};
// const persistedReducer = persistReducer(persistConfig, rootReducer);
//? burada roorReducer vardı biz bunun yerine hangsinin içindeki bilgileri saklamak istiyorsak onu rootReduceReducer ile persistConfig i birleştirerek pesistedReducer ı oluşturuyoruz.
const persistedReducer = persistReducer(persistConfig, authReducer);
//? autReducer i persist süzgecinden geçirdiğimiz için artık configureStore içindeki autReducer ı  persistedReducer ile değiştirmemeiz gerekiyor. auth: persistedReducer . Burada bir ara katman yapmış gibi olduk.
 
// let store = createStore(persistedReducer);
//? persistedReducer dan create ıle bır store oluşturuyoruz. Fakat bizim bir bir configureStore muz oldugu ıcın store yapmış bulunuyoruz. 

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    stock: stockReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: process.env.NODE_ENV !== "production",
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

//? burada da store persist süzgecinden geçirip persistor yapıyoruz ve export yapıyoruz.
//!Buradan App  e gidip sarmallamayı yapmamız lazım kı store gonderebilelim.İşte persistor orada işimize yarayacak.
export const persistor = persistStore(store);
export default store;

//? currentUser in sistemde olup olmadıgını anlamak için local ya daSesion Storage ıle yapabılırdık.fakat bunu her state ıcın yapmak zorunda kalırdık.bunun yerine REDUX PERSİST kütüphanesi ile daha rahat yapabiliriz.
//? https://www.npmjs.com/package/redux-persist
//? yar add redux-persist
//? sonra sitedeki configureStore.js yi store yapıştırıyoruz ve düzenlemeler yazpıyoruz.

//? persist  sayfa refresh oldugunda rehydrate yaparak yanı veriyi tekrar gönderiyor.
