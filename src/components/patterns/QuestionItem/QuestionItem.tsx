import { Box, Card, Typography, useTheme, useMediaQuery } from "@mui/material";
import YesNoAnseswer from "../YesNoAnswer/YesNoAnswer";
import ABCAnswer from "../ABCAnswer/ABCAnswer";
import { flexCenter } from "../../../utility/styling";
import { trimText, isJpgImage } from "../../../utility/utils";
import type {
  ABCanswers,
  AnsweredQuestion,
  Question,
} from "../../../types/globalTypes";
import { Link } from "react-router-dom";
import Image from "./subcomponents/Image/Image";
import Video from "./subcomponents/Video/Video";
import NoMedia from "./subcomponents/NoMedia/NoMedia";

interface Props {
  data: Question | AnsweredQuestion;
  number?: number;
}

const mediaEndpointUrl = process.env.REACT_APP_SERVER_URL + "media/";
const mediaWidth = 200;
const aspectRatio = 0.5625;
const mediaHeight = mediaWidth * aspectRatio;

function trimAnswers(answers: ABCanswers, trimValue: number = 65): ABCanswers {
  return {
    A: trimText(answers.A, trimValue),
    B: trimText(answers.B, trimValue),
    C: trimText(answers.C, trimValue),
  };
}

export default function QuestionItem(props: Props) {
  const { data: question } = props;

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isOnlyMd = useMediaQuery(theme.breakpoints.only("md"));

  function getTrimValue() {
    if (isOnlyMd) return 50;
    else return isLg ? 100 : 145;
  }

  const contentTrimValue = getTrimValue();

  const isMediaPresent = question.media !== "";
  const isMediaImage = isJpgImage(question.media);

  const mediaUrl = mediaEndpointUrl + question.media;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", md: "45%" },
        height: question.type === "basic" ? "170px" : "290px",
        my: "30px",
        mx: { xs: 0, md: "2.5%" },

        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <Link
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          color: "unset",
          textDecoration: "none",
        }}
        to={`/question/${question.id}`}
      >
        <Box
          sx={{
            height: "100%",
            width: "1.5rem",
            bgcolor: "primary.main",
            ...flexCenter,
          }}
        >
          <Typography
            variant="h5"
            component="p"
            color="white"
            sx={{
              wordBreak: "break-all",
              textAlign: "center",
              lineHeight: "1em",
              fontSize: "1.5em",
            }}
          >
            {props.number}
          </Typography>
        </Box>
        <Box
          sx={{
            width: mediaWidth + "px",
            height: mediaHeight + "px",
            maxWidth: "30%",
            ml: "10px",
            mr: "5px",
            bgcolor: "grey.300",
            ...flexCenter,
            display: {
              xs: "none",
              sm: "flex",
              md: question.type === "specialized" ? "none" : "flex",
              lg: "flex",
            },
          }}
        >
          {isMediaPresent ? (
            <>{isMediaImage ? <Image mediaUrl={mediaUrl} /> : <Video />}</>
          ) : (
            <NoMedia />
          )}
        </Box>

        <Box
          sx={{
            boxSizing: "border-box",
            p: "15px",
            height: "100%",
            width: {
              xs: "100%",
              sm: "70%",
              md: question.type === "specialized" ? "100%" : "40%",
              lg: "70%",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            "& *:hover": {
              transition: "all 10s ease 2s", //almost disable hover animation
            },
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "1em" }}>
            {trimText(question.content, contentTrimValue)}
          </Typography>
          {question.type === "basic" ? (
            <YesNoAnseswer
              chosenAnswer={
                "chosenAnswer" in question
                  ? (question.chosenAnswer as boolean)
                  : null
              }
              correctAnswer={question.correctAnswer}
              mode="preview"
              sx={{ fontSize: { xs: "1em", lg: "1.2em" } }}
            />
          ) : (
            <ABCAnswer
              answers={trimAnswers(question.answers)}
              chosenAnswer={
                "chosenAnswer" in question
                  ? (question.chosenAnswer as keyof ABCanswers)
                  : null
              }
              correctAnswer={question.correctAnswer}
              mode="preview"
              sx={{ fontSize: "0.9em" }}
            />
          )}
        </Box>
      </Link>
    </Card>
  );
}
