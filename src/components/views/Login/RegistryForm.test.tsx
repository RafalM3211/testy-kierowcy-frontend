import { render, screen } from "@testing-library/react";
import { userEventEmptyInput } from "../../../tests/utils";
import { userEvent } from "@testing-library/user-event";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";
import RegistryForm from "./subcomponents/RegistryForm";

interface ValidationEntry {
  description: string;
  errorMessage: string;
  inputLabel: string;
  inputValue: string;
}

const validationProvider: ValidationEntry[] = [
  {
    description: "shows expected error message when email is incorrect",
    errorMessage: "niepoprwany adres email",
    inputLabel: "email*",
    inputValue: "wrongmail@",
  },
  {
    description: "shows expected error message when email is empty",
    errorMessage: "to pole jest wymagane",
    inputLabel: "email*",
    inputValue: userEventEmptyInput,
  },
  {
    description:
      "shows expected error message when name includes forbidden characters",
    errorMessage: "Nazwa użytkownika nie może zawierać znaków specjalnych",
    inputLabel: "nazwa użytkownika*",
    inputValue: ",\"-'><,.",
  },
  {
    description: "shows expected error message when name is too short",
    errorMessage: "minimalna długość to 3 znaki",
    inputLabel: "nazwa użytkownika*",
    inputValue: "ab",
  },
  {
    description: "shows expected error message when name is too long",
    errorMessage: "maksymalna długość to 20 znaków",
    inputLabel: "nazwa użytkownika*",
    inputValue: "qwertyuiopasdfghjklzxc",
  },
  {
    description: "shows expected error message when name is empty",
    errorMessage: "to pole jest wymagane",
    inputLabel: "nazwa użytkownika*",
    inputValue: userEventEmptyInput,
  },
  {
    description: "shows expected error message when password includes space",
    errorMessage: "Hasło nie może zawierać spacji",
    inputLabel: "hasło*",
    inputValue: "pass word",
  },
  {
    description: "shows expected error message when password is too short",
    errorMessage: "minimalna długość to 3 znaki",
    inputLabel: "hasło*",
    inputValue: "ab",
  },
  {
    description: "shows expected error message when password is too long",
    errorMessage: "maksymalna długość to 30 znaków",
    inputLabel: "hasło*",
    inputValue: "qwertyuiopasdfghjklzxcvbnmqwertyuiop",
  },
  {
    description: "shows expected error message when password is empty",
    errorMessage: "to pole jest wymagane",
    inputLabel: "hasło*",
    inputValue: userEventEmptyInput,
  },
];

describe("Validation", () => {
  validationProvider.forEach(
    ({ description, errorMessage, inputLabel, inputValue }) => {
      it(description, async () => {
        //arrange
        const user = userEvent.setup();
        jest.useRealTimers();
        render(
          <DummyProviders>
            <RegistryForm />
          </DummyProviders>
        );
        const input = await screen.findByLabelText(inputLabel);
        const clickaway = await screen.findByTestId("clickaway");
        const submitButton = await screen.findByRole("button", {
          name: "zarejestruj",
        });

        //act
        await user.type(input, inputValue);
        await user.click(clickaway);

        //assert
        expect(screen.queryByText(errorMessage)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
      });
    }
  );
});

test("doesn't show any error and button isn't disabled when every input is correct", async () => {
  //arrange
  const user = userEvent.setup();
  jest.useRealTimers();
  render(
    <DummyProviders>
      <RegistryForm />
    </DummyProviders>
  );
  const emailInput = await screen.findByLabelText("email*");
  const nameInput = await screen.findByLabelText("nazwa użytkownika*");
  const passwordInput = await screen.findByLabelText("hasło*");
  const clickaway = await screen.findByTestId("clickaway");
  const submitButton = await screen.findByRole("button", {
    name: "zarejestruj",
  });

  //act
  await user.type(emailInput, "correct@mail.com");
  await user.type(nameInput, "correctUserName");
  await user.type(passwordInput, "correct_password");
  await user.click(clickaway);

  //assert
  expect(screen.queryByText("niepoprwany adres email")).not.toBeInTheDocument();
  expect(screen.queryByText("to pole jest wymagane")).not.toBeInTheDocument();
  expect(screen.queryByText("maksymalna długość to")).not.toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();
});
