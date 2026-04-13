import { Box, Typography } from "@mui/material";
import { flexCenter } from "../../../utility/styling";
import HighlitedText from "../../atoms/HighlitedText/HighlitedText";
import ButtonLink from "../../atoms/ButtonLink/ButtonLink";
import { ReactNode } from "react";

interface Props {
  errorCode: number;
  errorMessage: string;
  children?: ReactNode
}

export default function Error404(props: Props) {
  return (
    <Box
      sx={{
        ...flexCenter,
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography variant="h3" component="p">
        Błąd{" "}
        <HighlitedText
          sx={{ fontSize: "3em", fontWeight: "400", lineHeight: "1em" }}
        >
          {props.errorCode}
        </HighlitedText>
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: "25px" }}>
        {props.errorMessage}
      </Typography>
      {props.children}
      <ButtonLink to="/" variant="contained" size="small" sx={{ mb: "50px" }}>
        Powrót do strony głównej
      </ButtonLink>
    </Box>
  );
}
