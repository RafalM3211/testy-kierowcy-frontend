import { AppBar, Box, useTheme, useMediaQuery } from "@mui/material";
import Logo from "../../atoms/Logo/Logo";
import Drawer from "../Drawer/Drawer";
import { useState } from "react";
import MenuButton from "../../atoms/MenuButton/MenuButton";

export default function SmallHeader() {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: "rgb(108, 65, 0, 0.02)",
        width: { xs: "60px", sm: "100%" },
        display: "flex",
        flexDirection: "row",
        justifyContent: { xs: "flex-end", sm: "space-between" },
        alignItems: "center",
        px: { xs: "5px", sm: "30px" },
        pt: "15px",
        pb: "5px",
      }}
      position="absolute"
    >
      {isSmallMobile ? (
        <></>
      ) : (
        <Box>
          <Logo />
        </Box>
      )}

      <MenuButton
        variant={isSmallMobile ? "text" : "outlined"}
        sx={{
          mr: "5px",
          px: { xs: "10px", sm: "15px" },
        }}
        onClick={() => setDrawerOpen(true)}
      />
      <Drawer open={isDrawerOpen} setOpen={setDrawerOpen} />
    </AppBar>
  );
}
