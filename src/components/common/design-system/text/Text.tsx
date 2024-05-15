import React, { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

export const Text: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <TextSpan>{children}</TextSpan>;
};

const TextSpan = styled.span`
  font-family: "Play";
`;
