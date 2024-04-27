import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Explorer } from "../../../types";

type Props = {
  explorer: Explorer;
};

export const ExplorerCard: React.FC<Props> = ({ explorer }) => {
  return (
    <Link href={explorer.url} passHref style={{ textDecoration: "none" }}>
      <ExplorerCardContainer>
        <ExplorerIcon>{explorer.icon}</ExplorerIcon>
        <ExplorerName>{explorer.name}</ExplorerName>
      </ExplorerCardContainer>
    </Link>
  );
};

const ExplorerCardContainer = styled.div`
  border-radius: 4px;
  width: 250px;
  box-shadow:
    0px 2px 1px rgba(0, 0, 0, 0.1),
    0px 4px 2px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #fff;
  gap: 12px;
  color: black;
  cursor: pointer; // Add cursor pointer for hover effect
  transition: transform 0.1s ease-in-out;
  display: flex; // Add transition for smooth hover effect

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    color: #12b76a;
  }
`;

const ExplorerIcon = styled.div`
  position: relative;

  & svg {
    width: 60px;
    height: 60px;
  }
`;

const ExplorerName = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
  text-decoration: none !important;
  transition: color 0.2s ease-in-out; // Add transition for smooth text color change
`;
