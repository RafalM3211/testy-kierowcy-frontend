import type { Answer } from "../../../types/globalTypes";

export type QuestionMode = "exam" | "preview" | "endless";

export type ExcludeUndefined<T> = {
  [key in keyof T]: Exclude<T[key], undefined>;
};
