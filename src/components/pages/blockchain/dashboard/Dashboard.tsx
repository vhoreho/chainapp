import React, { useMemo } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { useGetCoinsQuery } from "@/api/coins";
import { getTopGainersLastWeek, getTopLosersLastWeek } from "@/utils/currency";
import { CoinsStat } from "./components/coins-stat/CoinsStat";

export const BlockchainDashboard = () => {
  const { data: coins } = useGetCoinsQuery();

  const topGainers = useMemo(() => getTopGainersLastWeek(coins?.result ?? []), [coins]);
  const topLosers = useMemo(() => getTopLosersLastWeek(coins?.result ?? []), [coins]);

  return (
    <Container>
      <CoinsStat />

      <RateContainer>
        <Box sx={{ padding: 2, bgcolor: "white", borderRadius: 1, width: "100%" }}>
          <Typography variant="h5" marginBottom={2}>
            Топ 5 растущих криптовалют (1 неделя)
          </Typography>
          <List>
            <ListItem>
              <Title>Название</Title>
              <Title>Рост</Title>
              <Title>Текущая стоимость</Title>
            </ListItem>
            {topGainers.map((coin) => (
              <ListItem key={coin.id}>
                <CoinNameContainer>
                  <Image src={coin.icon} alt="icon" width={20} height={20} />
                  {coin.name}
                </CoinNameContainer>
                <div>{coin.priceChange1w}%</div>
                <div>${coin.price.toFixed(3)}</div>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ padding: 2, bgcolor: "white", borderRadius: 1, width: "100%" }}>
          <Typography variant="h5" marginBottom={2}>
            Топ 5 обесценившихся криптовалют (1 неделя)
          </Typography>
          <List>
            <ListItem>
              <Title>Название</Title>
              <Title>Снижение</Title>
              <Title>Текущая стоимость</Title>
            </ListItem>
            {topLosers.map((coin) => (
              <ListItem key={coin.id}>
                <CoinNameContainer>
                  <Image src={coin.icon} alt="icon" width={20} height={20} />
                  {coin.name}
                </CoinNameContainer>
                <div>{coin.priceChange1w}%</div>
                <div>${coin.price.toFixed(3)}</div>
              </ListItem>
            ))}
          </List>
        </Box>
      </RateContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1.3fr;
  align-items: start;
  grid-gap: 12px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 12px;
`;

const ListItem = styled.li`
  font-family: "Play";
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: 8px;
`;

const CoinNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 900;
`;

const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 950px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
