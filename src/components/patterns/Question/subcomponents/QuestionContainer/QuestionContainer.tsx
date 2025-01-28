import { Container } from "@mui/material";
import { SxProps } from "@mui/material";

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

export default function QuestionContainer(props: Props) {
  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "min-content 1fr" },
        gridTemplateRows: {
          xs: "min-content min-content 1fr",
          md: "min-content 1fr auto",
        },
        minHeight: "100vh",
        pt: { xs: "15px", sm: "70px" },
        px: { xs: "5px", sm: "16px", md: "24px" },
        boxSizing: "border-box",
        maxWidth: { lg: "1400px" },
        ...props.sx,
      }}
    >
      {props.children}
    </Container>
  );
}
