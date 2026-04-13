import {
  Box,
  Drawer as MuiDrawer,
  Button,
  List,
  ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ButtonLink from "../../atoms/ButtonLink/ButtonLink";
import UserChip from "../Header/subcomponents/UserChip";
import { mainMenuStructure, userMenuStructure } from "../../../Router";
import { useUserContext } from "../../../context/user/user";
import LogInButton from "../Header/subcomponents/LogInButton";
import { flexCenter } from "../../../utility/styling";
import type { DrawerProps } from "@mui/material";

interface Props extends DrawerProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function Drawer(props: Props) {
  const { isLoggedIn } = useUserContext();
  const { open, setOpen, ...other } = props;

  return (
    <MuiDrawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ fontSize: "0.9em" }}
      {...other}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          my: "10px",
          mx: "16px",
        }}
      >
        <Box sx={{ flexGrow: 1, ...flexCenter }}>
          {isLoggedIn ? <UserChip /> : <LogInButton />}
        </Box>

        <Button
          onClick={() => setOpen(false)}
          sx={{
            color: "primary.dark",
            minWidth: "min-content",
          }}
        >
          <CloseIcon />
        </Button>
      </Box>

      <List
        sx={{
          borderRight: (theme) => `1px solid ${theme.palette.grey[400]}`,
          mr: "35px",
          pr: "10px",
        }}
        disablePadding
        dense
      >
        {isLoggedIn &&
          userMenuStructure.map((item, index) => {
            return (
              <ListItem
                key={index}
                sx={{ pr: "8px", pt: "0px", justifyContent: "center" }}
              >
                <ButtonLink sx={{ color: "grey.500" }} to={item.to}>
                  {item.title}
                </ButtonLink>
              </ListItem>
            );
          })}
      </List>

      <List>
        {mainMenuStructure.map((item, index) => {
          return (
            <ListItem
              key={index}
              sx={{
                borderLeft: (theme) => `5px solid ${theme.palette.grey[300]}`,
                py: "5px",
                my: "20px",
              }}
            >
              <ButtonLink sx={{ py: "0", color: "text.primary" }} to={item.to}>
                {item.title}
              </ButtonLink>
            </ListItem>
          );
        })}
      </List>
    </MuiDrawer>
  );
}
