import React, { FunctionComponent } from "react";
import { alpha, Container, Skeleton } from "@mui/material";

type Props = {};

export const LoadingComponent: FunctionComponent<Props> = ({}) => (
  <Container>
    <Skeleton
      sx={{
        width: "100%",
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
        minHeight: 160,
      }}
    />
  </Container>
);
