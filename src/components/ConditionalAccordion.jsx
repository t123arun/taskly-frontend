import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ConditionalAccordion({
  useAccordion,
  title,
  children,
  defaultExpanded,
}) {
  if (useAccordion) {
    return (
      <Accordion
        className="!rounded-2xl !shadow-sm "
        defaultExpanded={defaultExpanded}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h3 className="mb-2 text-purple">{title}</h3>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    );
  }

  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
