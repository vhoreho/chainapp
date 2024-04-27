import React, { ReactNode } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Iconify } from "../iconify/Iconify";

type Props = {
  summary: ReactNode;
  details?: ReactNode;
};

export const AccordionMUI: React.FC<Props> = ({ summary, details }) => {
  return (
    <Accordion disableGutters sx={{ borderBottom: "1px solid gainsboro" }}>
      <AccordionSummary
        expandIcon={<Iconify icon="octicon:chevron-down-16" />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {summary}
      </AccordionSummary>
      {details && <AccordionDetails sx={{ padding: 0 }}>{details}</AccordionDetails>}
    </Accordion>
  );
};
