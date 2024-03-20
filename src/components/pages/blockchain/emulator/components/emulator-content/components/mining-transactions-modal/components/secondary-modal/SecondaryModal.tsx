import React, { FunctionComponent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useMineBlockMutation } from "@/api/blockchain";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { UnsignedTransaction } from "@/types";
import { generateMathExample } from "@/utils/math";

type Props = {
  isModalOpen: boolean;
  handleClose: () => void;
  selectedTransaction: UnsignedTransaction;
};

export interface IFormInput {
  answer: string;
}

export const SecondaryModal: FunctionComponent<Props> = ({
  isModalOpen,
  handleClose,
  selectedTransaction,
}) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number | undefined>();
  const [secondNumber, setSecondNumber] = useState<number | undefined>();
  const [correctResult, setCorrectResult] = useState<number | undefined>();
  const [operation, setOperation] = useState<string>("");

  const mineTransactionMutation = useMineBlockMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    generateExample();
  }, [isModalOpen]);

  const handleSubmitTransaction: SubmitHandler<IFormInput> = async (data) => {
    checkAnswer(+data.answer);
  };

  const generateExample = () => {
    const { number1, number2, result, selectedOperation } = generateMathExample();
    setFirstNumber(number1);
    setSecondNumber(number2);
    setOperation(selectedOperation);
    setCorrectResult(result);
    setError(null);
  };

  const checkAnswer = async (answer: number) => {
    try {
      setIsLoading(true);
      if (correctResult !== answer) {
        throw new Error();
      } else {
        await mineTransactionMutation.mutateAsync({
          id: selectedTransaction.id,
          nonce: correctResult,
        });
        queryClient.invalidateQueries({
          queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_TRANSACTIONS_FOR_MINING],
        });
        queryClient.invalidateQueries({
          queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_CREATED_TRANSACTIONS],
        });
        queryClient.invalidateQueries({
          queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_SIGNED_TRANSACTIONS],
        });
        reset();
        handleClose();
      }
    } catch (error) {
      setError("Неправильный ответ");
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle sx={{ padding: "8px 12px" }}>Решите пример</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitTransaction)}>
        <DialogContent sx={{ padding: "0 12px 8px" }}>
          <Typography>
            Решите пример: {firstNumber} {operation} {secondNumber} =
          </Typography>
          <TextField
            sx={{ width: "300px" }}
            label="Ответ"
            fullWidth
            size="small"
            {...register("answer", { required: true })}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Button variant="outlined" size="small" onClick={generateExample} color="primary">
            Новый пример
          </Button>
          <Button variant="contained" size="small" type="submit" color="primary">
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Проверить ответ"}
          </Button>
        </DialogActions>
      </form>
      {error && (
        <Typography paddingBottom={2} textAlign="center" variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Button
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          padding: 0,
          minWidth: "fit-content",
        }}
      >
        <Iconify icon="mdi:close" />
      </Button>
    </Dialog>
  );
};
