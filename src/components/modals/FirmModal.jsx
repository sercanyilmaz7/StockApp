import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useStockCall from "../../hooks/useStockCall";
import { flex, flexColumn, modalStyle } from "../../styles/globalStyle";

const FirmModal = ({ open, setOpen, info, setInfo }) => {
  //? Put ve Post işlemlerini yapmak için useStockCall dan çekiyoruz.
    // const {putFirm,postFirm}=useStockCall()
     const { postStockData, putStockData } = useStockCall();

    //? Submit butonuna basınca open false oluyor ve modal kapanıyor info boş oluyor yazılar sılınıyor.
    //? eger info da id yoksa bu yen eklenecek üründür. Çünkü ürn ekelnirken id girilmiyor. Veri post yapılıp eklendikten sonra api bir id veriyor ve böylece gelen ınfo da eger ıd varsa bu edıt işlemini yapacagını anlıyoruz ve koşul ile put işlemine yönlendiriyoru.
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(info.id){
  //       putFirm(info)
  //   }else{
  //       postFirm(info)
  //       // postStockData(info,"firms")
  //   }
  //   setOpen(false);
  //   setInfo({});
  // };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (info.id) {
        putStockData("firms", info);
      } else {
        postStockData("firms", info);
      }

      setOpen(false);
      setInfo({ name: "", phone: "", address: "", image: "" });
    };

  //? ınput a bırsey yazdıgımızda bu veriler info state ne atılsın dıye setınfo yu yaptık. ınfo burada bır obje oldugu ıcın {} ile yazdık.
  //? name her ınput ıcın degısken oldugundan [name] şeklinde yazdık.value ise ınput ıcıne yazılan veri geliyor.
  const handleChange = (e) => {
    // setInfo({...info,[e.target.name]:e.target.value})
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  return (
    <div>
      <Modal
      //? onClose da open false oluyor modal ı kapatıyor. ınfo yu boş obje atıyoruz. açıldıgında dırek boş olsun dıye.submit e tıklamadan çıkınca input yanı ınfo sıfırlanıyor.
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {/* //? Box componentine component="form" yazarak form özelliği kazandırıyoruz böyle onSubmit i burada kullanabiliyoruz.Onsubmit sorm da olması lazım!!! */}
          <Box component="form" sx={flexColumn} onSubmit={handleSubmit}>
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              required
              //? info? buardakı optional cheining çok onemli çunku verı ılk olarak null geldiğinde hata verecektir.
              value={info?.name || ""}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              required
              variant="outlined"
              value={info?.phone || ""}
              onChange={handleChange}
            />

            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              required
              variant="outlined"
              value={info?.address || ""}
              onChange={handleChange}
            />

            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              required
              variant="outlined"
              value={info?.image || ""}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" size="large">
              Submit Form
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default FirmModal;


//! bir statein yukarı taşınması Lifting Up tır