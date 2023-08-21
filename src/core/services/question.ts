import { isQuestion } from "../../types/typeGuards";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export async function getQuestion() {
  console.log("query");

  const res = await fetch(apiUrl + "question", {
    credentials: "include",
  });
  if (res.status >= 400) throw new Error("unknown error");
  const data = (await res.json()) as unknown;
  if (!isQuestion(data)) {
    throw new Error("returned data does not satisfy a question type");
  }
  console.log(data);
  return data;
}

export async function resetSession() {
  console.log("reset");
  await fetch(apiUrl + "resetEgzamSession", {
    credentials: "include",
  });
  return {};
}
