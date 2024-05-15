import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useGetMaterials } from "@/api/material";
import { useGetProfileQuery } from "@/api/profile";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";
import { Text } from "@/components/common/design-system/text/Text";
import { COLORS } from "@/constants/colors";
import { useModalContext } from "@/hooks/context";
import { createIterator } from "@/utils/colors";
import { AddMaterialModal } from "./components/add-material-modal/AddMaterialModal";

type Props = {};

type CardProps = {
  backgroundColor: string;
  textColor: string;
  hoverColor: string;
};

export const Utilities: FunctionComponent<Props> = ({}) => {
  const { openModal, closeModal } = useModalContext();
  const getNextColor = createIterator(COLORS);
  const { data: profile, isLoading } = useGetProfileQuery();
  const { data: materials, isLoading: isMaterialLoading } = useGetMaterials();

  if (isLoading && isMaterialLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <HeaderContainer>
        <PageTitle>Полезные материалы</PageTitle>
        <Button
          variant="contained"
          sx={{ display: "flex", gap: 1 }}
          onClick={() => openModal(<AddMaterialModal onClose={closeModal} profile={profile!} />)}
        >
          <Iconify icon="mdi-light:note-plus" />
          Добавить материал
        </Button>
      </HeaderContainer>
      <CardsContainer>
        {materials?.length ? (
          materials.map((item) => {
            const color = getNextColor();
            return (
              <NextLink href={item.link} target="_blank" passHref key={`${item.title}${item.id}`}>
                <StyledLink {...color}>
                  <Content className="content">
                    <Title>{item.title}</Title>
                    <Description>{item.summary}</Description>
                  </Content>
                  <Source color={color.textColor}>{item.source}</Source>
                </StyledLink>
              </NextLink>
            );
          })
        ) : (
          <Text>Материалов пока нет</Text>
        )}
      </CardsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px !important;

  @media (min-width: 1200px) {
    padding: 0 !important;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const PageTitle = styled.h2`
  font-family: "Play";
  margin: 0;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: minmax(200px, 1fr);
  grid-gap: 16px;

  @media (min-width: 575px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const NextLink = styled(Link)`
  font-family: "Play";
  text-decoration: none !important;
`;

const StyledLink = styled.div<CardProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
  padding: 16px;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};

    & .content {
      transition: all 0.3s ease;
      transform: scale(1.05);
    }

    &::after {
      transition: all 0.3s ease;
      transform: scale(1.2) skew(-20deg) translateX(40%);
    }
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    right: 50%;
    height: 100%;
    width: 50%;
    transform: skew(-20deg) translateX(50%);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  margin-bottom: 8px;
`;

const Description = styled.p`
  margin-bottom: 16px;
`;

const Source = styled.div`
  font-size: 12px;
  color: ${({ color }) => color};
  align-self: flex-end;
`;
