import { FunctionComponent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { v4 } from "uuid";
import { ProfileResM } from "@/api/profile/type";
import { ZERO_BLOCK } from "@/constants/vars";
import { useResponsive } from "@/hooks/use-responsive";
import { Block } from "@/types";

type ContainerProps = {
  profile: ProfileResM;
  blockchain: Block[];
};

type CardProps = Block & {
  isZero?: boolean;
};

const Card: FunctionComponent<CardProps> = ({ hash, created_date, isZero }) => {
  const smUp = useResponsive("up", "sm");

  return (
    <Accordion>
      <AccordionSummary>
        <Grid container spacing={2}>
          <Grid sm={12} md={6}>
            <Box display="flex" gap={2}>
              <Typography fontWeight="600">ID:</Typography>
              <Typography noWrap sx={{ maxWidth: smUp ? "fit-content" : 250 }}>
                {hash}
              </Typography>
            </Box>
          </Grid>
          <Grid md={6} alignContent="end">
            <Box display="flex" gap={2}>
              <Typography fontWeight="600">Дата создания:</Typography>
              <Typography noWrap sx={{ maxWidth: "fit-content" }}>
                {isZero ? "Дата создания блока" : moment(created_date).format(smUp ? "LLL" : "L")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export const CardsContainer: FunctionComponent<ContainerProps> = ({ profile, blockchain }) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Card {...ZERO_BLOCK} isZero />
      {blockchain.map((block) => (
        <Card {...block} key={v4()} />
      ))}
    </Box>
  );
};
