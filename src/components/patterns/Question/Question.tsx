import QuestionContainer from "./subcomponents/QuestionContainer/QuestionContainer";
import QuestionDetails from "./subcomponents/QuestionDetails/QuestionDetails";
import QuestionMedia from "./subcomponents/QuestionMedia/QuestionMedia";
import QuestionContent from "./subcomponents/QuestionContent/QuestionContent";
import QuestionControls from "./subcomponents/QuestionControls/QuestionControls";
import { Answer, Question as QuestionType } from "../../../types/globalTypes";
import { SxProps } from "@mui/material";
import { QuestionMode } from "./types";
import { ErrorBoundary } from "react-error-boundary";
import ErrorScreen from "../ErrorScreen/ErrorScreen";

interface Props {
  question: QuestionType;
  mode: QuestionMode;
  chosenAnswer?: Answer;
  sx?: SxProps;
}

export default function Question(props: Props) {
  const { question, chosenAnswer, mode } = props;

  console.log(question, chosenAnswer, mode);

  return (
    <ErrorBoundary fallback={<ErrorScreen />}>
      <QuestionContainer sx={props.sx}>
        <QuestionDetails id={question.id} value={question.value} />
        <QuestionMedia
          type={question.type}
          mode={mode}
          media={question.media}
        />
        {question.type === "basic" ? (
          <QuestionContent
            chosenAnswer={chosenAnswer}
            correctAnswer={question.correctAnswer}
            content={question.content}
            mode={mode}
            type={"basic"}
          />
        ) : (
          <QuestionContent
            chosenAnswer={chosenAnswer}
            correctAnswer={question.correctAnswer}
            content={question.content}
            mode={mode}
            type="specialized"
            answers={question.answers}
          />
        )}
        <QuestionControls type={question.type} mode={mode} />
      </QuestionContainer>
    </ErrorBoundary>
  );
}
