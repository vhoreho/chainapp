import React, { FunctionComponent } from "react";
import { Tooltip } from "@mui/material";
import styled from "styled-components";
import { EthereumTransaction } from "@/api/explorer";
import { formatPrice, getGasFeeInGwei, gweiToDollars, weiToEth } from "@/utils/currency";
import { convertTimestampToDate } from "@/utils/format-time";
import { convertHashToShortFormat } from "@/utils/string";

type Explorer = {
  address: string;
};

type Props = {
  transaction: EthereumTransaction;
  USDPrice: number;
  onSubmit: ({ address }: Explorer) => void;
};

export const TransactionSummary: FunctionComponent<Props> = ({
  transaction,
  USDPrice,
  onSubmit,
}) => {
  const gwei = getGasFeeInGwei(transaction.gasUsed, transaction.gasPrice);

  return (
    <Container>
      <div>
        <div>
          ID:<TextColored>{convertHashToShortFormat(transaction.hash)}</TextColored>
        </div>
        <div>{convertTimestampToDate(+transaction.timeStamp)}</div>
      </div>
      <div>
        <div>
          <TextBlack>От</TextBlack>{" "}
          {
            <Tooltip title={transaction.from} arrow>
              <TextColored hasPointer onClick={() => onSubmit({ address: transaction.from })}>
                {convertHashToShortFormat(transaction.from)}
              </TextColored>
            </Tooltip>
          }
        </div>
        <div>
          <TextBlack>Кому</TextBlack>{" "}
          {
            <Tooltip title={transaction.to} arrow>
              <TextColored hasPointer onClick={() => onSubmit({ address: transaction.to })}>
                {convertHashToShortFormat(transaction.to)}
              </TextColored>
            </Tooltip>
          }
        </div>
      </div>
      <PriceBlock>
        <div>
          <TextBlack>{weiToEth(+transaction.value).toFixed(7)} ETH</TextBlack>
          <span> • </span>
          <span>{formatPrice(weiToEth(+transaction.value), USDPrice)}</span>
        </div>
        <div>
          <TextBlack>
            <RedColored>Комиссия</RedColored> {gwei.toString().slice(0, 3)} тыс. Gwei
          </TextBlack>
          <span> • </span>
          <span>${(gweiToDollars(gwei, USDPrice) / 1000000000).toFixed(2)}</span>
        </div>
      </PriceBlock>
    </Container>
  );
};

const Container = styled.div`
  background: white;
  padding: 20px;
  display: grid;
  grid-gap: 12px;
  width: 100%;
  grid-template-columns: 1fr;
  font-family: "play";
  font-size: 13.6px;
  color: #999;

  @media (min-width: 545px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #dfdede;
  }
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;

  @media (min-width: 1024px) {
    align-items: end;
  }
`;

const TextBlack = styled.span`
  color: #000;
  font-weight: 700;
`;

const TextColored = styled.span<{ hasPointer?: boolean }>`
  color: rgb(237, 155, 96);
  font-weight: 700;
  cursor: ${({ hasPointer }) => (hasPointer ? "pointer" : "normal")};

  &:hover {
    text-decoration: ${({ hasPointer }) => (hasPointer ? "underline" : "none")};
  }
`;

const RedColored = styled.span`
  color: rgb(244, 91, 105);
`;
