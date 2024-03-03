import { Box, styled, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { v4 } from "uuid";
import { HeadCell, Order } from "@/types/table";

type GenericData = {
  [key: string]: any;
};

export interface EnhancedTableProps<T extends GenericData> {
  headCells: readonly HeadCell<T>[];
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export const EnhancedTableHead = <T extends GenericData>(props: EnhancedTableProps<T>) => {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
    onRequestSort && onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <Cell
            key={v4()}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </Cell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const Cell = styled(TableCell)`
  padding: 8px !important;
  font-weight: 700 !important;
`;
