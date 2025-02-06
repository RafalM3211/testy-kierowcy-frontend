import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";
import * as answersContext from "../../../context/Answers/Answers";
import PreviewQuestion from "./PreviewQuestion";
import {
  answeredBasic,
  answeredBasicWithVideo,
  answeredSpecialized,
} from "../../../tests/dummyQuestion/dummyQuestions";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";

const dummyId = answeredBasic.id + 342;
const anotherAnseweredBasic = { ...answeredBasic, id: dummyId };
const dummyAnswers = [
  answeredSpecialized,
  answeredBasic,
  answeredBasicWithVideo,
  anotherAnseweredBasic,
];
const answersSpyBase = {
  answeredQuestions: dummyAnswers,
  addAnswer: jest.fn(),
  clearAnswers: jest.fn(),
};
const answersSpy = jest.spyOn(answersContext, "useAnswersContext");

const user = userEvent.setup({ delay: null });

beforeEach(() => {
  answersSpy.mockReturnValue(answersSpyBase);
});

function renderQuestionWithId(id: number = answeredBasic.id) {
  const routeElements = (
    <Route path="/question/:id" element={<PreviewQuestion />} />
  );
  render(
    <DummyProviders routes={routeElements} initialEntries={["/question/" + id]}>
      <PreviewQuestion />
    </DummyProviders>
  );
}

describe("answer button click", () => {
  it("answer button does not click on basic question", async () => {
    //arrange
    renderQuestionWithId();
    const yesAnswerButton = await screen.findByRole("button", { name: "tak" });

    //act
    await user.click(yesAnswerButton);

    //assert
    expect(yesAnswerButton).not.toHaveAttribute("aria-pressed", true);
  });

  it("answer button does not click on specialized question", async () => {
    //arrange
    renderQuestionWithId(answeredSpecialized.id);
    const answerButton = await screen.findByText("A", { exact: true });

    //act
    await user.click(answerButton);

    //assert
    await waitFor(() => {
      expect(answerButton).not.toHaveAttribute("aria-pressed", true);
    });
  });
});

describe("next and previous quesiton buttons", () => {
  it("Next question button is disabled on last question", async () => {
    //arrange
    const lastAnswer = dummyAnswers[dummyAnswers.length - 1];
    renderQuestionWithId(lastAnswer.id);

    //act
    const previousButton = await screen.findByRole("button", {
      name: /poprzednie/i,
    });
    const nextButton = await screen.findByRole("button", { name: /następne/i });

    //assert
    expect(nextButton).toBeDisabled();
    expect(previousButton).not.toBeDisabled();
  });

  it("Previous button is disabled on last question", async () => {
    //arrange
    const firstAnswer = dummyAnswers[0];
    renderQuestionWithId(firstAnswer.id);

    //act
    const nextButton = await screen.findByRole("button", { name: /następne/i });
    const previousButton = await screen.findByRole("button", {
      name: /poprzednie/i,
    });

    //assert
    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});

describe("question media", () => {
  it("doesn't show media cover", () => {
    //arrange
    renderQuestionWithId();

    //act
    const mediaCover = screen.queryByText(/Kliknij aby wyświetlić/i);

    //assert
    expect(mediaCover).not.toBeInTheDocument();
  });
});
