import React, { FunctionComponent } from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";

type Props = {
  title: string;
  count: number;
  onClick: () => void;
};

export const TransactionsInProgress: FunctionComponent<Props> = ({ title, count, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick} color="success">
        <Badge badgeContent={count} color="error">
          <Iconify icon="tabler:progress-check" />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};
