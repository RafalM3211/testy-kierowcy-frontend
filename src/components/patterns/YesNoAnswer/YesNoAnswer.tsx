import { Box } from "@mui/material";
import AnswerButton from "../../atoms/AnswerButton/AnswerButton";
import { getColorForAnswerButton } from "../../../utility/utils";
import { BasicAnswer } from "../../../types/globalTypes";
import type { SxProps } from "@mui/material/styles";
import { QuestionMode } from "../Question/types";

interface Props {
  setChosenAnswer?: (chosenAnswer: boolean) => void;
  chosenAnswer: BasicAnswer;
  mode: QuestionMode;
  correctAnswer?: boolean;
  sx?: SxProps;
}

export default function YesNoAnseswer(props: Props) {
  function handleAnswerChange(answer: boolean) {
    if (props.setChosenAnswer) {
      props.setChosenAnswer(answer);
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...props.sx }}>
      <AnswerButton
        onClick={() => {
          handleAnswerChange(true);
        }}
        checked={props.chosenAnswer === true}
        size="large"
        sx={{
          px: "1.1em",
          py: "0.15em",
          fontSize: "1em",
          mr: "1.2em",
        }}
        disableRipple={!props.setChosenAnswer}
        color={getColorForAnswerButton(
          true,
          props.correctAnswer,
          props.chosenAnswer,
          props.mode
        )}
      >
        tak
      </AnswerButton>
      <AnswerButton
        onClick={() => {
          handleAnswerChange(false);
        }}
        checked={props.chosenAnswer === false}
        size="large"
        sx={{ px: "1em", py: "0.15em", fontSize: "1em" }}
        disableRipple={!props.setChosenAnswer}
        color={getColorForAnswerButton(
          false,
          props.correctAnswer,
          props.chosenAnswer,
          props.mode
        )}
      >
        nie
      </AnswerButton>
    </Box>
  );
}
