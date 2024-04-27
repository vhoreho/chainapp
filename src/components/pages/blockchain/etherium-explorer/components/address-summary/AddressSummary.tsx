import React from "react";
import styled from "styled-components";
import { BitcoinWalletResM } from "@/api/explorer";
import { formatPrice } from "@/utils/currency";

type AddressSummaryProps = Omit<BitcoinWalletResM, "txs"> & { USDPrice: number };

export const AddressSummary: React.FC<AddressSummaryProps> = ({
  address,
  final_balance,
  n_tx,
  total_received,
  total_sent,
  USDPrice,
}) => {
  return (
    <Container>
      <Field>
        <strong>Адрес:</strong> {address}
      </Field>
      <Field>
        <strong>Итоговый баланс:</strong> {final_balance / 100000000} <strong>BTC</strong>{" "}
        <Price>•</Price>
        <Price>{` ${formatPrice(final_balance / 100000000, USDPrice)}`}</Price>
      </Field>
      <Field>
        <strong>Количество транзакций:</strong> {n_tx}
      </Field>
      <Field>
        <strong>Всего получено:</strong> {total_received / 100000000} <strong>BTC</strong>{" "}
        <Price>•</Price>
        <Price>{` ${formatPrice(total_received / 100000000, USDPrice)}`}</Price>
      </Field>
      <Field>
        <strong>Всего отправлено:</strong> {total_sent / 100000000} <strong>BTC</strong>{" "}
        <Price>•</Price>
        <Price>{` ${formatPrice(total_sent / 100000000, USDPrice)}`}</Price>
      </Field>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 8px;
  padding: 16px;
  width: fit-content;
  max-width: 96%;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 12px;
  background: white;
  font-family: "play";
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Field = styled.div`
  margin-bottom: 8px;

  /* Apply ellipsis on small screens */
  @media (max-width: 575px) {
    /* Adjust breakpoint as needed */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Price = styled.span`
  font-size: 13.8px;
  color: #999;
`;
