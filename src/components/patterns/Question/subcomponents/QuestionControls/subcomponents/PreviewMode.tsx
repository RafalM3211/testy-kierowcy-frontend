import { useParams } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import QuestionCount from "./QuestionCount";
import { useAnswersContext } from "../../../../../../context/Answers/Answers";
import ButtonLink from "../../../../../atoms/ButtonLink/ButtonLink";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function PreviewMode() {
  const { answeredQuestions } = useAnswersContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const questionId = useParams().id as string;
  const questionIndex = answeredQuestions.findIndex(
    (quesiton) => quesiton.id === parseInt(questionId)
  );
  const questionCount = questionIndex + 1;
  const questionsAmount = answeredQuestions.length;

  const previousQuestionId =
    questionCount === 1 ? null : answeredQuestions[questionIndex - 1].id;
  const nextQuestionId =
    questionCount === questionsAmount
      ? null
      : answeredQuestions[questionIndex + 1].id;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: "0px", md: "20px" },
          ml: { xs: "10%", md: "0" },
          order: 1,
        }}
      >
        <QuestionCount questionCount={questionCount} total={questionsAmount} />
      </Box>

      <ButtonLink
        to="/summary"
        size="small"
        variant="outlined"
        sx={{
          mt: { xs: "20px", md: "50px" },
          mb: "20px",
          minWidth: "fit-content",
        }}
        linkStyle={{ order: isMobile ? 3 : 2 }}
      >
        {isMobile ? (
          <ExitToAppIcon />
        ) : (
          <Typography
            sx={{ fontSize: { xs: "0.8em", lg: "0.9em" } }}
            variant="h6"
          >
            Powrót do podsumowania
          </Typography>
        )}
      </ButtonLink>
      <Box
        sx={{
          textAlign: "center",
          textWrap: "nowrap",
          fontSize: { xs: "0.6em", lg: "0.9em" },
          order: { xs: 2, md: 3 },
        }}
      >
        <ButtonLink
          disabled={!previousQuestionId}
          to={"/question/" + previousQuestionId}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: { xs: "3em", sm: "2em" } }} />
          {isXs ? "" : "Poprzednie"}
        </ButtonLink>
        <ButtonLink
          disabled={!nextQuestionId}
          to={"/question/" + nextQuestionId}
        >
          {isXs ? "" : "Następne"}
          <KeyboardArrowRightIcon
            sx={{
              fontSize: { xs: "3em", sm: "2em" },
              p: 0,
            }}
          />
        </ButtonLink>
      </Box>
    </>
  );
}
