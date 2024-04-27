import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { TransactionResM } from "@/api/explorer";
import { formatPrice, numberToFormattedString, satoshiToDollars } from "@/utils/currency";
import { convertTimestampToDate } from "@/utils/format-time";
import { convertHashToShortFormat } from "@/utils/string";

type Props = {
  transaction: TransactionResM;
  USDPrice: number;
};

export const TransactionSummary: FunctionComponent<Props> = ({ transaction, USDPrice }) => {
  return (
    <Container>
      <div>
        <div>
          ID:<TextColored>{convertHashToShortFormat(transaction.hash)}</TextColored>
        </div>
        <div>{convertTimestampToDate(transaction.time)}</div>
      </div>
      <div>
        <div>
          <TextBlack>От</TextBlack>{" "}
          {transaction.inputs.length > 1 ? (
            <span>{transaction.inputs.length} входов</span>
          ) : (
            <TextColored>
              {convertHashToShortFormat(transaction.inputs[0].prev_out.addr)}
            </TextColored>
          )}
        </div>
        <div>
          <TextBlack>Кому</TextBlack>{" "}
          {transaction.out.length > 1 ? (
            <span>{transaction.out.length} выходов</span>
          ) : (
            <TextColored>{convertHashToShortFormat(transaction.out[0].addr)}</TextColored>
          )}
        </div>
      </div>
      <PriceBlock>
        <div>
          <TextBlack>{transaction.result / 100000000} BTC</TextBlack>
          <span>•</span>
          <span>{formatPrice(transaction.result / 100000000, USDPrice)}</span>
        </div>
        <div>
          <TextBlack>
            <RedColored>Комиссия</RedColored> {numberToFormattedString(transaction.fee)} Sats
          </TextBlack>
          <span>•</span>
          <span>${satoshiToDollars(transaction.fee, USDPrice)}</span>
        </div>
      </PriceBlock>
    </Container>
  );
};

const Container = styled.div`
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

const TextColored = styled.span`
  color: rgb(237, 155, 96);
  font-weight: 700;
`;

const RedColored = styled.span`
  color: rgb(244, 91, 105);
`;
