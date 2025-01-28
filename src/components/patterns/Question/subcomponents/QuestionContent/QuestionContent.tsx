import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ABCAnswer from "../../../ABCAnswer/ABCAnswer";
import YesNoAnseswer from "../../../YesNoAnswer/YesNoAnswer";
import { useExamControlContext } from "../../../../../context/examControls/examControls";
import type {
  BasicQuestion,
  SpecializedQuestion,
  ABCanswers,
  Answer,
  BasicAnswer,
  SpecializedAnswer,
} from "../../../../../types/globalTypes";
import { QuestionMode } from "../../types";

interface PropsBase {
  content: string;
  mode: QuestionMode;
  chosenAnswer?: Answer;
}

interface BasicQuesitonProps extends PropsBase {
  type: BasicQuestion["type"];
  correctAnswer?: boolean;
}

interface SpecializedQuestionProps extends PropsBase {
  type: SpecializedQuestion["type"];
  correctAnswer?: keyof ABCanswers;
  answers: ABCanswers;
}

type Props = SpecializedQuestionProps | BasicQuesitonProps;

export default function QuestionContent(props: Props) {
  const { selectedAnswer, setSelectedAnswer, handleNextQuestionBtnClick } =
    useExamControlContext();
  const chosenAnswer = selectedAnswer ?? props.chosenAnswer;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isExamMode = props.mode === "exam";

  return (
    <Box
      sx={{
        gridRow: "3",
        gridColumn: "1/3",
        my: "10px",

        [theme.breakpoints.down("md")]: {
          display: "flex",
          flexDirection: "column",
          justifyContent: isExamMode ? "space-between" : "flex-start",
        },
      }}
    >
      <Box >
        <Typography
          sx={(theme) => ({
            borderLeft: `3px solid ${theme.palette.primary.main}`,
            p: "5px",
            fontSize: { xs: "0.9em", sm: "1.1em", md: "1.25em" },
          })}
          variant="h6"
        >
          {props.content}
        </Typography>
        <Box
          sx={{ fontSize: { xs: "0.7em", sm: "0.8em", md: "1em" }, mt: "20px", mb: "10px" }}
        >
          {props.type === "basic" ? (
            <YesNoAnseswer
              setChosenAnswer={setSelectedAnswer}
              chosenAnswer={chosenAnswer as BasicAnswer}
              correctAnswer={props.correctAnswer}
              mode={props.mode}
              sx={{
                fontSize: { xs: "1.5em", md: "1.3em", lg: "1.4em" },
              }}
            />
          ) : (
            <ABCAnswer
              answers={props.answers as ABCanswers}
              chosenAnswer={chosenAnswer as SpecializedAnswer}
              correctAnswer={props.correctAnswer}
              setChosenAnswer={setSelectedAnswer}
              mode={props.mode}
              sx={{ fontSize: "1.05em" }}
            />
          )}
        </Box>
      </Box>

      {isMobile && isExamMode ? (
        <Button
          onClick={handleNextQuestionBtnClick}
          variant="contained"
          sx={{
            textTransform: "unset",
            minWidth: "fit-content",
            px: "15px",
            py: "10px",
            mx: "auto",
            mt: "auto",
          }}
        >
          <Typography variant="body2">Następne pytanie</Typography>
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
}
