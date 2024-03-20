import React from "react";
import Image from "next/image";
import { Box, styled, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { EnhancedTableHead } from "@/components/common/tables";
import { Block } from "@/types";
import { cryptoData } from "../emulator-content/components/create-transaction-modal/constants";
import { cells } from "./constants";

type Props = {
  transactions: Block[];
};

export const TransactionsList = ({ transactions }: Props) => {
  return (
    <TableContainer sx={{ background: "white", borderRadius: "8px" }}>
      <Table>
        <EnhancedTableHead
          headCells={cells}
          order="desc"
          orderBy="id"
          rowCount={transactions.length}
        />
        <TableBody>
          {transactions.map((row) => {
            return (
              <TableRow hover tabIndex={-1} key={row.hash} sx={{ cursor: "pointer", fontSize: 14 }}>
                <TableCell size="small" align="left">
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      "& > img": { mr: 1, flexShrink: 0 },
                      whiteSpace: "nowrap",
                      fontSize: 14,
                    }}
                  >
                    <Image
                      src={cryptoData.find((c) => c.name === row.coin)?.icon!}
                      alt="icon"
                      width={20}
                      height={20}
                    />
                    {row.coin}
                  </Box>
                </TableCell>
                <TableCell
                  size="small"
                  align="left"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {`${row.amount} `}
                  <strong>{cryptoData.find((c) => c.name === row.coin)?.symbol}</strong>
                </TableCell>
                <TableCell
                  size="small"
                  align="left"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {row.hash}
                </TableCell>
                <TableCell
                  size="small"
                  align="left"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {row.prevHash}
                </TableCell>
                <TableCell
                  size="small"
                  align="left"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {row.fromWallet.address}
                </TableCell>
                <TableCell
                  size="small"
                  align="left"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {row.toWallet.address}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Cell = styled(TableCell)`
  padding: 8px !important;
`;
