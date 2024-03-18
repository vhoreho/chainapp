import React, { FunctionComponent } from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";

type Props = {
  title: string;
  count: number;
  onClick: () => void;
};

export const TransactionMining: FunctionComponent<Props> = ({ title, count, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick} color="info">
        <Badge badgeContent={count} color="error">
          <Iconify icon="fluent:calculator-arrow-clockwise-20-regular" />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};
