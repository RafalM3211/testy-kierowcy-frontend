import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { strippedBackground } from "../../../Progress/subcomponents/ProgressBackground";
import { useTimer } from "react-timer-hook";
import { useExamControlContext } from "../../../../../context/controllers/controllerBase";
import type {
  QuestionType,
  TimerState,
} from "../../../../../types/globalTypes";
import type { ExcludeUndefined } from "../../types";
import { flexCenter } from "../../../../../utility/styling";

interface Props {
  type: QuestionType;
}

function getTotalTime(questionType: QuestionType, timerState: TimerState) {
  const prepareTime = 20;
  const basicAnswerTime = 15;
  const specializedAnswerTime = 50;

  if (questionType === "basic") {
    if (timerState === "prepare") return prepareTime;
    else return basicAnswerTime;
  } else {
    return specializedAnswerTime;
  }
}

function calcTimeProgresPercent(currentTime: number, maxTime: number) {
  return Math.floor(100 - (currentTime / maxTime) * 100) + "%";
}

function getExpiryTimeStamp(timeForAnswer: number) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + timeForAnswer);
  return time;
}

function getTimerLabel(timerState: TimerState) {
  switch (timerState) {
    case "prepare":
      return "Czas na zapoznanie się z pytaniem";
    case "wait":
      return "Trwa odtwarzanie";
    case "answer":
      return "Czas na odpowiedź";
  }
}

export default function TimeCount(props: Props) {
  const controls = useExamControlContext();
  const { timerState, setTimerState, nextQuestion, questionCount } =
    controls as ExcludeUndefined<typeof controls>;
  const totalTime = getTotalTime(props.type, timerState);

  const { seconds, restart, pause } = useTimer({
    expiryTimestamp: getExpiryTimeStamp(totalTime),
    onExpire() {
      if (timerState === "prepare") {
        setTimerState("wait");
      }
      if (timerState === "answer") {
        nextQuestion();
      }
    },
  });

  useEffect(() => {
    const totalTime = getTotalTime(props.type, timerState);
    restart(getExpiryTimeStamp(totalTime));

    if (timerState === "wait") {
      pause();
    }
  }, [questionCount, props.type, timerState, restart, pause]);

  return (
    <Box
      sx={{
        ...flexCenter,
        flexDirection: "column",
        textAlign: "center",
        width: { xs: "120px", md: "100%" },
        fontSize: { xs: "0.8em", md: "0.9em" },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "grey.800", fontSize: "0.9em" }}
      >
        {getTimerLabel(timerState)}
      </Typography>
      <Box
        sx={{
          width: "clamp(100px, 45%, 200px)",
          textAlign: "center",
          backgroundColor: "grey.300",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Typography
          sx={{ position: "relative", zIndex: 5, fontSize: "1.1em" }}
          variant="h6"
          component="p"
        >
          {timerState === "wait" ? "- " : seconds}s
        </Typography>
        <Box
          sx={{
            backgroundColor: "primary.light",
            backgroundImage: strippedBackground,
            position: "absolute",
            width: calcTimeProgresPercent(seconds, totalTime),
            transition: "width 1s linear",
            height: "100%",
            top: "0",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
