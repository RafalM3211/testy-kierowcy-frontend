import { Box, Typography } from "@mui/material";
import AnswerButton from "../../../atoms/AnswerButton/AnswerButton";
import type { ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  checked?: boolean;
  label: "A" | "B" | "C";
  children: string;
}

export default function AnswerRow(props: Props) {
  const { checked, label, children, sx, ...other } = props;

  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        my: "20px",
        ml: "10px",
        pr: "10px",
        width: "fit-content",
        bgcolor: checked ? "grey.50" : "unset",
        transition: "background-color 0.25s ",
        ...sx,

        "&:hover": {
          bgcolor: "grey.100",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "0.9em",
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
        }}
        component="label"
      >
        <AnswerButton
          checked={checked}
          aria-label={label}
          sx={{
            minWidth: "2.7em",
            width: "2.7em",
            ml: "0",
            height: "2.5em",
            display: "block",
            p: 0,
          }}
          {...other}
        >
          {label}
        </AnswerButton>
        {children}
      </Typography>
    </Box>
  );
}
