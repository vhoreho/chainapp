import React from "react";
import Image from "next/image";
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
        <ExplorerIcon>
          <Image src={explorer.icon} alt={explorer.name} width={30} height={30} />
        </ExplorerIcon>
        <ExplorerName>{explorer.name}</ExplorerName>
      </ExplorerCardContainer>
    </Link>
  );
};

const ExplorerCardContainer = styled.div`
  max-width: 345px;
  border-radius: 4px;
  box-shadow:
    0px 2px 1px rgba(0, 0, 0, 0.1),
    0px 4px 2px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  color: black;
  cursor: pointer; // Add cursor pointer for hover effect
  transition: transform 0.1s ease-in-out; // Add transition for smooth hover effect

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    color: #12b76a;
  }
`;

const ExplorerIcon = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const ExplorerName = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0;
  text-decoration: none !important;
  transition: color 0.2s ease-in-out; // Add transition for smooth text color change
`;
