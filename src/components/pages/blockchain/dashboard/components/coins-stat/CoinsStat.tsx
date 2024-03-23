import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Meta, useGetCoinsMutation } from "@/api/coins";
import { SkeletonRows } from "@/components/common/tables";
import { CoinsStatData, Order } from "@/types/table";
import { addApostrophes } from "@/utils/format-number";
import { EnhancedTableHead } from "../../../../../common/tables/enhanced-table-head/EnhancedTableHead";
import { headCells, initialMetaState } from "./constants";
import { createData } from "./helpers";

export const CoinsStat = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof CoinsStatData>("price");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Array<CoinsStatData>>([]);
  const [meta, setMeta] = useState<Meta>({ ...initialMetaState, limit: rowsPerPage });
  const [loading, setLoading] = useState(true);
  const getCoinsMutation = useGetCoinsMutation();

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CoinsStatData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    try {
      setLoading(true);
      const { meta, result } = await getCoinsMutation.mutateAsync({
        page: ++newPage,
        limit: rowsPerPage,
        currency: "USD",
      });
      setMeta(meta);
      setRows(
        result.map((coin) =>
          createData(+coin.id, coin.price, coin.totalSupply, coin.volume, coin.name, coin.icon),
        ),
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowsPerPageValue = event.target.value;
    setRowsPerPage(+rowsPerPageValue);
  };

  useEffect(() => {
    const handleFetchCoins = async () => {
      try {
        setLoading(true);
        const { meta, result: coins } = await getCoinsMutation.mutateAsync({
          page: 1,
          limit: rowsPerPage,
          currency: "USD",
        });
        setMeta(meta);
        setRows(
          coins.map((coin) =>
            createData(+coin.id, coin.price, coin.totalSupply, coin.volume, coin.name, coin.icon),
          ),
        );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    handleFetchCoins();
  }, [rowsPerPage]);

  return (
    <Card>
      <Header title="Коины" />
      <Content>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {loading ? (
                <SkeletonRows count={rowsPerPage} />
              ) : (
                rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name + row.price}
                      sx={{ cursor: "pointer" }}
                    >
                      <Cell size="small" component="th" scope="row" padding="none">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Image src={row.icon} alt="icon" width={30} height={30} />
                          {row.name}
                        </Box>
                      </Cell>
                      <Cell size="small" align="right">
                        {addApostrophes(+row.price.toFixed(2))}$
                      </Cell>
                      <Cell size="small" align="right">
                        {addApostrophes(row.totalSupply)}$
                      </Cell>
                      <Cell size="small" align="right">
                        {addApostrophes(+row.volume.toFixed(2))}$
                      </Cell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={meta.itemCount ?? rows.length}
          rowsPerPage={rowsPerPage}
          page={meta?.page - 1 ?? 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          slotProps={{ actions: { previousButton: { disabled: meta.page === 1 } } }}
          labelRowsPerPage="Количество строк"
        />
      </Content>
    </Card>
  );
};

const Header = styled(CardHeader)`
  padding: 8px 16px !important;
`;

const Content = styled(CardContent)`
  &:last-child {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
`;

const Cell = styled(TableCell)`
  padding: 8px !important;
`;
