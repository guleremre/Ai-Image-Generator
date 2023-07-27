import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logged, setLogged] = useState(false);

  const memo = localStorage.getItem("token");

  useEffect(() => {
    memo ? setLogged(true) : setLogged(false);
  }, [memo]);

  const navigate = useNavigate();

  const navToHome = () => {
    navigate("/home");
    handleCloseNavMenu();
  };
  const navToAbout = () => {
    navigate("/about");
    handleCloseNavMenu();
  };
  const navToLogin = () => {
    navigate("/");
    handleCloseNavMenu();
  };
  const navToSignup = () => {
    navigate("/signup");
    handleCloseNavMenu();
  };
  const navToProfile = () => {
    navigate("/profile");
    handleCloseUserMenu();
  };
  const navToLogout = () => {
    localStorage.removeItem("token");
    handleCloseUserMenu();
    navigate("/home");
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AI-rtistic
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  navToHome();
                }}
              >
                <Typography textAlign="center"> Home1</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navToAbout();
                }}
              >
                <Typography textAlign="center"> about1</Typography>
              </MenuItem>
              {/* {pages.map((page) => (
              ))} */}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AI-rtistic
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/home");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home2
            </Button>
            <Button
              onClick={() => {
                navigate("about");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About2
            </Button>
          </Box>
          {logged ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="username" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {" "}
                <MenuItem value="profile" onClick={() => navToProfile()}>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navToLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box
              sx={{ display: { xs: "block", md: "flex" }, p: { xs: 0, md: 1 } }}
            >
              <MenuItem
                sx={{
                  display: { xs: "block", md: "flex" },
                  py: { xs: 0, md: 1 },
                  px: { xs: 0, md: 1 },
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </MenuItem>
              <MenuItem
                sx={{
                  display: { xs: "block", md: "flex" },
                  py: { xs: 0, md: 1 },
                  px: { xs: 0, md: 1 },
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </MenuItem>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
