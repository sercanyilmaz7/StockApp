import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useStockCall from "../../hooks/useStockCall";
import { flexColumn, modalStyle } from "../../styles/globalStyle";

const BrandModal = ({ open, setOpen, info, setInfo }) => {
  const { postBrand, putBrand } = useStockCall();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putBrand(info);
    } else {
      postBrand(info);
    }

    setInfo({});
    setOpen(false);
  };

  const handleChange = (e) => {
    // setInfo({...info,[e.target.name]:e.target.value})
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  // console.log(info)
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box component="form" sx={flexColumn} onSubmit={handleSubmit}>
            <TextField
              label="Brand Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              required
              value={info?.name || ""}
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
              SAVE BRAND
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BrandModal;
