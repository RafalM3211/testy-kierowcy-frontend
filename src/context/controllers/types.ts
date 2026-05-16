import type { Answer, Question, User } from "../../types/globalTypes";
import type { NavigateFunction } from "react-router-dom";

export type SetAnswerFunction = (answer: Exclude<Answer, null>) => void;

export interface EndPayload {
  currentQuestion: Question;
  selectedAnswer: Answer;
  user: User | null;
  addAnswer: (question: Question, answer: Answer) => void;
  navigate: NavigateFunction;
}

export interface NextBtnClickPayload {
  questionCount?: number;
  userId?: User["id"];
  currentQuestion?: Question;
  selectedAnswer?: Answer;

  end?: () => void;
  nextQuestion: () => void;
}

export interface DataControls {
  currentQuestion: Question;
  setCurrentQuestion: Function;
}
