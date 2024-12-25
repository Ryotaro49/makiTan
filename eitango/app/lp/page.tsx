"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/pages/lp/Header";
import HeroSection from "@/components/pages/lp/HeroSection";
import FeaturesSection from "@/components/pages/lp/FeaturesSection";
import CTASection from "@/components/pages/lp/CTASection";
import Footer from "@/components/pages/lp/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

export default function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </ThemeProvider>
  );
}
