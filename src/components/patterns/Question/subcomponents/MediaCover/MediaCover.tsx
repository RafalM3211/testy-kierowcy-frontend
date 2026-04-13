import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ImageIcon from "@mui/icons-material/Image";
import { flexCenter } from "../../../../../utility/styling";
import ErrorBlock from "../../../ErrorBlock/ErrorBlock";
import { QuestionMode } from "../../types";
import type { ReactElement } from "react";

interface Props {
  isStarted: boolean;
  handleStart: () => void;
  mediaElement: ReactElement;
  mediaType: "image" | "video";
  isError: boolean;
  mode: QuestionMode;
}

export default function MediaCover(props: Props) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  const mediaCoverText = `${isSm ? "Dotknij" : "Kliknij"} aby wyświetlić ${
    props.mediaType === "image" ? "obraz" : "film"
  } i rozpocząć pytanie`;

  return (
    <>
      <Box
        onClick={props.handleStart}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "grey.300",
          cursor: "pointer",
          userSelect: "none",
          ...flexCenter,
        }}
      >
        {props.isError ? (
          <ErrorBlock />
        ) : (
          <>
            {props.mediaElement}
            {props.isStarted || props.mode === "preview" || (
              <Box sx={{ ...flexCenter, flexDirection: "column", fontSize: { xs: 60, sm: 80 }, }}>
                <Typography sx={{fontSize: "0.25em"}} variant={isXs ? "body2" : "h6"} component="p">
                  {mediaCoverText}
                </Typography>
                {props.mediaType === "image" ? (
                  <ImageIcon
                    sx={{ fontSize: "1em", mt: "10px" }}
                  />
                ) : (
                  <PlayCircleOutlineIcon
                    sx={{ fontSize: "1em",  mt: "10px" }}
                  />
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
