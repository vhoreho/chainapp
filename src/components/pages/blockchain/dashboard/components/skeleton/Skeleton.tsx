import React, { FunctionComponent } from "react";
import { Box, Grid, Table, TableBody, TableContainer } from "@mui/material";
import { EnhancedTableHead, SkeletonRows } from "@/components/common/tables";
import { headCells } from "../coins-stat/constants";

type Props = {};

export const Skeleton: FunctionComponent<Props> = ({}) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item lg={8} xl={6}>
          <TableContainer>
            <Table>
              <EnhancedTableHead headCells={headCells} order="asc" orderBy="id" rowCount={10} />
              <TableBody>
                <SkeletonRows count={10} />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={4} xl={6}>
          <Box></Box>
        </Grid>
      </Grid>
    </Box>
  );
};
