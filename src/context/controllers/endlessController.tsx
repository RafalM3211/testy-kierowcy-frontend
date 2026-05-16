import { ReactNode } from "react";
import type { EndPayload, NextBtnClickPayload, DataControls } from "./types";
import type { Question } from "../../types/globalTypes";

import ControllerBaseProvider, { checkAndSaveAnswer } from "./controllerBase";
import { useAnswersContext } from "../Answers/Answers";

interface Props {
  dataControls: DataControls;
  question: Question;
  children: ReactNode;
  getNextQuestion: (answeredIds: number[]) => Question;
}

function handleNextQuestionBtnClick(payload: NextBtnClickPayload) {
  payload.nextQuestion();
}

function end(payload: EndPayload) {
  payload.addAnswer(payload.currentQuestion, payload.selectedAnswer);
  if (payload.user) {
    checkAndSaveAnswer(
      payload.user.id,
      payload.currentQuestion,
      payload.selectedAnswer,
    );
  }
  payload.navigate("/");
}

export default function EndlessControllerProvider(props: Props) {
  const { answeredQuestions } = useAnswersContext();
  const answeredIds = answeredQuestions.map((question) => question.id);

  return (
    <ControllerBaseProvider
      data={props.question}
      dataControls={props.dataControls}
      getNextQuestion={() => props.getNextQuestion(answeredIds)}
      onNextBtnClick={handleNextQuestionBtnClick}
      onEnd={end}
    >
      {props.children}
    </ControllerBaseProvider>
  );
}
