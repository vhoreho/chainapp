import React, { FunctionComponent } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import {
  useClearBlockchainMutation,
  useGetBlockchainQuery,
  useGetSignedTransactionsQuery,
  useGetUnsignedTransactionsQuery,
} from "@/api/blockchain";
import { ProfileResM } from "@/api/profile/type";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";
import { useModalContext } from "@/hooks/context";
import { UserRole } from "@/types";
import { TransactionsList } from "../transactions-list/TransactionsList";
import { CreateTransactionModal } from "./components/create-transaction-modal/CreateTransactionModal";
import { LoadingComponent } from "./components/loading-component/LoadingComponent";
import { MiningTransactionsModal } from "./components/mining-transactions-modal/MiningTransactionsModal";
import { NoDataComponent } from "./components/no-data-component/NoDataComponent";
import { SignedTransactions } from "./components/signed-transactions/SignedTransactions";
import { TransactionMining } from "./components/transaction-mining/TransactionMining";
import { TransactionSigning } from "./components/transaction-signing/TransactionSigning";
import { TransactionsInProgress } from "./components/transactions-in-progress/TransactionsInProgress";
import { UnsignedTransactionsModal } from "./components/unsigned-transactions-modal/UnsignedTransactionsModal";

type Props = {
  profile: ProfileResM;
};

export const EmulatorContent: FunctionComponent<Props> = ({ profile }) => {
  const { openModal, closeModal } = useModalContext();

  const { data: unsignedTransactions, isLoading: isGetUnsignedTransactionsLoading } =
    useGetUnsignedTransactionsQuery();
  const { data: signedTransactions, isLoading: isGetSignedTransactionsLoading } =
    useGetSignedTransactionsQuery();
  const { data: blockchain, isLoading: isBlockchainLoading } = useGetBlockchainQuery();
  const { mutate, isPending } = useClearBlockchainMutation();

  const handleClearBlockchain = () => {
    mutate();
  };

  if (isGetUnsignedTransactionsLoading || isGetSignedTransactionsLoading || isBlockchainLoading) {
    return <LoadingComponent />;
  }

  if (!unsignedTransactions || !signedTransactions || !blockchain) {
    return <NoDataComponent />;
  }

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2, paddingInline: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid md={6}>
          <Typography component="h3" variant="h3">
            Реестр транзакций
          </Typography>
        </Grid>
        <Grid md={6} display="flex" justifyContent="flex-end" gap={2}>
          {profile.role === UserRole.BLOCK_CONFIRMER ? (
            signedTransactions.length ? (
              <TransactionMining
                title="Подтвердить блоки"
                count={signedTransactions.length}
                onClick={() => openModal(<MiningTransactionsModal onClose={closeModal} />)}
              />
            ) : null
          ) : null}
          {profile.role === UserRole.BLOCK_CREATOR && signedTransactions.length ? (
            <TransactionsInProgress
              title="Транзакции в процессе создания"
              count={signedTransactions.length}
              onClick={() => openModal(<SignedTransactions onClose={closeModal} />)}
            />
          ) : null}
          {profile.role === UserRole.BLOCK_CREATOR && unsignedTransactions.length ? (
            <TransactionSigning
              title="Подписать транзакции"
              count={unsignedTransactions.length}
              onClick={() => openModal(<UnsignedTransactionsModal onClose={closeModal} />)}
            />
          ) : null}
          {profile.role === UserRole.BLOCK_CREATOR && (
            <Button
              variant="contained"
              sx={{ display: "flex", gap: 1 }}
              onClick={() => openModal(<CreateTransactionModal onClose={closeModal} />)}
            >
              <Iconify icon="mdi-light:note-plus" />
              Создать блок
            </Button>
          )}
          {profile.role === UserRole.ADMINISTRATOR && (
            <Button
              color="error"
              variant="contained"
              sx={{ display: "flex", gap: 1 }}
              onClick={handleClearBlockchain}
            >
              {isPending ? (
                <CircularProgress
                  sx={{ width: "20px !important", height: "20px !important" }}
                  color="inherit"
                />
              ) : (
                <>
                  <Iconify icon="material-symbols-light:auto-delete-outline" />
                  Очистить реестр
                </>
              )}
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid container>
        {blockchain.length ? (
          <TransactionsList transactions={blockchain} />
        ) : (
          <Typography variant="body1" textAlign="center" fontWeight="bold" color="grey">
            Транзакций пока нет
          </Typography>
        )}
      </Grid>
    </Box>
  );
};
