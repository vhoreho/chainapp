import React, { FunctionComponent, useState } from "react";
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
import { useSignTransactionMutation } from "@/api/blockchain";
import { UnsignedTransaction } from "@/types";

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
  const { register, handleSubmit } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const signUnsignedTransactionMutation = useSignTransactionMutation();
  const queryClient = useQueryClient();

  const handleSubmitTransaction: SubmitHandler<IFormInput> = async (data) => {
    checkAnswer(+data.answer);
  };

  const generateExample = () => {
    const number1 = Math.floor(Math.random() * 100) + 1;
    const number2 = Math.floor(Math.random() * 100) + 1;
    setFirstNumber(number1);
    setSecondNumber(number2);
  };

  const checkAnswer = (answer: number) => {
    try {
      const correctAnswer = firstNumber + secondNumber;
      if (correctAnswer !== answer) {
        throw new Error();
      } else {
        console.log("CORRECT");
      }
    } catch (error) {
      generateExample();
    }
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle>Решите пример</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitTransaction)}>
        <DialogContent>
          <Typography>
            Решите пример: {firstNumber} + {secondNumber} =
          </Typography>
          <TextField
            label="Ответ"
            fullWidth
            size="small"
            {...register("answer", { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={generateExample} color="primary">
            Новый пример
          </Button>
          <Button size="small" onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button size="small" type="submit" color="primary">
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Проверить ответ"}
          </Button>
        </DialogActions>
      </form>
      {error && (
        <Typography paddingBottom={2} textAlign="center" variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Dialog>
  );
};
