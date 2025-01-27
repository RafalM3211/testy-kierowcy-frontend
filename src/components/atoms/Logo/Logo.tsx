import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  size?: "small" | "medium" | "large";
}

export default function Logo(props: Props) {
  const { size = "medium" } = props;

  const isSmall = size === "small";

  return (
    <Link to="/" style={{ color: "unset", textDecoration: "none" }}>
      <Typography
        sx={(theme) => ({
          pl: "10px",
          borderLeft: `15px solid ${theme.palette.primary.main}`,
          fontSize: isSmall ? "1.1em" : "2em"
        })}
        variant="h4"
        component="h2"
      >
        {isSmall ? (
          <>
            Testy
            <br />
            Kierowcy
          </>
        ) : (
          "TestyKierowcy"
        )}
      </Typography>
    </Link>
  );
}
