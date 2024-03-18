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
import { AxiosError } from "axios";
import { useSignTransactionMutation } from "@/api/blockchain";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { UnsignedTransaction } from "@/types";

type Props = {
  isModalOpen: boolean;
  handleClose: () => void;
  selectedTransaction: UnsignedTransaction;
};

export interface IFormInput {
  key: string;
}

export const SecondaryModal: FunctionComponent<Props> = ({
  isModalOpen,
  handleClose,
  selectedTransaction,
}) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signUnsignedTransactionMutation = useSignTransactionMutation();
  const queryClient = useQueryClient();

  const handleSubmitTransaction: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      await signUnsignedTransactionMutation.mutateAsync({
        privateKey: data.key,
        id: selectedTransaction.id,
      });
      queryClient.invalidateQueries({
        queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_UNSIGNED_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_SIGNED_TRANSACTIONS],
      });

      handleClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose}>
      <DialogTitle>Введите ключ подписи</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitTransaction)}>
        <DialogContent sx={{ width: 500, pt: "8px !important" }}>
          <TextField
            label="Введите ключ"
            fullWidth
            size="small"
            {...register("key", { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button size="small" type="submit" color="primary">
            {isLoading ? (
              <CircularProgress
                sx={{ width: "20px !important", height: "20px !important" }}
                color="inherit"
              />
            ) : (
              <>Подписать</>
            )}
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
