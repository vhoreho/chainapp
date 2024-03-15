import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Autocomplete, Box, Button, styled, TextField, Typography } from "@mui/material";
import { Coin, useGetCoinMutation } from "@/api/coins";
import { cryptoData } from "./constants";

type Props = {
  onClose: () => void;
};

export const CreateTransactionModal = ({ onClose }: Props) => {
  const [coin, setCoin] = useState<Coin | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [priceInUSD, setPriceInUSD] = useState<number | null>(null);
  const getCoinInformation = useGetCoinMutation();

  const handleChangeInput = (event: React.SyntheticEvent<Element, Event>, value: Coin | null) => {
    setCoin(value);
  };

  useEffect(() => {
    if (coin) {
      const fetchCoinInfo = async () => {
        try {
          const response = await getCoinInformation.mutateAsync(coin.id);
          setPriceInUSD(response.price);
        } catch (error) {}
      };

      fetchCoinInfo();
    }
  }, [coin]);

  return (
    <ModalContainer>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Добавить новую транзакцию
      </Typography>
      <Autocomplete
        size="small"
        fullWidth
        options={cryptoData}
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            <Image src={option.icon} alt="icon" width={30} height={30} />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Выберите криптовалюту"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
        onChange={handleChangeInput}
        getOptionLabel={(option) => option.name}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          marginTop: 1,
        }}
      >
        <TextField
          label="Введите количество"
          type="number"
          size="small"
          onChange={(e) => setAmount(+e.target.value)}
        />
        {amount && priceInUSD ? (
          <Badge>
            {(amount * priceInUSD).toFixed(2)} <strong>USD</strong>
          </Badge>
        ) : null}
      </Box>
      {amount && amount > 0 ? (
        <ButtonGroup>
          <Button variant="contained" disabled={!Boolean(amount)}>
            Создать транзакцию
          </Button>
          <Button variant="outlined" onClick={onClose} style={{ marginLeft: 10 }}>
            Отмена
          </Button>
        </ButtonGroup>
      ) : null}
    </ModalContainer>
  );
};

const ModalContainer = styled(Box)`
  position: relative;
  max-width: 90vw;

  @media (min-width: 600px) {
    width: 400px;
  }
`;

const Badge = styled("div")`
  padding: 6px 8px;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #12b76a;
  background: #a2e6c5;
`;

const ButtonGroup = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-top: 8px;
`;
