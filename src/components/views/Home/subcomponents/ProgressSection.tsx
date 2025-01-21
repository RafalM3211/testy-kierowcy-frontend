import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ErrorBlock from "../../../patterns/ErrorBlock/ErrorBlock";
import Progress from "../../../patterns/Progress/Progress";
import SectionSubtitle from "../../../atoms/SectionSubtitle/SectionSubtitle";
import SectionHeader from "../../../atoms/SectionHeader/SectionHeader";
import HighlitedText from "../../../atoms/HighlitedText/HighlitedText";
import { useUserContext } from "../../../../context/user/user";
import { useQuery } from "@tanstack/react-query";
import { getAnswersStatistics } from "../../../../core/services/question";
import Loader from "../../../patterns/Loader/Loader";

export default function ProgressSection() {
  const { user } = useUserContext();
  const isLoggedIn = !!user;

  const {
    data: asnwersStatistics,
    fetchStatus,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["asnwersStatistics", user?.id as number],
    queryFn: getAnswersStatistics,
    refetchOnWindowFocus: false,
    enabled: !!user?.id,
  });

  const { correct, wrong, unanswered } = asnwersStatistics || {
    correct: 0,
    wrong: 0,
    unanswered: 100,
  };
  const allQuestions = correct + wrong + unanswered;
  const correctPercent = (correct / allQuestions) * 100;
  const wrongPercent = (wrong / allQuestions) * 100;

  return (
    <>
      <SectionHeader>Twój progres</SectionHeader>
      <SectionSubtitle>
        Rozwiązuj testy a pasek progresu będzie uzupełniał się sam. Dzięki temu
        będziesz wiedzieć kiedy jesteś gotowy\a do egzaminu
      </SectionSubtitle>

      {status === "error" ? (
        <ErrorBlock sx={{ fontSize: "1.5em", mt: "1em" }} />
      ) : (
        <Progress
          correctPercent={correctPercent}
          wrongPercent={wrongPercent}
          sx={{
            mt: "50px",
            filter:
              isLoggedIn && !isLoading ? "none" : "blur(1px) opacity(0.3)",
          }}
        />
      )}

      {fetchStatus === "fetching" && (
        <Loader
          size={60}
          sx={{
            position: "relative",
            zIndex: "1",
            top: "-5em",
            mt: "10px",
            color: "grey.600",
            fontSize: "0.8em",
            width: "fit-content",
            height: "fit-content",
            background: "none",
          }}
        />
      )}

      {isLoggedIn || (
        <Typography
          sx={{
            position: "relative",
            top: "-1.5em",
            fontSize: "1.4em",
            fontStyle: "italic",
            color: "grey.700",
            textAlign: "center",
          }}
        >
          <Link to="/login" style={{ textDecoration: "none", color: "unset" }}>
            <HighlitedText>Zaloguj się</HighlitedText> aby kontrolować swój
            progres
          </Link>
        </Typography>
      )}
    </>
  );
}
