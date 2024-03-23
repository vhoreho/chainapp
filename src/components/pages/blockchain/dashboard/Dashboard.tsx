import React, { useMemo } from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import { useGetCoinsQuery } from "@/api/coins";
import { getTopGainersLastWeek } from "@/utils/currency";
import { CoinsStat } from "./components/coins-stat/CoinsStat";

export const BlockchainDashboard = () => {
  const { data: coins, isLoading } = useGetCoinsQuery();

  const topGainers = useMemo(() => getTopGainersLastWeek(coins?.result ?? []), [coins]);
  console.log("🚀 ~ BlockchainDashboard ~ topGainers:", topGainers);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={8} xl={6}>
          <CoinsStat />
        </Grid>
        <Grid item lg={4} xl={6}>
          <Box sx={{ padding: 2, bgcolor: "white", borderRadius: 1 }}>
            <Typography variant="h5" marginBottom={2}>
              Топ 5 растущих криптовалют
            </Typography>
            {topGainers.map((coin) => (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    "& > img": { mr: 1, flexShrink: 0 },
                    whiteSpace: "nowrap",
                    fontSize: 14,
                  }}
                >
                  <Image src={coin.icon} alt="icon" width={20} height={20} />
                  {coin.name}
                </Box>
              </>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
