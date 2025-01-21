import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../../../atoms/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../../atoms/SuccessMessage/SuccessMessage";
import TextInput from "../../../atoms/TextInput/TextInput";
import { register } from "../../../../core/services/user";
import LoadingButton from "../../../atoms/LoadingButton/LoadingButton";
import { useUserContext } from "../../../../context/user/user";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../../types/globalTypes";

export default function RegistryForm() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const {
    mutate,
    isLoading,
    isError: isRegistryError,
    isSuccess,
  } = useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      const user = (await data.json()) as User;
      setUser(user);
      navigate("/");
    },
  });

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("to pole jest wymagane")
            .email("niepoprwany adres email"),
          userName: Yup.string()
            .required("to pole jest wymagane")
            .test({
              test: (userName) => {
                return !userName?.match(/[^(\s|\w)]/);
              },
              message: "Nazwa użytkownika nie może zawierać znaków specjalnych",
            })
            .min(3, "minimalna długość to 3 znaki")
            .max(20, "maksymalna długość to 20 znaków"),
          password: Yup.string()
            .required("to pole jest wymagane")
            .test({
              message: "Hasło nie może zawierać spacji",
              test: (password) => {
                return !password?.match(/\s/);
              },
            })
            .min(3, "minimalna długość to 3 znaki")
            .max(30, "maksymalna długość to 30 znaków"),
        })}
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
        }}
      >
        {(formik) => {
          if (isRegistryError && !formik.isValid) {
            formik.setErrors({
              email: "",
              userName: "",
              password: "",
            });
          }

          return (
            <Form style={{ width: "100%" }}>
              <Stack spacing={4} sx={{ pt: "20px" }} data-testid="clickaway">
                <TextInput label="email*" name="email" variant="standard" />
                <TextInput
                  label="nazwa użytkownika*"
                  name="userName"
                  variant="standard"
                />
                <TextInput
                  label="hasło*"
                  type="password"
                  name="password"
                  variant="standard"
                />
                <LoadingButton
                  loading={isLoading}
                  disabled={!formik.isValid}
                  type="submit"
                >
                  zarejestruj
                </LoadingButton>
              </Stack>
            </Form>
          );
        }}
      </Formik>
      {isRegistryError ? (
        <ErrorMessage sx={{ fontSize: "0.9em" }}>
          Podany uzytkownik juz istnieje
        </ErrorMessage>
      ) : (
        <></>
      )}
      {isSuccess ? (
        <SuccessMessage sx={{ fontSize: "0.9em" }}>
          zarejestrowano pomyślnie!
        </SuccessMessage>
      ) : (
        <></>
      )}
    </>
  );
}
