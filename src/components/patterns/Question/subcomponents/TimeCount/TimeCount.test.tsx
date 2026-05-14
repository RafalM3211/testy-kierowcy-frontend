import TimeCount from "./TimeCount";
import { useProvider } from "test-data-provider";
import { useExamControlContext } from "../../../../../context/controllers/controllerBase";
import type {
  TimerState,
  QuestionType,
} from "../../../../../types/globalTypes";
import { render, act, screen } from "@testing-library/react";

jest.mock("../../../../../context/examControls/examControls", () => {
  return {
    useExamControlContext: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

interface ProviderEntry {
  timerState: TimerState;
  questionType: QuestionType;
  expectedTime: string;
  expectedTimerLabel: string;
  description: string;
}

const prepareLabel = "Czas na zapoznanie się z pytaniem";
const waitLabel = "Trwa odtwarzanie";
const answerLabel = "Czas na odpowiedź";

const timerAppereanceProvider: ProviderEntry[] = [
  {
    timerState: "prepare",
    questionType: "basic",
    expectedTime: "20s",
    expectedTimerLabel: prepareLabel,
    description:
      "timer label matches and displayed time is '20s' when timer state is 'prepare' and type basic ",
  },
  {
    timerState: "wait",
    questionType: "basic",
    expectedTime: "-",
    expectedTimerLabel: waitLabel,
    description:
      "timer label matches and displayed time is ' - s' when timer state is 'wait' and type basic",
  },
  {
    timerState: "answer",
    questionType: "basic",
    expectedTime: "15s",
    expectedTimerLabel: answerLabel,
    description:
      "timer label matches and displayed time is '15s' when timer state is 'answer' and type basic ",
  },
  {
    timerState: "answer",
    questionType: "specialized",
    expectedTime: "50s",
    expectedTimerLabel: answerLabel,
    description:
      "timer label matches and displayed time is '50s' when timer state is 'answer' and type specialized ",
  },
];

const dummyContextValue = {
  timerState: "prepare",
  setTimerState: jest.fn(),
  nextQuestion: jest.fn(),
  questionCount: 1,
};

describe("on expire behavior", () => {
  it("calls setTimerState with 'wait' if previous timer state was 'prepare' after 20 seconds", () => {
    //arrange
    const context = useExamControlContext as jest.Mock;
    context.mockReturnValue(dummyContextValue);
    render(<TimeCount type="basic" />);

    //act
    act(() => {
      jest.advanceTimersByTime(19001);
    });

    //assert
    expect(dummyContextValue.setTimerState).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    expect(dummyContextValue.nextQuestion).not.toBeCalled();
    expect(dummyContextValue.setTimerState).toBeCalledWith("wait");
  });
  it("calls nextQuestion if previous timer state was 'answer' after 15 seconds", () => {
    //arrange
    const context = useExamControlContext as jest.Mock;
    context.mockReturnValue({
      ...dummyContextValue,
      timerState: "answer",
    });
    render(<TimeCount type="basic" />);

    //act
    act(() => {
      jest.advanceTimersByTime(14001);
    });

    //assert
    expect(dummyContextValue.nextQuestion).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    expect(dummyContextValue.setTimerState).not.toBeCalled();
    expect(dummyContextValue.nextQuestion).toBeCalledWith();
  });
  it("doesn't expire if timer state is 'wait'", () => {
    //arrange
    const context = useExamControlContext as jest.Mock;
    context.mockReturnValue({ ...dummyContextValue, timerState: "wait" });
    render(<TimeCount type="basic" />);

    //act
    act(() => {
      jest.advanceTimersByTime(99999);
    });

    //assert
    expect(dummyContextValue.nextQuestion).not.toBeCalled();
    expect(dummyContextValue.setTimerState).not.toBeCalled();
  });
  it("expires afrer 50 seconds when type is 'specialized'", () => {
    //arrange
    const context = useExamControlContext as jest.Mock;
    context.mockReturnValue({
      ...dummyContextValue,
      timerState: "answer",
    });
    render(<TimeCount type="specialized" />);

    //act
    act(() => {
      jest.advanceTimersByTime(40001);
    });

    //assert
    expect(dummyContextValue.nextQuestion).not.toBeCalled();
    expect(dummyContextValue.setTimerState).not.toBeCalledWith("wait");
    act(() => {
      jest.advanceTimersByTime(10001);
    });
    expect(dummyContextValue.nextQuestion).toBeCalled();
  });
});

describe("appearance", () => {
  useProvider(
    timerAppereanceProvider,
    ({
      timerState,
      questionType,
      expectedTime,
      expectedTimerLabel,
      description,
    }) => {
      it(description, () => {
        //arrange
        const context = useExamControlContext as jest.Mock;
        context.mockReturnValue({ ...dummyContextValue, timerState });
        render(<TimeCount type={questionType} />);

        //act
        const timerLabel = screen.getByRole("heading", {
          name: expectedTimerLabel,
        });
        const timeRegexp = new RegExp(`${expectedTime}`, "i");
        const displayedTime = screen.getByText(timeRegexp, {
          collapseWhitespace: true,
        });

        //assert
        expect(timerLabel).toBeInTheDocument();
        expect(displayedTime).toBeInTheDocument();
      });
    },
  );
});
