import Player from "../../../Player/Player";
import { useCallback, useEffect, useState } from "react";
import MediaCover from "../MediaCover/MediaCover";
import { QuestionMode } from "../../types";
import { useControllContext } from "../../../../../context/controllers/controllerBase";

interface Props {
  src: string;
  mode: QuestionMode;
}

export default function Video(props: Props) {
  const [isVideoStarted, setVideoStarted] = useState(false);
  const [isError, setError] = useState(false);

  const { questionCount, setTimerState, timerState } = useControllContext();

  function handleVideoEnd() {
    if (setTimerState) {
      setTimerState("answer");
    }
  }

  const handleVideoStart = useCallback(() => {
    if (props.mode !== "preview") {
      setVideoStarted(true);
      if (setTimerState) {
        setTimerState("wait");
      }
    }
  }, [setVideoStarted, setTimerState, props.mode]);

  const handleError = useCallback(() => {
    setError(true);
    if (setTimerState) {
      setTimerState("wait");
    }
  }, [setError, setTimerState]);

  useEffect(() => {
    setVideoStarted(false);
  }, [questionCount]);

  useEffect(() => {
    if (timerState === "wait") {
      handleVideoStart();
    }
  }, [timerState, handleVideoStart]);

  return (
    <>
      <MediaCover
        isError={isError}
        handleStart={handleVideoStart}
        isStarted={isVideoStarted}
        mode={props.mode}
        mediaType="video"
        mediaElement={
          <Player
            src={props.src}
            {...(props.mode !== "preview" && {
              onError: handleError,
              onEnded: handleVideoEnd,
              playing: !!isVideoStarted,
              style: { display: !!isVideoStarted ? "block" : "none" },
            })}
          />
        }
      />
    </>
  );
}
