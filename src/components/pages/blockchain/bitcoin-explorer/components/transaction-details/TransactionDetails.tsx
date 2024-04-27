import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { TransactionResM } from "@/api/explorer";
import { formatPrice } from "@/utils/currency";

type Input = {
  addr: string;
  value: number;
};

type Output = {
  addr: string;
  value: number;
};

type Props = {
  transaction: TransactionResM;
  USDPrice: number;
  searchedAddress: string;
};

export const TransactionDetails: FunctionComponent<Props> = ({
  transaction,
  USDPrice,
  searchedAddress,
}) => {
  const inputs: Input[] = transaction.inputs.map((input) => ({
    addr: input.prev_out.addr,
    value: input.prev_out.value / 100000000, // Convert to BTC
  }));
  const outputs: Output[] = transaction.out.map((output) => ({
    addr: output.addr,
    value: output.value / 100000000, // Convert to BTC
  }));

  return (
    <Container>
      <Inputs>
        <Title>Входы</Title>
        <ItemList>
          {inputs.map((input) => (
            <Item key={input.addr}>
              <Address isEqual={searchedAddress === input.addr}>{input.addr}</Address>
              <Value>{`${input.value} BTC • ${formatPrice(input.value, USDPrice)}`}</Value>
            </Item>
          ))}
        </ItemList>
      </Inputs>
      <Outputs>
        <Title>Выходы</Title>
        <ItemList>
          {outputs.map((output) => (
            <Item key={output.addr}>
              <Address isEqual={searchedAddress === output.addr}>{output.addr}</Address>
              <Value>{`${output.value} BTC • ${formatPrice(output.value, USDPrice)}`}</Value>
            </Item>
          ))}
        </ItemList>
      </Outputs>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid gainsboro;
  font-family: "Play";
  font-size: 12.8px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Inputs = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-bottom: 1px solid gainsboro;
  overflow: hidden;

  @media (min-width: 900px) {
    border-bottom: none;
    border-right: 1px solid gainsboro;
  }
`;

const Outputs = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h6`
  margin: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

const ItemList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
`;

const Address = styled.div<{ isEqual?: boolean }>`
  color: ${({ isEqual }) => (isEqual ? "rgb(244, 91, 105)" : "rgb(237, 155, 96)")};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.div`
  color: #999;
`;
