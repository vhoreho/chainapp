import React from "react";
import { Box, Grid } from "@mui/material";
import { CoinsStat } from "./components/coins-stat/CoinsStat";

export const BlockchainDashboard = () => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item lg={8} xl={6}>
          <CoinsStat />
        </Grid>
      </Grid>
    </Box>
  );
};
