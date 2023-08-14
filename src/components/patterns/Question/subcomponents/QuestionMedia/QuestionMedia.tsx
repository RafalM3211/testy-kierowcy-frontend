import { Box } from "@mui/material";
import Image from "../Image/Image";
import EgzamVideo from "../ExamVideo/EgzamVideo";
import PreviewVideo from "../PreviewVideo/PreviewVideo";
import { QuestionMode } from "../../types";
import { Question } from "../../../../../types/globalTypes";

interface Props {
  mediaFileName: string;
  type: Question["type"];
  mode: QuestionMode;
}

const mediaEndpointUrl = process.env.REACT_APP_SERVER_URL + "media/";
const mediaWidth = 921;
const aspectRatio = 0.5625;
const mediaHeight = mediaWidth * aspectRatio;

function isImage(name: string) {
  const extension = name.slice(name.lastIndexOf(".") + 1);
  return extension === "jpg";
}

export default function QuestionMedia(props: Props) {
  const isMediaImage = isImage(props.mediaFileName);

  const fileUrl = mediaEndpointUrl + props.mediaFileName;

  return (
    <Box
      sx={{
        width: mediaWidth + "px",
        height: mediaHeight + "px",
        bgcolor: "grey.300",
        gridRow: "2",
        gridColumn: "1",
      }}
    >
      {isMediaImage ? (
        <Image type={props.type} src={fileUrl} />
      ) : (
        <>
          {props.mode === "exam" ? (
            <EgzamVideo mode="exam" src={fileUrl} />
          ) : (
            <PreviewVideo mode="preview" src={fileUrl} />
          )}
        </>
      )}
    </Box>
  );
}
