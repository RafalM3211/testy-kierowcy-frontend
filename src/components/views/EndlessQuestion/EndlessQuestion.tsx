import { useMutation } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { getEndlessQuestion } from "../../../core/services/question";
import Loader from "../../patterns/Loader/Loader";
import Question from "../../patterns/Question/Question";
import EndlessControllerProvider from "../../../context/controllers/endlessController";
import { useOnMount } from "../../../utility/hooks";
import ErrorScreen from "../../patterns/ErrorScreen/ErrorScreen";
import { useState } from "react";
import { Question as QuestionType } from "../../../types/globalTypes";
import { backgroundImg } from "../../../utility/styling";
import bgImage from "../../../images/backgrounds/wave.svg";

export default function EndlessQuestion() {
  const { mutate, isLoading, isError, data } = useMutation({
    mutationKey: ["endlessQuestion"],
    mutationFn: getEndlessQuestion,
    retry: 0, //for developement only
    onSuccess: (data) => {
      setCurrentQuestion(data);
    },
  });

  const [currentQuestion, setCurrentQuestion] = useState<
    QuestionType | undefined
  >(data);

  const dataControls = {
    currentQuestion,
    setCurrentQuestion,
  };

  useOnMount(() => {
    mutate([]);
  });

  return (
    <Box sx={{ ...backgroundImg(bgImage) }}>
      {isLoading || !data ? (
        <Loader />
      ) : isError ? (
        <ErrorScreen />
      ) : currentQuestion ? (
        <EndlessControllerProvider
          dataControls={
            dataControls as typeof dataControls & {
              currentQuestion: QuestionType;
            }
          }
          question={data}
          getNextQuestion={(answeredIds: number[]) => {
            mutate(answeredIds);
            return data;
          }}
        >
          <Question question={currentQuestion as QuestionType} mode="endless" />
        </EndlessControllerProvider>
      ) : (
        <></>
      )}
    </Box>
  );
}
