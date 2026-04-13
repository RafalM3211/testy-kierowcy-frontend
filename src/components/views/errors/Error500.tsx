import { Typography } from "@mui/material";
import ErrorPageTemplate from "./ErrorPageTemplate";

export default function Error404() {
  return (
    <ErrorPageTemplate
      errorCode={500}
      errorMessage="Błąd wewnętrzny serwera. Przepraszamy"
    >
      <Typography variant="subtitle1" >
        Ta aplikacja jest częścią mojego portfolio i backend nie został jeszcze wdrożony na serwerze.
      </Typography>
      <Typography variant="subtitle1" >
        👉 Wersja lokalna działa w pełni - w razie potrzeby chętnie udostępnię instrukcję uruchomienia.
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: "25px" }}>
        Dziękuję za zainteresowanie projektem!
      </Typography>

    </ErrorPageTemplate>
  );
}
