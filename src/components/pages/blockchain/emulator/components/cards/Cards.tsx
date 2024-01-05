import { FunctionComponent } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { v4 } from "uuid";
import { ProfileResM } from "@/api/profile/type";
import { ZERO_BLOCK } from "@/constants/vars";
import { Block } from "@/types";

type Props = {
  profile: ProfileResM;
  blockchain: Block[];
};

const Card = ({ hash }: Block) => (
  <Accordion>
    <AccordionSummary>
      <Box display="flex">
        <Typography fontWeight="600">ID:</Typography>
        {hash}
      </Box>
    </AccordionSummary>
    <AccordionDetails></AccordionDetails>
  </Accordion>
);

export const CardsContainer: FunctionComponent<Props> = ({ profile, blockchain }) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Card {...ZERO_BLOCK} />
      {blockchain.map((block) => (
        <div key={v4()}>
          <Card {...block} />
        </div>
      ))}
    </Box>
  );
};
