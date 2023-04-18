import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, getSuccess, fetchStart,getProCatBrandSuccess } from "../features/stockSlice";
import useAxios from "./useAxios";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  //  const getFirms = async () => {
  //    const BASE_URL = "https://12176.fullstack.clarusway.com/";
  //    dispatch(fetchStart());
  //    //? url bu şekilde belirtmemiz lazım çünkü key şeklinde gönderiyoruz. sadece "firms" gönderemeyiz.data da aynı şekilde.
  //    const url = "firms";
  //    //? token ı gonderirken headers: { Authorization: `Token ${token}` } böyle gönderiyoruz.
  //    try {
  //      const { data } = await axios(`${BASE_URL}stock/firms/`, {
  //        headers: { Authorization: `Token ${token}` },
  //      });
  //      //? burdan getSuccess e data ve url yi gönderiyoruz. aslında  payload ı acıp ıcıne data url koyuyoruz.
  //      dispatch(getSuccess({ data, url }));
  //    } catch (error) {
  //      console.log(error);
  //      dispatch(fetchFail());
  //    }
  //  };

  //!------------- GET CALLS ----------------
  //? kalıp bir fonksiyon meydana getiriyoruz. ve çağırırken içine parametre vererek cağıracağız.
  const getStockData = async (url) => {
    // const BASE_URL = "https://12176.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      //   const { data } = await axios(`${BASE_URL}stock/${url}/`, {
      //     headers: { Authorization: `Token ${token}` },
      //   });
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      // console.log(data)
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 const getProCatBrand = async () => {
   dispatch(fetchStart());
   try {
     const [products, categories, brands] = await Promise.all([
       axiosWithToken.get("stock/products/"),
       axiosWithToken.get("stock/categories/"),
       axiosWithToken.get("stock/brands/"),
     ]);

     dispatch(
       getProCatBrandSuccess([products?.data, categories?.data, brands?.data])
     );
   } catch (error) {
     console.log(error);
     dispatch(fetchFail());
     toastErrorNotify(`Data can not be fetched`);
   }
 };






  //!------------- DELETE CALLS ----------------
  //? kalıp bir fonksiyon meydana getiriyoruz. ve çağırırken içine parametre vererek cağıracağız.
  const deleteStockData = async (url, id) => {
    // const BASE_URL = "https://12176.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      //  await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      await axiosWithToken.delete(`stock/${url}/${id}`);
      toastSuccessNotify(`${url} successfuly deleted`);
      // dispatch(getSuccess({ url }));
      //? silindikten sonra veriyi tekrar get ederek datayı güncelliyoruz.
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
      dispatch(fetchFail());
    }
  };



//!!!!!!
  const deleteProduct = (id) => deleteStockData("products", id);
  //!------------- POST CALLS ----------------
  //? kalıp bir fonksiyon meydana getiriyoruz. ve çağırırken içine parametre vererek cağıracağız.
  const postStockData = async (url,info) => {
    // const BASE_URL = "https://12176.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      //  await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} successfuly added`);
      // dispatch(getSuccess({ url }));
      //? yeni veri eklendikten sonra veriyi tekrar get ederek datayı güncelliyoruz.
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
      dispatch(fetchFail());
    }
  };
  //? fonksiyonu daha da kısaltmak için postFirm ... fonksiyonlarını yaptık.
  const postFirm = (info) => postStockData("firms",info);
  const postBrand = (info) => postStockData("brands", info);

  //!------------- PUT CALLS ----------------
  //? kalıp bir fonksiyon meydana getiriyoruz. ve çağırırken içine parametre vererek cağıracağız.
  const putStockData = async (url,info) => {
    // const BASE_URL = "https://12176.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      //  await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfuly added`);
      // dispatch(getSuccess({ url }));
      //? veri düzenlendikten sonra veriyi tekrar get ederek datayı güncelliyoruz.
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
      dispatch(fetchFail());
    }
  };
  //? fonksiyonu daha da kısaltmak için putFirm ... fonksiyonlarını yaptık.
  const putFirm = (info) => putStockData("firms", info);
  const putBrand = (info) => putStockData("brands", info);

  return {
    getStockData,
    deleteStockData,
    putFirm,
    postFirm,
    putBrand,
    postBrand,
    getProCatBrand,
    deleteProduct,
    postStockData,
    putStockData
    };
};

export default useStockCall;

//? fonksiyonları tek tek yazmak yerine kalıp bır fonksıyon olusturduk ve gereklı yerde onu cağırdık.
