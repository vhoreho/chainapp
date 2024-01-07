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

type CardsContainerProps = {
  profile: ProfileResM;
  blockchain: Block[];
};

type CardProps = Block & {
  isZero?: boolean;
};

const Card = ({ hash, created_date, isZero, prevHash, data }: CardProps) => {
  const smUp = useResponsive("up", "sm");

  return (
    <Accordion>
      <AccordionSummary>
        <Grid container spacing={2}>
          <Grid md={6} wrap="nowrap" container gap={1} direction="row">
            <Grid item xs={1}>
              <Typography fontWeight="600">ID:</Typography>
            </Grid>
            <Grid item zeroMinWidth>
              <Typography noWrap>{hash}</Typography>
            </Grid>
          </Grid>
          <Grid md={6} container gap={1} direction="row">
            <Typography fontWeight="600">Дата:</Typography>
            <Typography sx={{ maxWidth: 270 }} noWrap>
              {isZero
                ? "Дата создания блока"
                : smUp
                  ? moment(created_date).format("LLL")
                  : moment(created_date).format("L")}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid md={6}>
            <Grid>
              <Typography fontWeight="600">Предыдущий хэш:</Typography>
            </Grid>
            <Grid>{prevHash}</Grid>
          </Grid>
          <Grid md={6}>
            <Grid>
              <Typography fontWeight="600">Данные о блоке:</Typography>
              <Grid container direction={smUp ? "row" : "column"} wrap="nowrap">
                <Typography fontWeight={600}>Отправитель:</Typography>
                <Grid item zeroMinWidth>
                  <Typography>{JSON.parse(data).receivedAddress}</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Typography fontWeight={600}>Сумма:</Typography>
                <Typography>{JSON.parse(data).amount}</Typography>
              </Grid>
              <Grid container direction="row">
                <Typography fontWeight={600}>Сообщение:</Typography>
                <Typography>{JSON.parse(data).message}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export const CardsContainer: FunctionComponent<CardsContainerProps> = ({ profile, blockchain }) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Card {...ZERO_BLOCK} isZero />
      {blockchain.map((block) => (
        <div key={v4()}>
          <Card {...block} />
        </div>
      ))}
    </Box>
  );
};
