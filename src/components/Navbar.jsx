import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/images/watchflix_logo.png";
import mobLogo from "../assets/images/watchflix_mob_logo.png";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen size is small

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={isMobile ? mobLogo : logo}
          alt="WatchFlix"
          style={{ width: isMobile ? "40px" : "140px", height: "auto" }}
        />
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
