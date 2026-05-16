import { ReactNode } from "react";
import ControllerBaseProvider, { checkAndSaveAnswer } from "./controllerBase";
import { useAnswersContext } from "../Answers/Answers";
import { useOnMount } from "../../utility/hooks";
import type { EndPayload, NextBtnClickPayload, DataControls } from "./types";
import type { ExamQuestions } from "../../types/globalTypes";

interface Props {
  dataControls: DataControls;
  examQuestions: ExamQuestions;
  children: ReactNode;
}

function getNextQuestion(data: ExamQuestions, currentIndex: number) {
  const flattenQuestions = [...data.basic, ...data.specialized];
  return flattenQuestions[currentIndex + 1];
}

function handleNextQuestionBtnClick(payload: NextBtnClickPayload) {
  if (payload.questionCount === 32) {
    payload.end && payload.end();
  } else {
    payload.nextQuestion();
  }
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
  payload.navigate("/summary");
}

export default function ExamControllerProvider(props: Props) {
  const { clearAnswers } = useAnswersContext();

  useOnMount(() => {
    clearAnswers();
  });
  return (
    <ControllerBaseProvider
      data={props.examQuestions}
      dataControls={props.dataControls}
      getNextQuestion={getNextQuestion as any}
      onNextBtnClick={handleNextQuestionBtnClick}
      onEnd={end}
    >
      {props.children}
    </ControllerBaseProvider>
  );
}
