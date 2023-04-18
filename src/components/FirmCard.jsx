import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { btnStyle, flex } from "../styles/globalStyle";
import useStockCall from "../hooks/useStockCall";

export default function FirmCard({ firm,setOpen,setInfo }) {
  //? Delete işlemi yaomak için <DeleteOutlineIcon/> a tıklandıgında delete fonksiyonunu tanımlamak için useStockCall() dan (Custom Hook) tan deleteStockData yı çekiyoruz.
  const { deleteStockData } = useStockCall();

  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firm?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {firm?.address}
        </Typography>
      </CardContent>
      <CardMedia
        image={firm?.image}
        sx={{ p: 1, objectFit: "contain", height: "130px" }}
        //? CardMedia componentine biz   component="img" yaparak img özellikleri veriyoruz.
        component="img"
        alt="firm-img"
      />

      <Typography variant="body2" color="text.secondary">
        Phone: {firm?.phone}
      </Typography>
      <CardActions sx={flex}>
        <EditIcon
          sx={btnStyle}
          onClick={() => {
            setOpen(true);
            setInfo(firm);
          }}
        />
        <DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteStockData("firms", firm.id)}
        />
      </CardActions>
    </Card>
  );
}
