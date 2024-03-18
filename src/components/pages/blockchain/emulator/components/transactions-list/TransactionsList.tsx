import React, { useState } from "react";
import { styled, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { EnhancedTableHead } from "@/components/common/tables";
import { Block } from "@/types";
import { Order } from "@/types/table";
import { cells } from "./constants";

type Props = {
  transactions: Block[];
};

export const TransactionsList = ({ transactions }: Props) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Block>("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Array<Block>>(transactions);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Block) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer>
      <Table>
        <EnhancedTableHead
          headCells={cells}
          order={order}
          orderBy={orderBy}
          rowCount={rows.length}
        />
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow hover tabIndex={-1} key={row.hash} sx={{ cursor: "pointer" }}>
                <Cell size="small" align="left">
                  {row.hash}
                </Cell>
                <Cell size="small" align="left">
                  {row.prevHash}
                </Cell>
                <Cell size="small" align="left">
                  {row.user?.username}
                </Cell>
                <Cell size="small" align="left">
                  {row.data}
                </Cell>
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
