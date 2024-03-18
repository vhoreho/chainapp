import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCreateChainMutation } from "@/api/blockchain";
import { useGetWalletsQuery } from "@/api/users";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { cryptoData } from "./constants";
import { IFormInput } from "./types";

type Props = {
  onClose: () => void;
};

export const CreateTransactionModal = ({ onClose }: Props) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { data: wallets } = useGetWalletsQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createTransactionMutation = useCreateChainMutation();
  const queryClient = useQueryClient();

  const handleSubmitTransaction: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);
      await createTransactionMutation.mutateAsync(data);
      queryClient.invalidateQueries({
        queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_CREATED_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_UNSIGNED_TRANSACTIONS],
      });
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <ModalContainer>
      <Typography sx={{ marginBottom: 2 }} variant="h4">
        Добавить новую транзакцию
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitTransaction)}>
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
              {...register("coin", { required: true, maxLength: 20 })}
              inputProps={{
                ...params.inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
            />
          )}
          getOptionLabel={(option) => option.name}
        />
        <Autocomplete
          size="small"
          sx={{ marginTop: 1.5 }}
          options={wallets ?? []}
          fullWidth
          renderOption={(props, option) => (
            <Box component="li" sx={{ fontSize: 14 }} {...props}>
              {option.address} - {option.user.username}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выберите кошелек"
              {...register("wallet", { required: true })}
              inputProps={{
                ...params.inputProps,

                autoComplete: "off", // disable autocomplete and autofill
              }}
            />
          )}
          getOptionLabel={(option) => option.address}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            marginTop: 1.5,
          }}
        >
          <TextField
            label="Введите количество"
            type="number"
            fullWidth
            variant="outlined"
            size="small"
            {...register("amount", { required: true, maxLength: 20 })}
          />
        </Box>
        <TextField
          size="small"
          sx={{ marginTop: 1.5 }}
          label="Сообщение к транзакции"
          multiline
          fullWidth
          maxRows={4}
          {...register("message", { required: true, maxLength: 20 })}
        />

        <ButtonGroup>
          <Button variant="contained" type="submit">
            {isLoading ? (
              <CircularProgress
                sx={{ width: "20px !important", height: "20px !important" }}
                color="inherit"
              />
            ) : (
              <>Создать транзакцию</>
            )}
          </Button>
          <Button variant="outlined" onClick={onClose} style={{ marginLeft: 10 }}>
            Отмена
          </Button>
        </ButtonGroup>
      </form>
      {error && (
        <Typography marginTop={1} textAlign="center" variant="body2" color="error">
          {error}
        </Typography>
      )}
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
  margin-top: 16px;
`;
