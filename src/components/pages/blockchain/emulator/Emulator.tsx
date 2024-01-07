import React from "react";
import { Alert, alpha, Button, Container, Grid, Skeleton, Typography } from "@mui/material";
import {
  useGetBlockchainQuery,
  useGetSignedTransactionsQuery,
  useGetUnsignedTransactionsQuery,
} from "@/api/blockchain";
import { useGetProfileQuery } from "@/api/profile";
import { Iconify } from "@/components/common/iconify/Iconify";
import { CardsContainer } from "./components/cards/Cards";

export const Emulator = () => {
  const { data: profile, isLoading: isGetProfileLoading } = useGetProfileQuery();
  const { data: unsignedTransactions, isLoading: isGetUnsignedTransactionsLoading } =
    useGetUnsignedTransactionsQuery();
  const { data: signedTransactions, isLoading: isGetSignedTransactionsLoading } =
    useGetSignedTransactionsQuery();
  const { data: blockchain, isLoading: isBlockchainLoading } = useGetBlockchainQuery();

  if (
    isGetProfileLoading &&
    isGetUnsignedTransactionsLoading &&
    isGetSignedTransactionsLoading &&
    isBlockchainLoading
  ) {
    return (
      <Container>
        <Skeleton
          sx={{
            width: "100%",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            minHeight: 160,
          }}
        />
      </Container>
    );
  }

  if (!profile || !unsignedTransactions || !signedTransactions) {
    return null;
  }

  if (!blockchain) {
    return (
      <Container>
        <Alert
          variant="filled"
          severity="info"
          color="info"
          sx={{
            boxShadow: (theme) => theme.customShadows.base,
          }}
        >
          Данных пока нет
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid md={6}>
          <Typography component="h3" variant="h3">
            Реестр транзакций
          </Typography>
        </Grid>
        <Grid md={6} display="flex" gap={2}>
          <Button variant="contained" sx={{ display: "flex", gap: 1 }}>
            <Iconify icon="mdi-light:note-plus" />
            Создать блок
          </Button>
          <Button color="error" variant="contained" sx={{ display: "flex", gap: 1 }}>
            <Iconify icon="mdi-light:note-plus" />
            Очистить реестр
          </Button>
        </Grid>
      </Grid>
      <CardsContainer profile={profile} blockchain={blockchain} />
    </Container>
  );
};
