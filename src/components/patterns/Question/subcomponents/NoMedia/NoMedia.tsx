import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { flexCenter } from "../../../../../utility/styling";
import bgImage from "../../../../../images/backgrounds/noPhoto.png";
import { useControllContext } from "../../../../../context/controllers/controllerBase";
export default function NoMedia() {
  const { setTimerState, timerState } = useControllContext();

  useEffect(() => {
    if (timerState === "wait") {
      setTimerState("answer");
    }
  });

  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        ...flexCenter,
      }}
    >
      <Typography variant="h5">Pytanie bez zdjęcia</Typography>
    </Box>
  );
}
