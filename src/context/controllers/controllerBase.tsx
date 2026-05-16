import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnswersContext } from "../Answers/Answers";
import { sendAnswer } from "../../core/services/question";
import { useUserContext } from "../user/user";
import type {
  SetAnswerFunction,
  EndPayload,
  NextBtnClickPayload,
  DataControls,
} from "./types";
import type {
  Answer,
  ExamQuestions,
  Question,
  TimerState,
  User,
} from "../../types/globalTypes";

interface Controls {
  nextQuestion: () => void;
  end: () => void;
  handleNextQuestionBtnClick: () => void;
  questionCount: number;
  selectedAnswer: Answer;
  setSelectedAnswer: SetAnswerFunction;
  isStarted: boolean;
  setStarted: (value: boolean) => void;
  timerState: TimerState;
  setTimerState: (value: TimerState) => void;
}

interface Props {
  dataControls: DataControls;
  data: ExamQuestions | Question;
  children: ReactNode;

  getNextQuestion: (
    data: ExamQuestions | Question,
    currentIndex?: number,
  ) => Question;
  onEnd: (payload: EndPayload) => void;
  onNextBtnClick: (payload: NextBtnClickPayload) => void;
}

const ControllContext = createContext<Controls | null>(null);

export function useControllContext() {
  const contextValue = useContext(ControllContext);
  if (!contextValue) {
    const emptyControls = {
      nextQuestion: undefined,
      questionCount: undefined,
      handleNextQuestionBtnClick: undefined,
      selectedAnswer: undefined,
      setSelectedAnswer: undefined,
      isStarted: undefined,
      setStarted: undefined,
      timerState: undefined,
      setTimerState: undefined,
    };
    return emptyControls as Record<keyof Controls, undefined>;
  }

  return contextValue;
}

export function checkAndSaveAnswer(
  userId: User["id"],
  currentQuestion: Question,
  selectedAnswer: Answer,
) {
  const isAnswerCorrect = currentQuestion.correctAnswer === selectedAnswer;
  const questionId = currentQuestion.id;
  sendAnswer(userId, questionId, isAnswerCorrect);
}

export default function ControllerBaseProvider(props: Props) {
  const { addAnswer, answeredQuestions } = useAnswersContext();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const questionCount = answeredQuestions.length + 1;
  const currentQuestion = props.dataControls.currentQuestion;

  const [selectedAnswer, setSelectedAnswer] = useState<Answer>(null);
  const [isStarted, setStarted] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("prepare");

  function nextQuestion() {
    setSelectedAnswer(null);
    addAnswer(currentQuestion, selectedAnswer);
    if (user) {
      checkAndSaveAnswer(user.id, currentQuestion, selectedAnswer);
    }

    const nextQuestion = props.getNextQuestion(props.data, questionCount - 1);

    if (nextQuestion.type === "basic") {
      setStarted(false);
      setTimerState("prepare");
    } else {
      setStarted(true);
      setTimerState("answer");
    }

    props.dataControls.setCurrentQuestion(nextQuestion);
  }

  function end() {
    props.onEnd({
      currentQuestion,
      selectedAnswer,
      user,
      addAnswer,
      navigate,
    });
  }

  function handleNextQuestionBtnClick() {
    props.onNextBtnClick({
      questionCount,
      end,
      nextQuestion,
    });
  }

  const controls = {
    nextQuestion,
    end,
    handleNextQuestionBtnClick,
    questionCount,
    selectedAnswer,
    setSelectedAnswer,
    isStarted,
    setStarted,
    timerState,
    setTimerState,
  } satisfies Controls;

  console.log(questionCount);

  return (
    <ControllContext.Provider value={controls}>
      {props.children}
    </ControllContext.Provider>
  );
}
