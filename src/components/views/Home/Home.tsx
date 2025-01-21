import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import bgImage from "../../../images/backgrounds/wave.svg";
import { flexCenter, backgroundImg } from "../../../utility/styling";
import ButtonLink from "../../atoms/ButtonLink/ButtonLink";
import SectionSubtitle from "../../atoms/SectionSubtitle/SectionSubtitle";
import SectionHeader from "../../atoms/SectionHeader/SectionHeader";
import HighlitedText from "../../atoms/HighlitedText/HighlitedText";
import ProgressSection from "./subcomponents/ProgressSection";

export default function Home() {
  return (
    <Box
      sx={{
        ...backgroundImg(bgImage),
        minHeight: "100vh",
      }}
    >
      <Grid
        sx={{
          width: "100%",
          minHeight: "100vh",
          px: { xs: "40px", md: "50px", lg: "150px" },
          pt: { xs: "100px", md: "0" },
          fontSize: { xs: "0.9em", sm: "1em" },
          alignItems: "baseline",
          alignContent: "center",
        }}
        columnSpacing={{ md: 5, lg: 1 }}
        rowGap={10}
        container
      >
        <Grid
          sx={{
            ...flexCenter,
            flexDirection: "column",
            mb: { xs: "80px", md: "50px" },
            order: { xs: 2, md: 0 },
          }}
          xs={12}
          md={6}
        >
          <ProgressSection />
        </Grid>
        <Grid
          sx={{
            ...flexCenter,
            flexDirection: "column",
            mb: { xs: 0, md: "50px" },
          }}
          xs={12}
          md={6}
        >
          <SectionHeader sx={{ mb: "5px" }}>
            Kategoria:{" "}
            <HighlitedText sx={{ fontSize: "2em" }} variant="h1">
              B
            </HighlitedText>
          </SectionHeader>
          <SectionSubtitle>
            Spróbuj swoich sił w egzaminie próbnym. Test składa się z 20 pytań
            podstawowych oraz 12 specjalistycznych - dokładnie jak na prawdziwym
            egzaminie!
          </SectionSubtitle>
          <ButtonLink
            to="/question"
            sx={{
              color: "common.white",
              borderRadius: "15px",
              px: "50px",
              mb: "20px",
              mt: { xs: "20px", sm: "40px" },
            }}
            variant="contained"
          >
            <Typography
              component={"p"}
              sx={{ fontSize: { xs: "1em", md: "1.35em" } }}
            >
              Rozwiaż test na kategorię B
            </Typography>
          </ButtonLink>
        </Grid>
      </Grid>
    </Box>
  );
}
