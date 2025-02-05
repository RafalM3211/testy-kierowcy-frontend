import { Box } from "@mui/material";
import Image from "../Image/Image";
import Video from "../Video/Video";
import NoMedia from "../NoMedia/NoMedia";
import { isJpgImage } from "../../../../../utility/utils";
import type { QuestionMode } from "../../types";
import type { Question, QuestionType } from "../../../../../types/globalTypes";

interface Props {
  media: Question["media"];
  type: QuestionType;
  mode: QuestionMode;
}

const mediaEndpointUrl = process.env.REACT_APP_SERVER_URL + "media/";
const maxMediaWidth = 850;
const aspectRatio = 0.5615;
const maxMediaHeight = maxMediaWidth * aspectRatio;

export default function QuestionMedia(props: Props) {
  const isMediaPresent = props.media !== null;
  const isMediaImage = isJpgImage(props.media);

  const mediaUrl = mediaEndpointUrl + props.media;

  return (
    <Box
      sx={{
        width: {
          xs: "90vw",
          sm: "70vw",
          md: "68vw",
          lg: `clamp(850px, 70vw, ${maxMediaWidth}px)`,
        },
        height: {
          xs: aspectRatio * 90 + "vw",
          sm: aspectRatio * 70 + "vw",
          md: aspectRatio * 68 + "vw",
          lg: maxMediaHeight + "px",
        },
        gridRow: "2",
        gridColumn: "1",
        bgcolor: "grey.300",
        mx: "auto",
      }}
    >
      {isMediaPresent ? (
        <>
          {isMediaImage ? (
            <Image type={props.type} mode={props.mode} src={mediaUrl} />
          ) : (
            <Video mode={props.mode} src={mediaUrl} />
          )}
        </>
      ) : (
        <NoMedia />
      )}
    </Box>
  );
}
