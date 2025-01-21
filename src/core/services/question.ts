import { QueryFunctionContext } from "@tanstack/react-query";
import {
  AnswersStatistics,
  ExamQuestions,
  Question,
  User,
} from "../../types/globalTypes";
import { primaryApi } from "../clients/apis";

export async function getExam() {
  const res = await primaryApi.get("question/get-exam", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as ExamQuestions;
}

export async function sendAnswer(
  userId: User["id"],
  questionId: Question["id"],
  isCorrect: boolean
) {
  await primaryApi.post("question/send-answer", {
    userId,
    questionId,
    isCorrect,
  });
}

export async function getAnswersStatistics(
  queryContext: QueryFunctionContext<[string, number]>
) {
  const userId = queryContext.queryKey[1];
  const res = await primaryApi.get("question/answers-statistics/" + userId, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as AnswersStatistics;
}
