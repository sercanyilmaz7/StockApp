import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import { flex } from "../styles/globalStyle";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";

const Brands = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const { getStockData } = useStockCall();
  const { brands } = useSelector((state) => state.stock);
  // console.log(brands);
  useEffect(() => {
    getStockData("brands");
  }, []);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Brand
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Brand
      </Button>

      <BrandModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />

      <Grid container sx={flex} mt={3}>
        {brands?.map((brand) => (
          <Grid item key={brand.id}>
            <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo}  />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Brands;
