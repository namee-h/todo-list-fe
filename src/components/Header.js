import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isLoggedIn = !!user;

  const navigate = useNavigate();

  const handleToLogin = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      clearAuth();
      navigate("/login");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#add8e6" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          TODO LIST
        </Typography>
        <Button color="inherit" onClick={handleToLogin}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
