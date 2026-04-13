import { Box } from "@mui/material";
import { flexCenter } from "../../../../../utility/styling";
import type { QuestionMode } from "../../types";
import type { QuestionType } from "../../../../../types/globalTypes";
import ExamMode from "./subcomponents/ExamMode";
import PreviewMode from "./subcomponents/PreviewMode";

interface Props {
  type: QuestionType;
  mode: QuestionMode;
}

export default function QuestionControls(props: Props) {
  return (
    <Box
      sx={(theme) => ({
        ...flexCenter,
        flexDirection: "column",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        gridRow: "2",
        gridColumn: "2",
        fontSize: "1.1em",

        [theme.breakpoints.down("md")]: {
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          ml: "5px",
          mr: { xs: "min(10%, 60px)", sm: "0" },
          mb: "15px",
          gridRow: "1",
          gridColumn: "1",
          fontSize: "1em",
          minHeight: "3.7em",
        },
      })}
    >
      {props.mode === "exam" ? <ExamMode type={props.type} /> : <PreviewMode />}
    </Box>
  );
}
