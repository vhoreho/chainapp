import React from "react";
<<<<<<< HEAD
import {
  Alert,
  alpha,
  Card,
  CardContent,
  CardHeader,
  Container,
  Skeleton,
  styled,
} from "@mui/material";
=======
import { Alert, alpha, Button, Container, Grid, Skeleton, Typography } from "@mui/material";
>>>>>>> 970cea8da799f6efbc1c7133fd5e5f8e48e2c030
import {
  useGetBlockchainQuery,
  useGetSignedTransactionsQuery,
  useGetUnsignedTransactionsQuery,
} from "@/api/blockchain";
import { useGetProfileQuery } from "@/api/profile";
<<<<<<< HEAD
import { TransactionsList } from "./components/transactions-list/TransactionsList";
=======
import { Iconify } from "@/components/common/iconify/Iconify";
import { CardsContainer } from "./components/cards/Cards";
>>>>>>> 970cea8da799f6efbc1c7133fd5e5f8e48e2c030

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

const Header = styled(CardHeader)`
  padding: 8px 16px !important;
`;

const Content = styled(CardContent)`
  &:last-child {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`;
