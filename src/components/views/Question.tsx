import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionsContext } from "../../context/questions/questions";
import { getQuestion } from "../../core/services/question";
import Loader from "../patterns/Loader/Loader";
import QuestionMedia from "../patterns/QuestionMedia/QuestionMedia";
import QuestionContent from "../patterns/QuestionContent/QuestionContent";
import QuestionControls from "../patterns/QuestionControls/QuestionControls";
import QuestionDetails from "../patterns/QuestionDetails/QuestionDetails";
import type { Ansewer } from "../../types/globalTypes";

export default function Question() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const { addAnsewer } = useQuestionsContext();

  const [chosenAnsewer, setChosenAnsewer] = useState<Ansewer | null>(null);
  const [questionCount, setQuestionCount] = useState(1);

  const nextQuestion = useCallback(() => {
    if (!data) {
      throw new Error("question is undefined");
    }
    addAnsewer(data, chosenAnsewer);
    refetch();
    if (questionCount === 32) {
      navigate("/summary");
    }
    setQuestionCount(questionCount + 1);
    setChosenAnsewer(null);
  }, [
    refetch,
    questionCount,
    setQuestionCount,
    data,
    chosenAnsewer,
    setChosenAnsewer,
  ]);

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "921px 1fr",
        gridTemplateRows: "min-content 540px auto",
        minHeight: "100vh",
        pt: "60px",
        maxWidth: { lg: "1400px" },
      }}
    >
      {isLoading ? (
        <Loader label="Ładowanie pytania..." />
      ) : isError ? (
        "error"
      ) : (
        <>
          <QuestionDetails id={data.id} value={data.value} />
          <QuestionMedia />
          <QuestionContent
            content={data.content}
            type={data.type}
            ansewers={data.type === "specialized" ? data.ansewers : null}
            chosenAnsewer={chosenAnsewer}
            setChosenAnsewer={setChosenAnsewer}
          />
          <QuestionControls
            questionCount={questionCount}
            nextQuestion={nextQuestion}
          />
        </>
      )}
    </Container>
  );
}
