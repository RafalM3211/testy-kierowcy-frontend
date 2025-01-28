import { Box, useTheme, useMediaQuery } from "@mui/material";
import InfoChip from "../../../../atoms/InfoChip/InfoChip";
import HighlitedText from "../../../../atoms/HighlitedText/HighlitedText";

interface Props {
  id: number;
  value: number;
}

export default function QuestionDetails(props: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            mt: "5px",
            mb: "30px",
            ml: "5px",
            gridRow: "1",
            gridColumn: "2",
            fontSize: "0.9em"
          }}
        >
          <InfoChip>
            Id pytania:{" "}
            <HighlitedText >{props.id}</HighlitedText>
          </InfoChip>
          <InfoChip>
            Wartość punktowa:{" "}
            <HighlitedText >
              {props.value}
            </HighlitedText>
          </InfoChip>
          <InfoChip>
            Kategoria:{" "}
            <HighlitedText >B</HighlitedText>
          </InfoChip>
        </Box>
      )}
    </>
  );
}
