import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useGetETHCurrencyInUSD } from "@/api/currency";
import { EthereumTransaction, useGetEthereumTransactionsMutation } from "@/api/explorer";
import { useSnackBarContext } from "@/hooks/context";
import { TransactionsList } from "./components/transactions-list/TransactionsList";

type Explorer = {
  address: string;
};

export const EtheriumExplorer = () => {
  const { control, handleSubmit } = useForm<Explorer>();
  const [txs, setTxs] = useState<EthereumTransaction[]>([]);
  const { mutate, isPending } = useGetEthereumTransactionsMutation();
  const { data: priceInUSD } = useGetETHCurrencyInUSD();
  const { handleShow } = useSnackBarContext();

  const onSubmit = async ({ address }: Explorer) => {
    mutate(address, {
      onSuccess: (response) => {
        const { result } = response;
        if (Array.isArray(result)) {
          setTxs(response.result);
        } else {
          handleShow(result as string, "error");
        }
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
          Обозреватель Ethereum транзакций
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Введите адрес Ethereum кошелька"
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
      {/* {summary && priceInUSD && <AddressSummary {...summary} USDPrice={priceInUSD} />} */}
      {txs.length ? <TransactionsList txs={txs} USDPrice={priceInUSD} onSubmit={onSubmit} /> : null}
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
