import { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/system";
import MediaCover from "../MediaCover/MediaCover";
import { useControllContext } from "../../../../../context/controllers/controllerBase";
import { QuestionType } from "../../../../../types/globalTypes";
import { QuestionMode } from "../../types";

interface Props {
  src: string;
  type: QuestionType;
  mode: QuestionMode;
  alt?: string;
}

export default function Image(props: Props) {
  const [isError, setError] = useState(false);

  const { setTimerState, timerState } = useControllContext();
  const isQuestionStarted = timerState === "answer";

  function handleError() {
    setError(true);
    if (setTimerState) {
      setTimerState("wait");
    }
  }

  const handleStart = useCallback(() => {
    if (setTimerState) {
      setTimerState("answer");
    }
  }, [setTimerState]);

  useEffect(() => {
    if (props.type === "specialized" || timerState === "wait") {
      handleStart();
    }
  }, [props.type, handleStart, timerState]);

  return (
    <MediaCover
      isError={isError}
      handleStart={handleStart}
      isStarted={isQuestionStarted}
      mode={props.mode}
      mediaType="image"
      mediaElement={
        <Box
          component="img"
          onError={handleError}
          src={props.src}
          alt={"Obraz dla pytania egzaminacyjnego"}
          sx={{
            width: "100%",
            height: "100%",

            display:
              isQuestionStarted || props.mode === "preview" ? "block" : "none",
          }}
        ></Box>
      }
    />
  );
}
