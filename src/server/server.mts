import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import { getExamQuestions } from "./exam/exam.mjs";
import { sendImage, streamVideo, allowedMediaExtensions } from "./media.mjs";
import type { Question } from "../types/globalTypes";

declare module "express-session" {
  interface SessionData {
    questions: Question[];
  }
}

console.log("START");

dotEnv.config();

const server = express();
const memoryStore = new session.MemoryStore();

server.use(express.json());
server.use(cookieParser("randomvaluegeneratedinfuture"));
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(
  session({
    secret: "randomvaluegeneratedinfuture",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: memoryStore,
    resave: false,
  })
);

server.get("/question", async (req, res) => {
  const session = req.session;
  if (!session.questions) {
    session.questions = [];
  }

  const questions = await getExamQuestions();

  session.save();
  res.status(200).jsonp(questions);
});

server.get("/media/:fileName", (req, res) => {
  const { fileName } = req.params;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  if (allowedMediaExtensions.includes(fileExtension)) {
    if (fileExtension === "jpg") {
      sendImage(req, res);
    } else {
      streamVideo(req, res);
    }
  } else {
    const errorMessage =
      "wrong media extension. Supported extensions are: " +
      allowedMediaExtensions.join(", ");
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

server.get("/resetExamSession", (req, res) => {
  const session = req.session;
  session.questions = [];
  session.save();
  res.sendStatus(200);
});

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
