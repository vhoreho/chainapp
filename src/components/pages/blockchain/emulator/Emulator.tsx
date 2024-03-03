import React from "react";
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
import {
  useGetBlockchainQuery,
  useGetSignedTransactionsQuery,
  useGetUnsignedTransactionsQuery,
} from "@/api/blockchain";
import { useGetProfileQuery } from "@/api/profile";
import { TransactionsList } from "./components/transactions-list/TransactionsList";

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
    <Card>
      <Header title="Реестр транзакций" />
      <Content>
        <TransactionsList
          transactions={blockchain}
          isLoading={
            isGetProfileLoading &&
            isGetUnsignedTransactionsLoading &&
            isGetSignedTransactionsLoading &&
            isBlockchainLoading
          }
        />
      </Content>
    </Card>
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
