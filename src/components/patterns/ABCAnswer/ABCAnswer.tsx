import { Box } from "@mui/material";
import AnswerRow from "../ABCAnswer/subcomponents/AnswerRow";
import { getColorForAnswerButton } from "../../../utility/utils";
import type { SxProps } from "@mui/material/styles";
import type { ABCanswers } from "../../../types/globalTypes";
import { QuestionMode } from "../Question/types";

interface Props {
  answers: ABCanswers;
  mode: QuestionMode;
  chosenAnswer: keyof ABCanswers | null;
  setChosenAnswer?: (chosenAnswer: keyof ABCanswers) => void;
  correctAnswer?: keyof ABCanswers;
  sx?: SxProps;
}

export default function ABCAnswer(props: Props) {
  const { answers, mode, chosenAnswer, correctAnswer, sx } = props;

  return (
    <Box sx={{ ...sx }}>
      {(["A", "B", "C"] as const).map((letter) => (
        <AnswerRow
          key={letter}
          checked={chosenAnswer === letter}
          color={getColorForAnswerButton(
            letter,
            correctAnswer,
            chosenAnswer,
            mode
          )}
          label={letter}
          disableRipple={!props.setChosenAnswer}
          onClick={() => {
            if (props.setChosenAnswer) props.setChosenAnswer(letter);
          }}
        >
          {answers[letter]}
        </AnswerRow>
      ))}
    </Box>
  );
}
