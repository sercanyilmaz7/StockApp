import { Typography } from "@mui/material";
import { useEffect } from "react";
import Charts from "../components/Charts";
import KpiCards from "../components/KpiCards";
import useStockCall from "../hooks/useStockCall";

const Home = () => {
  const { getStockData } = useStockCall();

  useEffect(() => {
    getStockData("sales");
    getStockData("purchases");
  }, []);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Dashboard
      </Typography>

      <KpiCards />
      <Charts />
    </div>
  );
};

export default Home;
