import React from "react";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import { ExplorerCard } from "./components/common/explorer-card/ExplorerCard";
import { EXPLORERS } from "./constants";

export const Explorer: React.FunctionComponent = () => {
  return (
    <Container sx={{ fontFamily: "play" }}>
      <ExplorerTitle>Выберите обозреватель</ExplorerTitle>
      <Grid container spacing={1} display="flex" justifyContent="center">
        {EXPLORERS.map((explorer) => (
          <Grid item key={explorer.id} xs={12} sm={6} md={4}>
            <ExplorerCard explorer={explorer} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const ExplorerTitle = styled.h1`
  text-align: center;
`;
