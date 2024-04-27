import React from "react";
import styled from "styled-components";
import { TransactionResM } from "@/api/explorer";
import { AccordionMUI } from "@/components/common/design-system/accordion/Accordion";
import { TransactionDetails } from "../transaction-details/TransactionDetails";
import { TransactionSummary } from "../transaction-summary/TransactionSummary";

type Props = {
  txs: TransactionResM[];
  USDPrice: number;
  searchedAddress: string;
};

export const TransactionsList = ({ txs, USDPrice, searchedAddress }: Props) => {
  return (
    <Container>
      <ListContainer>
        {txs.map((tx) => (
          <AccordionMUI
            key={tx.hash}
            summary={<TransactionSummary transaction={tx} USDPrice={USDPrice} />}
            details={
              <TransactionDetails
                searchedAddress={searchedAddress}
                transaction={tx}
                USDPrice={USDPrice}
              />
            }
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

const ListItem = styled.div`
  display: flex;
  border-top: 1px solid rgb(238, 238, 238);
  box-sizing: border-box;
  flex-direction: column;
  margin: 0px;
`;
