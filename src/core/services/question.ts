import { ExamQuestions } from "../../types/globalTypes";
import { isQuestion } from "../../types/typeGuards/typeGuards";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export async function getQuestion() {
  const res = await fetch(apiUrl + "question", {
    credentials: "include",
  });
  if (res.status >= 400) throw new Error("unknown error");
  const data = (await res.json()) as unknown;
  if (!isQuestion(data)) {
    throw new Error(
      "returned data does not satisfy a question type: \n" +
        JSON.stringify(data)
    );
  }

  return data;
}

export async function getExam() {
  const res = await fetch(apiUrl + "exam", {
    credentials: "include",
  });
  if (res.status >= 400) throw new Error("unknown error");
  const data = (await res.json()) as unknown;
  console.log(data);

  return data as ExamQuestions;
}

export async function resetSession() {
  await fetch(apiUrl + "exam/resetExamSession", {
    credentials: "include",
  });
  return {};
}
