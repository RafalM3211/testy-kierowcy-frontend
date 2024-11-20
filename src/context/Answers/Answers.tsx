import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type {
  Question,
  Answer,
  AnsweredQuestion,
  BasicAnswer,
  SpecializedAnswer,
} from "../../types/globalTypes";

interface Props {
  children: ReactNode;
}

interface AnswersContextType {
  answeredQuestions: AnsweredQuestion[];
  addAnswer: (question: Question, chosenAnswer: Answer) => void;
  clearAnswers: () => void;
}

const AnswersContext = createContext<AnswersContextType | null>(null);

export function useAnswersContext() {
  const contextValue = useContext(AnswersContext);
  if (contextValue === null) {
    throw new Error("do not use questions context outside provider");
  }

  return contextValue;
}

export function AnswersProvider(props: Props) {
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([]);

  function addAnswer(
    question: Question,
    chosenAnswer: BasicAnswer | SpecializedAnswer
  ) {
    const newAnsweredQuestion = {
      ...question,
      chosenAnswer: chosenAnswer,
    } as AnsweredQuestion;

    setAnsweredQuestions([...answeredQuestions, newAnsweredQuestion]);
  }

  function clearAnswers() {
    if (answeredQuestions.length > 0) {
      setAnsweredQuestions([]);
    }
  }

  return (
    <AnswersContext.Provider
      value={{ answeredQuestions, addAnswer, clearAnswers }}
    >
      {props.children}
    </AnswersContext.Provider>
  );
}
