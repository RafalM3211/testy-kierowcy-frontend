import { AppBar, Container, Box, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import UserChip from "./subcomponents/UserChip";
import ButtonLink from "../../atoms/ButtonLink/ButtonLink";
import Logo from "../../atoms/Logo/Logo";
import { mainMenuStructure } from "../../../Router";
import Drawer from "../Drawer/Drawer";
import MenuButton from "../../atoms/MenuButton/MenuButton";
import { useUserContext } from "../../../context/user/user";
import LogInButton from "./subcomponents/LogInButton";

export default function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { isLoggedIn } = useUserContext();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "0px 2px 3px rgba(0,0,0,0.1)",
          bgcolor: "rgb(108, 65, 0, 0.02)",
        }}
        position="absolute"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: "10px",
          }}
          maxWidth="lg"
        >
          <Logo size={isXs ? "small" : "medium"} />
          <Box
            component="nav"
            sx={{ display: "flex", alignItems: "center", fontSize: "0.9em" }}
          >
            {isXs ? (
              <></>
            ) : (
              mainMenuStructure.map((item, index) => {
                return (
                  <ButtonLink sx={{color: "text.primary"}} to={item.to} key={index}>
                    {item.title}
                  </ButtonLink>
                );
              })
            )}
            {isLoggedIn ? (
              <UserChip
                sx={{
                  ml: "30px",
                }}
              />
            ) : (
              <LogInButton />
            )}
            {isXs ? (
              <MenuButton
                sx={{ ml: "15px" }}
                onClick={() => setDrawerOpen(true)}
              />
            ) : (
              <></>
            )}
          </Box>
        </Container>
      </AppBar>

      <Drawer open={isDrawerOpen} setOpen={setDrawerOpen} />
    </>
  );
}
