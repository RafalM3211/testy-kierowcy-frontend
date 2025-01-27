import { Typography } from "@mui/material";
import type { TypographyTypeMap } from "@mui/material";

export default function InfoChip(props: TypographyTypeMap["props"]) {
  const { sx, children, ...otherProps } = props;

  return (
    <Typography
      sx={(theme) => ({
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: "10px",
        px: "10px",
        mx: "15px",
        fontSize: "1em"
      })}
      {...otherProps}
    >
      {children}
    </Typography>
  );
}
