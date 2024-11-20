import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAnswersContext } from "../Answers/Answers";
import { useOnMount } from "../../utility/hooks";
import { sendAnswer } from "../../core/services/question";
import { useUserContext } from "../user/user";
import type { SetAnswerFunction } from "./types";
import type {
  Answer,
  ExamQuestions,
  Question,
  TimerState,
  User,
} from "../../types/globalTypes";

interface Controls {
  nextQuestion: () => void;
  endExam: () => void;
  handleNextQuestionBtnClick: () => void;
  questionCount: number;
  selectedAnswer: Answer;
  setSelectedAnswer: SetAnswerFunction;
  isStarted: boolean;
  setStarted: (value: boolean) => void;
  timerState: TimerState;
  setTimerState: (value: TimerState) => void;
}

interface DataControls {
  currentQuestion: Question;
  setCurrentQuestion: Function;
}

interface Props {
  dataControls: DataControls;
  examQuestions: ExamQuestions;
  children: ReactNode;
}

const ExamControlContext = createContext<Controls | null>(null);

export function useExamControlContext() {
  const contextValue = useContext(ExamControlContext);
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

function getNextQuestion(examQuestions: ExamQuestions, currentIndex: number) {
  const flattenQuestions = [
    ...examQuestions.basic,
    ...examQuestions.specialized,
  ];
  return flattenQuestions[currentIndex + 1];
}

function checkAndSaveAnswer(
  userId: User["id"],
  currentQuestion: Question,
  selectedAnswer: Answer
) {
  const isAnswerCorrect = currentQuestion.correctAnswer === selectedAnswer;
  const questionId = currentQuestion.id;
  sendAnswer(userId, questionId, isAnswerCorrect);
}

export default function ExamControlProvider(props: Props) {
  const { addAnswer, clearAnswers, answeredQuestions } = useAnswersContext();
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

    const nextQuestion = getNextQuestion(
      props.examQuestions,
      questionCount - 1
    );

    if (nextQuestion.type === "basic") {
      setStarted(false);
      setTimerState("prepare");
    } else {
      setStarted(true);
      setTimerState("answer");
    }

    props.dataControls.setCurrentQuestion(nextQuestion);
  }

  function endExam() {
    addAnswer(currentQuestion, selectedAnswer);
    if (user) {
      checkAndSaveAnswer(user.id, currentQuestion, selectedAnswer);
    }
    navigate("/summary");
  }

  function handleNextQuestionBtnClick() {
    if (questionCount === 32) {
      endExam();
    } else {
      nextQuestion();
    }
  }

  useOnMount(() => {
    clearAnswers();
  });

  const controls = {
    nextQuestion,
    endExam,
    handleNextQuestionBtnClick,
    questionCount,
    selectedAnswer,
    setSelectedAnswer,
    isStarted,
    setStarted,
    timerState,
    setTimerState,
  } satisfies Controls;

  return (
    <ExamControlContext.Provider value={controls}>
      {props.children}
    </ExamControlContext.Provider>
  );
}
