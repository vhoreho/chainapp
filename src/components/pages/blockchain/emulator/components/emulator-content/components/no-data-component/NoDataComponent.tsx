import React, { FunctionComponent } from "react";
import { Alert, Container } from "@mui/material";

type Props = {};

export const NoDataComponent: FunctionComponent<Props> = ({}) => (
  <Container>
    <Alert
      variant="filled"
      severity="info"
      color="info"
      sx={{
        boxShadow: (theme) => theme.customShadows.base,
      }}
    >
      Данных пока нет
    </Alert>
  </Container>
);
