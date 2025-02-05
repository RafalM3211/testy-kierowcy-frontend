import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import QuestionCount from "./QuestionCount";
import TimeCount from "../../../subcomponents/TimeCount/TimeCount";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useExamControlContext } from "../../../../../../context/examControls/examControls";
import type { ExcludeUndefined } from "../../../types";
import type { QuestionType } from "../../../../../../types/globalTypes";

interface Props {
  type: QuestionType;
}

export default function ExamMode(props: Props) {
  const controls = useExamControlContext();
  const { endExam, handleNextQuestionBtnClick, questionCount } =
    controls as ExcludeUndefined<typeof controls>;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Button
        onClick={endExam}
        variant="outlined"
        sx={{
          textTransform: "unset",
          mb: { xs: "0", md: "15%" },
          minWidth: "fit-content",
          px: { xs: "5px", md: "15px" },
        }}
        endIcon={isMobile ? null : <ExitToAppIcon />}
      >
        {isMobile ? (
          <ExitToAppIcon />
        ) : (
          <Typography sx={{ fontSize: "0.9em" }}>Zakończ egzamin</Typography>
        )}
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "unset", md: "95%" },
          mb: { xs: "0px", md: "20px" },
        }}
      >
        <QuestionCount questionCount={questionCount} />
      </Box>
      <TimeCount type={props.type} />

      {isMobile ? (
        <></>
      ) : (
        <Button
          onClick={handleNextQuestionBtnClick}
          variant="contained"
          sx={{
            textTransform: "unset",
            px: "35px",
            py: "10px",
            mt: "20px",
            mb: "15%",
          }}
        >
          <Typography fontSize={"0.9em"} variant="button">
            Następne pytanie
          </Typography>
        </Button>
      )}
    </>
  );
}
