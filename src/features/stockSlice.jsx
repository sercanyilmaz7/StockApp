import { createSlice } from "@reduxjs/toolkit"

const stockSlice = createSlice({
  name: "stock",
  //? Hangi verilerin saklanamsı gerektiğini inceleyip belirleyip burada state olarak yazıyoruz.
  //? state lere "" atamıştık ama ılk render de "" yanı null değeri geldiği için hata verdi bu yüzden [] oalrak değiştirdik.
  initialState: {
    //? ilk başta değerileri null vermiştik bunu yerine hata olmasın diye şimdi  [] verdik.
    purchases: [],
    sales: [],
    brands: [],
    firms: [],
    products: [],
    categories: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    //?aslında  payload ı acıp ıcınden data url alıyoruz.
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      // ? state.sales = payload olursa her biri için ayrı ayrı yazmak lazım. sales state tine apiden gelen veriyi getSucces(data) dersek payload data olurdu, yani payload ı ata diyoruz. ama sales değişecek purhases...vb olacak o yüzden değişken yani dinamik olması lazım. state[url] olacak. payload da data olacak.
      //? değişkenleri [] içine almamız lazım. state.url yazarsak state içideki url i arar.
      state[url] = data;
    },
    // getSuccessSales: (state, { payload }) => {
    //   state.loading = false
    //   state.sales = payload
    // },
    // getSuccesPurchase: (state, { payload }) => {
    //   state.loading = false
    //   state.purchases = payload
    // },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getProCatBrandSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload[0];
      state.categories = payload[1];
      state.brands = payload[2];
    },
  },
});

export const { fetchStart, getSuccess, fetchFail,getProCatBrandSuccess} = stockSlice.actions
export default stockSlice.reducer



//? Her sayfada veri çekme işlemi yapılacağından dolayı tüm veri çekme işlmelerini tek bir yerde toplayarak verileri çekmeyi kolaylaştıracak bir serviz yazmamız lazım aynen authUseCall gibi.Servis fonksiyonları yazmamız lazım.
//? Çektiğimi verileri bir redux state ne atarsam tekrar tekrar verileri çekmeme gerek kalmaz. Fetch işlemi zaman alan bir işlem oldugundan state te tutup kullanmak daha uygun olur.
//? 1.Verile için ayrı bir slice yapmamız lazım.
//? 2.Slice verileri güncellerken servis fonksiyonu şeklinde yazmamız lazım
//? Oluşturduğumuz reducerı store da bağlamamız lazım. şimdi gidip store a ekleme yapalım. store gidip     stock : stockReducer şeklinde ekleme yapıyoruz.


