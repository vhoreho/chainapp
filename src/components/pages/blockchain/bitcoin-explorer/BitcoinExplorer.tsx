import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import styled from "styled-components";
import { useGetCurrencyInUSD } from "@/api/currency";
import { TransactionResM, useGetBitcoinTransactionsMutation, WalletResM } from "@/api/explorer";
import { AddressSummary } from "./components/address-summary/AddressSummary";
import { TransactionsList } from "./components/transactions-list/TransactionsList";

type Explorer = {
  address: string;
};

export const BitcoinExplorer: React.FC = () => {
  const { control, handleSubmit } = useForm<Explorer>();
  const [summary, setSummary] = useState<Omit<WalletResM, "txs"> | null>(null);
  const [txs, setTxs] = useState<TransactionResM[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getTransactions = useGetBitcoinTransactionsMutation();
  const { data: priceInUSD } = useGetCurrencyInUSD();

  const onSubmit = async ({ address }: Explorer) => {
    setIsLoading(true);
    try {
      const response = await getTransactions.mutateAsync(address);
      setSummary(response);
      setTxs(response.txs);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Обозреватель Bitcoin транзакций
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Введите адрес Bitcoin кошелька"
                variant="outlined"
                fullWidth
                size="small"
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Поиск
          </Button>
        </Form>
      </Container>
      {summary && priceInUSD && <AddressSummary {...summary} USDPrice={priceInUSD} />}
      {txs.length && priceInUSD ? <TransactionsList txs={txs} USDPrice={priceInUSD} /> : null}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 12px;
`;
