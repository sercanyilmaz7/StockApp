import { Box, Button, Grid, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/modals/FirmModal";
import useStockCall from "../hooks/useStockCall";
import { flex, modalStyle } from "../styles/globalStyle";

const Firms = () => {
  // //? token i authSlice den alabılırız.
  // const { token } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // const getFirms = async () => {
  //   const BASE_URL = "https://12176.fullstack.clarusway.com/";
  //   dispatch(fetchStart());
  //   //? url bu şekilde belitmemiz lazım çünkü key şeklinde object gönderiyoruz. sadece "firms" gönderemeyiz.
  //   const url = "firms";
  //   //? token ı gonderirken headers: { Authorization: `Token ${token}` } böyle gönderiyoruz.
  //   try {
  //     const { data } = await axios(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     //? burdan getSuccess e data ve url yi gönderiyoruz. aslında  payload ı acıp ıcıne data url koyuyoruz.
  //     dispatch(getSuccess({ data, url }));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail());
  //   }
  // };
  //? Modal için open ve ınputtan gelen verileri bir state te tutmak için info statelerıne ihtiyacım oalcak. info yu apide kullanacagım. stateleri neden firms componenetinde kullanıyor? Çünkü hem card hem de modal da gerekli oldugu için ikisinin de parent iolan firms de tanımlıyoruz.
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  //? firms bilgilerini get yapmak için u useStockCallcustom Hookundan getStockdata fonksiyonunu çektik.
  const { getStockData } = useStockCall();
  //? store dan firms state i çekiyoruz ki map ile cardları yazdırabilelim.
  const { firms } = useSelector((state) => state.stock);
  // console.log(firms);

  useEffect(() => {
    // getFirms()
    getStockData("firms");
  }, []);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      {/* //? New Firm butonuna tıklayınca yeni ürün eklemek için bir modal açılacak . Bunun için onClick te setOpen(true) yapıyoruz. bu modal ın açılmasını sağlıyor. setInfo({}) yaparakta modal ilk açıldıgında ınputlar boş oluyor. */}
      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Firm
      </Button>
      {/* //? NewFirm butonuna tıklandıgında modal açılıyor. Bu modalı MUI den alıp şekillendiriyoruz.Aytı bir componente atıyoruz. Yukarıda oluşturdugumuz open-info statelerini burada FirmModal a gönderiyoruz. */}
      <FirmModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />
      {/* //? Buradacardları yapmak için bir Grid container yaptık.İçinde Gredi item ları yaptık ve içinde de Card yapılarını oluşturduk.FirmCard componenti oluşturduk ve onu tanımladık */}
      <Grid container sx={flex} mt={3}>
        {/* //? firms? buardakı optional cheining çok onemli çunku verı ılk olaraknull geldiğinde hata verecektir. */}
        {firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;

//? Postman da =>  login işlemi yaptık-bize key(token) dönüyor-key i kopyalıyoruz.- firmaya eklemek için yeni bir Post işlemi, yapıyoruz bilgileri sistemden alıyoruz (https://12176.fullstack.clarusway.com/redoc/#operation/stock_firms_create), Headers bölmesine key = Authorization value= Token ecc6aebe2977eeb6c5672a3dd28f6a94c54c8bb9-
//? Postman da => firm leri çekeceğiz GET işlemi yapacağız.
