import React from "react";
import { Alert, alpha, Box, Container, Skeleton, Typography } from "@mui/material";
import {
  useGetBlockchainQuery,
  useGetSignedTransactionsQuery,
  useGetUnsignedTransactionsQuery,
} from "@/api/blockchain";
import { useGetProfileQuery } from "@/api/profile";
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
    <Container sx={{ flexGrow: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} marginBottom={2}>
        <Box gridColumn="span 6">
          <Typography component="h3" variant="h3">
            Реестр транзакций
          </Typography>
        </Box>
      </Box>
      <CardsContainer profile={profile} blockchain={blockchain} />
    </Container>
  );
};
