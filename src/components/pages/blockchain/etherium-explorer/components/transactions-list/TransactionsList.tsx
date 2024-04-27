import React from "react";
import styled from "styled-components";
import { EthereumTransaction } from "@/api/explorer";
import { TransactionSummary } from "../transaction-summary/TransactionSummary";

type Explorer = {
  address: string;
};

type Props = {
  txs: EthereumTransaction[];
  USDPrice: number;
  onSubmit: ({ address }: Explorer) => void;
};

export const TransactionsList = ({ txs, USDPrice, onSubmit }: Props) => {
  return (
    <Container>
      <ListContainer>
        {txs.map((tx) => (
          <TransactionSummary
            key={tx.blockHash}
            transaction={tx}
            USDPrice={USDPrice}
            onSubmit={onSubmit}
          />
        ))}
      </ListContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  max-width: 950px;
  margin-top: 24px;
  background: transparent;
`;

const ListContainer = styled.div`
  overflow: hidden;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  border-radius: 8px;
`;
