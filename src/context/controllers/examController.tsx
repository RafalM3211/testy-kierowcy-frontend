import { ReactNode } from "react";
import type {
  EndExamPayload,
  NextBtnClickPayload,
  DataControls,
} from "./types";
import type { ExamQuestions } from "../../types/globalTypes";

import ControllerBaseProvider, { checkAndSaveAnswer } from "./controllerBase";

interface Props {
  dataControls: DataControls;
  examQuestions: ExamQuestions;
  children: ReactNode;
}

function getNextQuestion(examQuestions: ExamQuestions, currentIndex: number) {
  const flattenQuestions = [
    ...examQuestions.basic,
    ...examQuestions.specialized,
  ];
  return flattenQuestions[currentIndex + 1];
}

function handleNextQuestionBtnClick(payload: NextBtnClickPayload) {
  if (payload.questionCount === 32) {
    payload.endExam();
  } else {
    payload.nextQuestion();
  }
}

function endExam(payload: EndExamPayload) {
  payload.addAnswer(payload.currentQuestion, payload.selectedAnswer);
  if (payload.user) {
    checkAndSaveAnswer(
      payload.user.id,
      payload.currentQuestion,
      payload.selectedAnswer,
    );
  }
  payload.navigate("/summary");
}

export default function ExamControllerProvider(props: Props) {
  return (
    <ControllerBaseProvider
      examQuestions={props.examQuestions}
      dataControls={props.dataControls}
      getNextQuestion={getNextQuestion}
      onNextBtnClick={handleNextQuestionBtnClick}
      onEndExam={endExam}
    >
      {props.children}
    </ControllerBaseProvider>
  );
}
