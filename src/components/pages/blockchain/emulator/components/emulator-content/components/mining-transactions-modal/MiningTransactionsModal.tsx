import React, { FunctionComponent, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetSignedTransactionsQuery } from "@/api/blockchain";
import { SkeletonRows } from "@/components/common/tables";
import { UnsignedTransaction } from "@/types";
import { cryptoData } from "../create-transaction-modal/constants";
import { SecondaryModal } from "./components/secondary-modal/SecondaryModal";

type Props = {
  onClose: () => void;
};

export const MiningTransactionsModal: FunctionComponent<Props> = ({ onClose }) => {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<UnsignedTransaction | null>(null);
  const { data: transactions, isLoading } = useGetSignedTransactionsQuery();

  const handleSignButtonClick = (transaction: UnsignedTransaction) => {
    setSelectedTransaction(transaction);
    setIsSecondModalOpen(true);
  };

  const handleSecondModalClose = () => {
    setIsSecondModalOpen(false);
  };

  if (!transactions?.length) {
    onClose();
  }

  return (
    <Box display="flex" flexDirection="column" maxHeight="calc(100vh - 80px)" overflow="auto">
      <Typography variant="h5">Подпись транзакций</Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small">Монета</TableCell>
              <TableCell size="small">Сумма</TableCell>
              <TableCell size="small">Кому</TableCell>
              <TableCell size="small">Действие</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <SkeletonRows />
          ) : transactions?.length ? (
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell size="small">
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        "& > img": { mr: 1, flexShrink: 0 },
                        whiteSpace: "nowrap",
                        fontSize: 12,
                      }}
                    >
                      <Image
                        src={cryptoData.find((c) => c.name === transaction.coin)?.icon!}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      {transaction.coin}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", fontSize: 12 }} size="small">{`${
                    transaction.amount
                  } ${cryptoData.find((c) => c.name === transaction.coin)?.symbol}`}</TableCell>
                  <TableCell size="small" sx={{ whiteSpace: "nowrap", fontSize: 12 }}>{`${
                    transaction.wallet.address
                  } (${transaction.wallet.user && transaction.wallet.user.username})`}</TableCell>
                  <TableCell size="small">
                    <Button
                      sx={{ whiteSpace: "nowrap", fontSize: 12 }}
                      size="small"
                      variant="contained"
                      onClick={() => handleSignButtonClick(transaction)}
                    >
                      Подтвердить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : null}
        </Table>
      </TableContainer>

      <Button
        size="small"
        sx={{ marginTop: 2, alignSelf: "flex-end" }}
        onClick={onClose}
        color="primary"
      >
        Закрыть
      </Button>

      {selectedTransaction && (
        <SecondaryModal
          isModalOpen={isSecondModalOpen}
          handleClose={handleSecondModalClose}
          selectedTransaction={selectedTransaction}
        />
      )}
    </Box>
  );
};
