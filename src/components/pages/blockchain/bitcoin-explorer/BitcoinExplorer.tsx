import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useGetBTCCurrencyInUSD } from "@/api/currency";
import {
  BitcoinWalletResM,
  TransactionResM,
  useGetBitcoinTransactionsMutation,
} from "@/api/explorer";
import { useSnackBarContext } from "@/hooks/context";
import { AddressSummary } from "./components/address-summary/AddressSummary";
import { TransactionsList } from "./components/transactions-list/TransactionsList";

type Explorer = {
  address: string;
};

export const BitcoinExplorer: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<Explorer>();
  const [summary, setSummary] = useState<Omit<BitcoinWalletResM, "txs"> | null>(null);
  const [txs, setTxs] = useState<TransactionResM[]>([]);
  const { mutate, isPending } = useGetBitcoinTransactionsMutation();
  const { data: priceInUSD } = useGetBTCCurrencyInUSD();
  const { handleShow } = useSnackBarContext();

  const onSubmit = async ({ address }: Explorer) => {
    mutate(address, {
      onSuccess: (response) => {
        setSummary(response);
        setTxs(response.txs);
      },
      onError: (error) => {
        handleShow(error.message, "error");
      },
    });
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
            {isPending ? (
              <CircularProgress
                sx={{ width: "20px !important", height: "20px !important" }}
                color="inherit"
              />
            ) : (
              <>Поиск</>
            )}
          </Button>
        </Form>
      </Container>
      {summary && priceInUSD && <AddressSummary {...summary} USDPrice={priceInUSD} />}
      {txs.length && priceInUSD ? (
        <TransactionsList searchedAddress={watch("address")} txs={txs} USDPrice={priceInUSD} />
      ) : null}
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
