import React from "react";
import { Box, Skeleton, styled, TableCell, TableRow } from "@mui/material";

const SkeletonRow = () => {
  return (
    <TableRow>
      <Cell>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: 1,
          }}
        >
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" sx={{ flexGrow: 1 }} />
        </Box>
      </Cell>
      <Cell>
        <Skeleton variant="text" />
      </Cell>
      <Cell>
        <Skeleton variant="text" />
      </Cell>
      <Cell>
        <Skeleton variant="text" />
      </Cell>
    </TableRow>
  );
};

export const SkeletonRows = ({ count = 1 }) => {
  const skeletonArray = Array.from({ length: count }, (_, index) => <SkeletonRow key={index} />);

  return <>{skeletonArray}</>;
};

const Cell = styled(TableCell)`
  padding: 8px !important;
`;
