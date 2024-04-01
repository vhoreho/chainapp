import React from "react";
import { Container } from "@mui/material";
import styled from "styled-components";
import { ExplorerCard } from "./components/common/explorer-card/ExplorerCard";
import { EXPLORERS } from "./constants";

export const Explorer: React.FunctionComponent = () => {
  return (
    <Container sx={{ fontFamily: "play", alignItems: "center" }} disableGutters>
      <ExplorerTitle>Выберите обозреватель</ExplorerTitle>
      <ExplorerContainer>
        {EXPLORERS.map((explorer) => (
          <ExplorerCard explorer={explorer} key={explorer.id} />
        ))}
      </ExplorerContainer>
    </Container>
  );
};

const ExplorerTitle = styled.h1`
  text-align: center;
`;

const ExplorerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;
